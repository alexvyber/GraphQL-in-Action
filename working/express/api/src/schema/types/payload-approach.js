import Approach from "./approach"
import UserError from "./user-error"
import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql"

const ApproachPayload = new GraphQLObjectType({
  name: "ApproachPayload",
  fields: () => ({
    errors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError)))
    },
    approach: { type: Approach }
  })
})

export default ApproachPayload
