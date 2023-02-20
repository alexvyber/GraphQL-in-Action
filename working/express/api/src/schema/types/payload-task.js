import Task from "./task"
import UserError from "./user-error"
import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from "graphql"

const TaskPayload = new GraphQLObjectType({
  name: "TaskPayload",
  fields: () => ({
    errors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError)))
    },
    task: { type: Task }
  })
})

export default TaskPayload
