import React from "react"
import { useQuery } from "urql"

// import Film from './Film';
import { graphql } from "@/graphql/urql"

const asdf = graphql(/* GraphQL */ `
  query EvenMoreShit {
    result: someShit {
      id
    }
  }
`)

function App() {
  // `data` is typed!
  const all = useQuery({ query: asdf })
  console.log("🚀 ~ App ~ all", all)
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
