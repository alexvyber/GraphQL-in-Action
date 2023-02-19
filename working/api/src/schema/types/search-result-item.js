import Approach from "./approach"
import Task from "./task"
import {
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLString
} from "graphql"

const SearchResultItem = new GraphQLInterfaceType({
  name: "SearchResultItem",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) }
  }),
  resolveType(obj) {
    if (obj.type === "task") {
      return Task
    }
    if (obj.type === "approach") {
      return Approach
    }
  }
})

export default SearchResultItem
