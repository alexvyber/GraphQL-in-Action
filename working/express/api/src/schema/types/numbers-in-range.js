import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat
} from "graphql"

const NumbersInRange = new GraphQLObjectType({
  name: "NumbersInRange",
  description: "Aggregate info on a range of numbers!!",
  fields: {
    sum: {
      description: "Sum of all whole numbers in the range",
      type: new GraphQLNonNull(GraphQLInt)
    },
    count: {
      description: "Count of all whole numbers in the range",
      type: new GraphQLNonNull(GraphQLInt)
    },
    avg: {
      description: "The average of all whole numbers in the range",
      type: new GraphQLNonNull(GraphQLFloat)
    }
  }
})

export default NumbersInRange
