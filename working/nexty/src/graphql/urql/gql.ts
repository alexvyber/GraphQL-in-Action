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
    "\n  fragment Fields on SomeShit {\n    id\n    text\n  }\n": types.FieldsFragmentDoc,
    "\n  fragment OtherFields on SomeShit {\n    count\n    random\n  }\n": types.OtherFieldsFragmentDoc,
    "\nquery SomeShit {\n  result: someShit {\n    ...Fields\n  }\n}\n": types.SomeShitDocument,
    "\nquery MoreShit {\n  result: someShit {\n    ...OtherFields\n  }\n}\n": types.MoreShitDocument,
    "\n  query EvenMoreShit {\n    result: someShit {\n      id\n    }\n  }\n": types.EvenMoreShitDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
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
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Fields on SomeShit {\n    id\n    text\n  }\n"): (typeof documents)["\n  fragment Fields on SomeShit {\n    id\n    text\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OtherFields on SomeShit {\n    count\n    random\n  }\n"): (typeof documents)["\n  fragment OtherFields on SomeShit {\n    count\n    random\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery SomeShit {\n  result: someShit {\n    ...Fields\n  }\n}\n"): (typeof documents)["\nquery SomeShit {\n  result: someShit {\n    ...Fields\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery MoreShit {\n  result: someShit {\n    ...OtherFields\n  }\n}\n"): (typeof documents)["\nquery MoreShit {\n  result: someShit {\n    ...OtherFields\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EvenMoreShit {\n    result: someShit {\n      id\n    }\n  }\n"): (typeof documents)["\n  query EvenMoreShit {\n    result: someShit {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;