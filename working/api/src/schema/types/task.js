// import Approach from "./approach"
import SearchResultItem from "./search-result-item"
import User from "./user"
import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from "graphql"

//

const Approach = new GraphQLObjectType({
  name: "Approach",
  interfaces: () => [SearchResultItem],
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    voteCount: { type: new GraphQLNonNull(GraphQLInt) },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ createdAt }) => createdAt.toISOString(),
    },
    author: {
      type: new GraphQLNonNull(User),
      resolve: (source, args, { loaders }) => loaders.users.load(source.userId),
    },
    task: {
      type: new GraphQLNonNull(Task),
      resolve: (source, args, { loaders }) => loaders.tasks.load(source.taskId),
    },
  }),
})

//

const Task = new GraphQLObjectType({
  name: "Task",
  interfaces: () => [SearchResultItem],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },

    //
    content: { type: new GraphQLNonNull(GraphQLString) },

    //
    tags: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString)),
      ),
      resolve: source => source.tags.split(","),
    },

    //
    approachCount: { type: new GraphQLNonNull(GraphQLInt) },

    //
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: source => source.createdAt.toLocaleTimeString(),
    },

    //
    author: {
      type: new GraphQLNonNull(User),
      resolve: (source, _args, { loaders }) => {
        return loaders.users.load(source.userId)
      },
    },

    approachList: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Approach))),
      resolve: (source, _args, { loaders }) =>
        loaders.approachLists.load(source.id),
    },
  },
})

export default Task
