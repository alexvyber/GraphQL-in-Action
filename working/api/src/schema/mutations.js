import { GraphQLNonNull, GraphQLID, GraphQLObjectType } from "graphql"

import UserPayload from "./types/payload-user"
import UserInput from "./types/input-user"
import AuthInput from "./types/input-auth"
import TaskPayload from "./types/payload-task"
import TaskInput from "./types/input-task"
import ApproachPayload from "./types/payload-approach"
import ApproachInput from "./types/input-approach"
import ApproachVoteInput from "./types/input-approach-vote"
import UserDeletePayload from "./types/payload-user-delete"

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    //
    userCreate: {
      type: new GraphQLNonNull(UserPayload),
      args: {
        input: { type: new GraphQLNonNull(UserInput) }
      },
      resolve: async (_source, { input }, { mutators }) =>
        mutators.userCreate({ input })
    },

    //
    userLogin: {
      type: new GraphQLNonNull(UserPayload),
      args: {
        input: { type: new GraphQLNonNull(AuthInput) }
      },
      resolve: async (_source, { input }, { mutators }) =>
        mutators.userLogin({ input })
    },

    //
    taskCreate: {
      type: TaskPayload,
      args: {
        input: { type: new GraphQLNonNull(TaskInput) }
      },
      resolve: async (_source, { input }, { mutators, currentUser }) =>
        mutators.taskCreate({ input, currentUser })
    },

    //
    approachCreate: {
      type: ApproachPayload,
      args: {
        taskId: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(ApproachInput) }
      },
      resolve: async (_source, { taskId, input }, { mutators, currentUser }) =>
        mutators.approachCreate({
          taskId,
          input,
          currentUser,
          mutators
        })
    },

    //
    approachVote: {
      type: ApproachPayload,
      args: {
        approachId: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(ApproachVoteInput) }
      },
      resolve: async (_source, { approachId, input }, { mutators }) => {
        return mutators.approachVote({ approachId, input })
      }
    },

    //
    userDelete: {
      type: UserDeletePayload,
      resolve: async (_source, _args, { mutators, currentUser }) => {
        return mutators.userDelete({ currentUser })
      }
    }
  })
})
