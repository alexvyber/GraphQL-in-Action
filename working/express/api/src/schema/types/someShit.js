import SearchResultItem from "./search-result-item"
import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
} from "graphql"

const { floor, random } = Math

export const SomeShit = new GraphQLObjectType({
  name: "SomeShit",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID), resolve: () => "1" },

    //
    text: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => "String " + floor(random() * 1000),
    },

    //
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => floor(random() * 1000000),
    },

    //
    random: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: () => random() + 100,
    },
  },
})
