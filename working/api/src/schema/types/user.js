import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from "graphql"

import Task from "./task"

// ~~

const fieldsWrapper = ({ meScope }) => {
  const userFields = {
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: GraphQLString },
    name: {
      type: GraphQLString,
      resolve: ({ firstName, lastName }) =>
        [firstName, lastName].filter(Boolean).join(" ")
    }
  }

  //
  if (meScope) {
    userFields.taskList = {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Task))),
      resolve: (_source, _args, { loaders, currentUser }) => {
        return loaders.tasksForUsers.load(currentUser.id)
      }
    }
  }
  return userFields
}

const User = new GraphQLObjectType({
  name: "User",
  fields: () => fieldsWrapper({ meScope: false })
})

export const Me = new GraphQLObjectType({
  name: "Me",
  fields: () => fieldsWrapper({ meScope: true })
})

export default User
