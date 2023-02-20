import * as config from "./config"
import mongoApiWrapper from "./db/mongo-api"
import pgApiWrapper from "./db/pg-api"
import { schema } from "./schema"
import bodyParser from "body-parser"
import cors from "cors"
import DataLoader from "dataloader"
import express from "express"
import { graphqlHTTP } from "express-graphql"
import morgan from "morgan"

import { PubSub } from "graphql-subscriptions"
const pubsub = new PubSub()

const subscriptionsEndpoint = `ws://localhost:${config.port}/subscriptions`

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
          errors: [{ message: "Invalid access token" }],
        })
      }

      // loades
      const loaders = {
        users: new DataLoader(userIds => pgApi.usersInfo(userIds)),
        tasks: new DataLoader(taskIds =>
          pgApi.tasksInfo({ taskIds, currentUser }),
        ),
        approachLists: new DataLoader(taskIds => pgApi.approachLists(taskIds)),
        tasksByTypes: new DataLoader(types => pgApi.tasksByTypes(types)),
        searchResults: new DataLoader(searchTerms =>
          pgApi.searchResults({ searchTerms, currentUser }),
        ),
        tasksForUsers: new DataLoader(userIds => pgApi.tasksForUsers(userIds)),
        detailLists: new DataLoader(approachIds =>
          mongoApi.detailLists(approachIds),
        ),
      }

      // mutators
      const mutators = {
        ...pgApi.mutators,
        ...mongoApi.mutators,
      }

      // init graphql
      graphqlHTTP({
        schema,
        context: { loaders, mutators, currentUser, pubsub },
        graphiql: { headerEditorEnabled: true },
        customFormatErrorFn: customError,
        subscriptionsEndpoint,
      })(req, res)
    },
  )

  // This line rus the server
  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/`)
  })
}

main()

//

function customError(err) {
  const errorReport = {
    message: err.message,
    locations: err.locations,
    stack: err.stack ? err.stack.split("\n") : [],
    path: err.path,
  }

  console.error("GraphQL Error", errorReport)

  return config.isDev
    ? errorReport
    : { message: "Oops! Something went wrong! :(" }
}
