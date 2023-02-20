import ApproachDetailCategory from "./approach-detail-category"
import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from "graphql"

const ApproachDetailInput = new GraphQLInputObjectType({
  name: "ApproachDetailInput",
  fields: () => ({
    content: { type: new GraphQLNonNull(GraphQLString) },
    category: {
      type: new GraphQLNonNull(ApproachDetailCategory)
    }
  })
})

export default ApproachDetailInput
