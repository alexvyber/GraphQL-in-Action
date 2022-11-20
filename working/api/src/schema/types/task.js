import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from "graphql"

import User from "./user"

import Approach from "./approach"

import { extractPrefixedColumns } from "../../utils"

const Task = new GraphQLObjectType({
  name: "Task",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    tags: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString)),
      ),
      resolve: (source) => source.tags.split(","),
    },
    approachCount: { type: new GraphQLNonNull(GraphQLInt) },

    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      // resolve: (source) => source.created_at,
      resolve: (source) => source.createdAt.toLocaleTimeString(),
    },
    author: {
      type: new GraphQLNonNull(User),
      resolve: (prefixedObject) =>
        extractPrefixedColumns({ prefixedObject, prefix: "author" }),
    },
    approachList: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Approach))),
      resolve: (source, args, { pgApi }) => {
        const some = pgApi.approachList(source.id)
        some.then((some) => console.log("some", some))
        return some
      },
    },
  },
})

export default Task
