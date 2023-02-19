import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { createClient, Provider as UrqlProvider } from "urql"
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
})

const urqlClient = createClient({
  url: "http://localhost:4000/graphql",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={urqlClient}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UrqlProvider>
  )
}
