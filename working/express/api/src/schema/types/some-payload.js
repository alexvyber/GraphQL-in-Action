import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql"

export const SomePayload = new GraphQLObjectType({
  name: "SomePayload",
  fields: () => ({
    // someText: { type: GraphQLString },
    // otherNumber: { type: GraphQLInt },
    // floatNumber: { type: GraphQLFloat },
  }),
})
