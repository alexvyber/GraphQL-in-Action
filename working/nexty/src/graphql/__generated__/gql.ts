/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment Fields on SomeShit {\n    id\n    text\n  }\n": types.FieldsFragmentDocSHIT,
    "\n  fragment OtherFields on SomeShit {\n    count\n    random\n  }\n": types.OtherFieldsFragmentDocSHIT,
    "\nquery SomeShit {\n  result: someShit {\n    ...Fields\n  }\n}\n": types.SomeShitDocumentSHIT,
    "\nquery MoreShit {\n  result: someShit {\n    ...OtherFields\n  }\n}\n": types.MoreShitDocumentSHIT,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment Fields on SomeShit {\n    id\n    text\n  }\n"): (typeof documents)["\n  fragment Fields on SomeShit {\n    id\n    text\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment OtherFields on SomeShit {\n    count\n    random\n  }\n"): (typeof documents)["\n  fragment OtherFields on SomeShit {\n    count\n    random\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery SomeShit {\n  result: someShit {\n    ...Fields\n  }\n}\n"): (typeof documents)["\nquery SomeShit {\n  result: someShit {\n    ...Fields\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery MoreShit {\n  result: someShit {\n    ...OtherFields\n  }\n}\n"): (typeof documents)["\nquery MoreShit {\n  result: someShit {\n    ...OtherFields\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;