import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";

import * as config from "./config";

async function main() {
  const server = express();
  server.use(cors());
  server.use(morgan("dev"));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use("/:fav.ico", (req, res) => res.sendStatus(204));

  // Example route
  server.use("/hello", (req, res) => {
    res.send("Hello World");
  });

  // GraphQL server route
  server.use(
    "/graphql",
    graphqlHTTP({
      schema,
      // rootValue,
      graphiql: true,
    })
  );

  // This line rus the server
  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/`);
  });
}

main();

/*

5.0

import { graphql } from 'graphql';

import { schema, rootValue } from './schema';

const executeGraphQLRequest = async (request) => {
  const resp = await graphql(schema, request, rootValue);
  console.log(resp.data);
};

executeGraphQLRequest(process.argv[2]);

*/

/** GIA NOTES
 *
 * Use the code below to start a bare-bone express web server

*/
