import { useStore } from "../store"
import Navbar from "./Navbar"
import * as mainComponents from "./index"
import React from "react"

export default function Root() {
  const { useLocalAppState } = useStore()

  const [component, user] = useLocalAppState("component", "user")
  const Component = mainComponents[component.name]

  return (
    <div className="route-container">
      <Navbar user={user} />
      <div className="main-component">
        <Component {...component.props} />
      </div>
    </div>
  )
}
