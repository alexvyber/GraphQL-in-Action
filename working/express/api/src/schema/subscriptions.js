import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from "graphql"

// import UserPayload from "./types/payload-user";
// import UserInput from "./types/input-user";
// import AuthInput from "./types/input-auth";
// import TaskPayload from "./types/payload-task";
// import TaskInput from "./types/input-task";
// import ApproachPayload from "./types/payload-approach";
// import ApproachInput from "./types/input-approach";

const Subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: () => ({
    newSome: {
      type: GraphQLString,
      subscribe: (one, two, { pubsub }) => {
        console.log("🚀 ~ pubsub:", pubsub)
        // setInterval(
        //   () =>
        //     pubsub.publish({
        //       topic: "some",
        //       payload: {
        //         newSome: "asdfasdf",
        //       },
        //     }),
        //   100,
        // )
        return pubsub.subscribe("some")
      },
    },
  }),
})

export default Subscription
