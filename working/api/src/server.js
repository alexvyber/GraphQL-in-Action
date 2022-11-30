import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import { graphqlHTTP } from "express-graphql"
import { schema } from "./schema"

import pgApiWrapper from "./db/pg-api"
import mongoApiWrapper from "./db/mongo-api"

import * as config from "./config"

import DataLoader from "dataloader"

async function main() {
  const server = express()

  server.use(cors())
  server.use(morgan("dev"))
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())
  server.use("/:fav.ico", (req, res) => res.sendStatus(204))

  // API Wrappers
  const pgApi = await pgApiWrapper()
  const mongoApi = await mongoApiWrapper()

  // Hello route
  server.use("/hello", (req, res) => {
    res.send("Hello World")
  })

  // GraphQL server route
  server.use(
    "/graphql",

    async (req, res) => {
      // Auth
      const authToken =
        req && req.headers && req.headers.authorization
          ? req.headers.authorization.slice(7) // "Bearer "
          : null

      const currentUser = await pgApi.userFromAuthToken(authToken)

      if (authToken && !currentUser) {
        return res.status(401).send({
          errors: [{ message: "Invalid access token" }]
        })
      }

      // loades
      const loaders = {
        users: new DataLoader(userIds => pgApi.usersInfo(userIds)),
        tasks: new DataLoader(taskIds =>
          pgApi.tasksInfo({ taskIds, currentUser })
        ),
        approachLists: new DataLoader(taskIds => pgApi.approachLists(taskIds)),
        tasksByTypes: new DataLoader(types => pgApi.tasksByTypes(types)),
        searchResults: new DataLoader(searchTerms =>
          pgApi.searchResults({ searchTerms, currentUser })
        ),
        tasksForUsers: new DataLoader(userIds => pgApi.tasksForUsers(userIds)),
        detailLists: new DataLoader(approachIds =>
          mongoApi.detailLists(approachIds)
        )
      }

      // mutators
      const mutators = {
        ...pgApi.mutators,
        ...mongoApi.mutators
      }

      // init graphql
      graphqlHTTP({
        schema,
        context: { loaders, mutators, currentUser },
        graphiql: { headerEditorEnabled: true },
        customFormatErrorFn: customError
      })(req, res)
    }
  )

  // This line rus the server
  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/`)
  })
}

function customError(err) {
  const errorReport = {
    message: err.message,
    locations: err.locations,
    stack: err.stack ? err.stack.split("\n") : [],
    path: err.path
  }

  console.error("GraphQL Error", errorReport)

  return config.isDev
    ? errorReport
    : { message: "Oops! Something went wrong! :(" }
}

main()
