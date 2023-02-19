import { gql } from "@/graphql/__generated__/gql"

export const CORE_SOME_SHIT_FIELDS = gql(`
  fragment Fields on SomeShit {
    id
    text
  }
`)

export const OTHER_SOME_SHIT_FIELDS = gql(`
  fragment OtherFields on SomeShit {
    count
    random
  }
`)
