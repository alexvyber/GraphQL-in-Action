import "regenerator-runtime/runtime"
import Root from "./components/Root"
import { useStoreObject, Provider } from "./store"
import React from "react"
import ReactDOM from "react-dom"

export default function App() {
  const store = useStoreObject()
  return (
    <Provider value={store}>
      <Root />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
