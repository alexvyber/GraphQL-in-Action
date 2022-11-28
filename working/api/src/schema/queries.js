import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  printSchema,
} from "graphql"
import NumbersInRange from "./types/numbers-in-range"
import { numbersInRangeObject } from "../utils"

import Task from "./types/task"
import SearchResultItem from "./types/search-result-item"

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root query entry point for the API",
  fields: {
    // time
    currentTime: {
      type: GraphQLString,
      description: "",
      resolve: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            const isoString = new Date().toISOString()
            resolve(isoString.slice(11, 19))
          }, 0)
        })
      },
    },

    // stupid field
    randomBoolean: {
      type: GraphQLBoolean,
      description: "Returns random boolean just for fun",
      resolve: () => (Math.random() > 0.5 ? false : true),
    },

    // range numbers
    sumNumbersInRange: {
      type: NumbersInRange,
      description: `An object representing a range of whole numbers
      from "begin" to "end" inclusive to the edges`,
      args: {
        begin: {
          type: new GraphQLNonNull(GraphQLInt),
          description: "The number to begin the range",
        },
        end: {
          type: new GraphQLNonNull(GraphQLInt),
          description: "The number to end the range",
        },
      },
      resolve: (_source, { begin, end }) => numbersInRangeObject(begin, end),
    },

    // tasks
    taskMainList: {
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: async (_source, _args, { loaders /* pgApi */ }) =>
        loaders.tasksByTypes.load("latest"),
    },

    // taskinfo
    taskInfo: {
      type: Task,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_source, args, { loaders }) =>
        loaders.tasks.load(args.id),
    },

    // search
    search: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(SearchResultItem))
      ),
      args: {
        term: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (source, args, { loaders }) => {
        return loaders.searchResults.load(args.term)
      },
    },

    //
  },
})

export const schema = new GraphQLSchema({
  query: QueryType,
})

console.log(printSchema(schema))

/* 5.2

import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    currentTime: String!
    randomBoolean: Boolean!
  }
`);

export const rootValue = {
  currentTime: () => {
    const isoString = new Date().toDateString();
    return isoString; // .slice(11, 19)
  },
  randomBoolean: () => (Math.random() > 0.5 ? false : true),
};

*/
