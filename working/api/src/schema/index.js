import { MutationType } from "./mutations"
import { QueryType } from "./queries"
import { GraphQLSchema, printSchema } from "graphql"

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})

console.log(printSchema(schema))
