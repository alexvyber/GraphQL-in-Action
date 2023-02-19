import UserError from "./user-error"
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID
} from "graphql"

const UserDeletePayload = new GraphQLObjectType({
  name: "UserDeletePayload",
  fields: () => ({
    errors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError)))
    },
    deletedUserId: { type: GraphQLID }
  })
})

export default UserDeletePayload
