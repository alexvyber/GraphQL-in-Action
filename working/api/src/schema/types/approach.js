import SearchResultItem from "./search-result-item"
// import Task from "./task"
import User from "./user"
import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql"

const Approach = new GraphQLObjectType({
  name: "ApproachOld",
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
    // task: {
    //   type: new GraphQLNonNull(Task),
    //   resolve: (source, args, { loaders }) => loaders.tasks.load(source.taskId),
    // },
  }),
})

export default Approach
