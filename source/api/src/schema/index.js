import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  printSchema,
} from "graphql";
import NumbersInRange from "./types/numbers-in-range";
import { numbersInRangeObject } from "../utils/numbers-in-range";

import Task from "./types/task";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root query entry point for the API",
  fields: {
    // time
    currentTime: {
      type: GraphQLString,
      description: "",
      resolve: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const isoString = new Date().toISOString();
            resolve(isoString.slice(11, 19));
          }, 0);
        });
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

    taskMainList: {
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: async (source, args, { pgPool }) => {
        const pgResp = await pgPool.query(`
      SELECT id, content, tags,
          approach_count AS "approachCount", created_at AS "createdAt"
      FROM azdev.tasks
      WHERE is_private = FALSE
      ORDER BY created_at DESC
      LIMIT 100
      `);

        console.log(pgResp);

        return pgResp.rows;
      },
    },

    //
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});

// console.log(printSchema(schema));

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
