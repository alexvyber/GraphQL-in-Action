import React from "react"
import { useQuery } from "urql"

import "./App.css"
// import Film from './Film';
import { graphql } from "@/graphql/urql"

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          ...FilmItem
        }
      }
    }
  }
`)

function App() {
  // `data` is typed!
  // const [{ data }] = useQuery({ query: allFilmsWithVariablesQueryDocument, variables: { first: 10 } });
  return (
    <div className="App">
      {/* {data && (
        <ul>
          {data.allFilms?.edges?.map(
            (e, i) => e?.node && <Film film={e?.node} key={`film-${i}`} />
          )}
        </ul>
      )} */}
    </div>
  )
}

export default App
