const express = require("express")
const { createServer } = require("http")
const graphqlHTTP = require("express-graphql")
const { buildSchema, execute, subscribe } = require("graphql")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const { PubSub } = require("graphql-subscriptions")

const PORT = 4000

const subscriptionsEndpoint = `ws://localhost:${PORT}/subscriptions`
const pubsub = new PubSub()

// merging schemas:
// https://stackoverflow.com/questions/45911002/can-two-graphqlschema-instances-be-merged

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  type MyDocument {
    id: String
    title: String
  }

  type Query {
    retrieveDocument: MyDocument
  }

  type Subscription {
    newDocument: MyDocument
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  retrieveDocument: () => {
    console.log(`hello`)
    pubsub.publish("NOTIFICATION_NEW_DOCUMENT", {
      newDocument: { id: "222", title: "newdocument2" },
    })

    return {
      id: "111",
      title: "hello world",
    }
  },

  //Subscription: {
  newDocument: {
    resolve: arguments => {
      console.log(`resolving new document`)
      return {
        id: "112233",
      }
    },

    subscribe: () => {
      console.log(`subscribed...`)
      return pubsub.asyncIterator("NOTIFICATION_NEW_DOCUMENT")
    },
    //  return
    //}
  },
  //}
}

const app = express()

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    subscriptionsEndpoint,
  }),
)

const webServer = createServer(app)

app.listen(PORT, () => {
  // Subscriptions handling:
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: webServer,
      path: "/subscriptions",
    },
  )

  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`,
  )
})
