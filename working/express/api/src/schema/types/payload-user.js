import User from "./user"
import UserError from "./user-error"
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from "graphql"

const UserPayload = new GraphQLObjectType({
  name: "UserPayload",
  fields: () => ({
    errors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError)))
    },
    user: { type: User },
    authToken: { type: GraphQLString }
  })
})

export default UserPayload
