import ApproachDetailCategory from "./approach-detail-category"
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql"

const ApproachDetail = new GraphQLObjectType({
  name: "ApproachDetail",
  fields: () => ({
    content: {
      type: new GraphQLNonNull(GraphQLString)
    },
    category: {
      type: new GraphQLNonNull(ApproachDetailCategory)
    }
  })
})

export default ApproachDetail
