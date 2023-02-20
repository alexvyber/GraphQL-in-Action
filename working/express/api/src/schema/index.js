import { MutationType } from "./mutations"
import { QueryType } from "./queries"
import Subscription from "./subscriptions"

import { GraphQLSchema, printSchema } from "graphql"

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  // subscription: Subscription,
})

console.log(printSchema(schema))
