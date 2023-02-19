/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Approach = SearchResultItem & {
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  task: Task;
  voteCount: Scalars['Int'];
};

export enum ApproachDetailCategory {
  Explanation = 'EXPLANATION',
  Note = 'NOTE',
  Warning = 'WARNING'
}

export type ApproachDetailInput = {
  category: ApproachDetailCategory;
  content: Scalars['String'];
};

export type ApproachInput = {
  content: Scalars['String'];
  detailList: Array<ApproachDetailInput>;
};

export type ApproachOld = SearchResultItem & {
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  voteCount: Scalars['Int'];
};

export type ApproachPayload = {
  approach: Maybe<ApproachOld>;
  errors: Array<UserError>;
};

/** true for up-vote and false for down-vote */
export type ApproachVoteInput = {
  up: Scalars['Boolean'];
};

export type AuthInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Me = {
  id: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  taskList: Array<Task>;
  username: Maybe<Scalars['String']>;
};

export type Mutation = {
  approachCreate: Maybe<ApproachPayload>;
  approachVote: Maybe<ApproachPayload>;
  taskCreate: Maybe<TaskPayload>;
  userCreate: UserPayload;
  userDelete: Maybe<UserDeletePayload>;
  userLogin: UserPayload;
};


export type MutationApproachCreateArgs = {
  input: ApproachInput;
  taskId: Scalars['ID'];
};


export type MutationApproachVoteArgs = {
  approachId: Scalars['ID'];
  input: ApproachVoteInput;
};


export type MutationTaskCreateArgs = {
  input: TaskInput;
};


export type MutationUserCreateArgs = {
  input: UserInput;
};


export type MutationUserLoginArgs = {
  input: AuthInput;
};

/** Aggregate info on a range of numbers!! */
export type NumbersInRange = {
  /** The average of all whole numbers in the range */
  avg: Scalars['Float'];
  /** Count of all whole numbers in the range */
  count: Scalars['Int'];
  /** Sum of all whole numbers in the range */
  sum: Scalars['Int'];
};

/** The root query entry point for the API */
export type Query = {
  currentTime: Maybe<Scalars['String']>;
  me: Maybe<Me>;
  /** Returns random boolean just for fun */
  randomBoolean: Maybe<Scalars['Boolean']>;
  search: Array<SearchResultItem>;
  someShit: SomeShit;
  /**
   * An object representing a range of whole numbers
   *       from "begin" to "end" inclusive to the edges
   */
  sumNumbersInRange: Maybe<NumbersInRange>;
  taskInfo: Maybe<Task>;
  taskMainList: Maybe<Array<Task>>;
};


/** The root query entry point for the API */
export type QuerySearchArgs = {
  term: Scalars['String'];
};


/** The root query entry point for the API */
export type QuerySumNumbersInRangeArgs = {
  begin: Scalars['Int'];
  end: Scalars['Int'];
};


/** The root query entry point for the API */
export type QueryTaskInfoArgs = {
  id: Scalars['ID'];
};

export type SearchResultItem = {
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type SomeShit = {
  count: Scalars['Int'];
  id: Scalars['ID'];
  random: Scalars['Float'];
  text: Scalars['String'];
};

export type Task = SearchResultItem & {
  approachCount: Scalars['Int'];
  approachList: Array<Approach>;
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  tags: Array<Scalars['String']>;
};

export type TaskInput = {
  content: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  tags: Array<Scalars['String']>;
};

export type TaskPayload = {
  errors: Array<UserError>;
  task: Maybe<Task>;
};

export type User = {
  id: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  username: Maybe<Scalars['String']>;
};

export type UserDeletePayload = {
  deletedUserId: Maybe<Scalars['ID']>;
  errors: Array<UserError>;
};

export type UserError = {
  message: Scalars['String'];
};

export type UserInput = {
  firstName: InputMaybe<Scalars['String']>;
  lastName: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserPayload = {
  authToken: Maybe<Scalars['String']>;
  errors: Array<UserError>;
  user: Maybe<User>;
};

export type FieldsFragment = { id: string, text: string } & { ' $fragmentName'?: 'FieldsFragment' };

export type OtherFieldsFragment = { count: number, random: number } & { ' $fragmentName'?: 'OtherFieldsFragment' };

export type SomeShitQueryVariables = Exact<{ [key: string]: never; }>;


export type SomeShitQuery = { result: { ' $fragmentRefs'?: { 'FieldsFragment': FieldsFragment } } };

export type MoreShitQueryVariables = Exact<{ [key: string]: never; }>;


export type MoreShitQuery = { result: { ' $fragmentRefs'?: { 'OtherFieldsFragment': OtherFieldsFragment } } };

export const FieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Fields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SomeShit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]} as unknown as DocumentNode<FieldsFragment, unknown>;
export const OtherFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OtherFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SomeShit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"random"}}]}}]} as unknown as DocumentNode<OtherFieldsFragment, unknown>;
export const SomeShitDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SomeShit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"someShit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Fields"}}]}}]}},...FieldsFragmentDoc.definitions]} as unknown as DocumentNode<SomeShitQuery, SomeShitQueryVariables>;
export const MoreShitDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MoreShit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"someShit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OtherFields"}}]}}]}},...OtherFieldsFragmentDoc.definitions]} as unknown as DocumentNode<MoreShitQuery, MoreShitQueryVariables>;