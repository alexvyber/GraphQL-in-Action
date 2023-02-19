import { gql } from "@/graphql/__generated__/gql"

export const SOME_SHIT = gql(`
query SomeShit {
  result: someShit {
    ...Fields
  }
}
`)

export const MORE_SHIT = gql(`
query MoreShit {
  result: someShit {
    ...OtherFields
  }
}
`)
