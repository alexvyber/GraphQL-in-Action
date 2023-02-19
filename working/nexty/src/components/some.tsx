import { useQuery } from "@apollo/client"
import { MORE_SHIT, SOME_SHIT } from "@/graphql/queries/someShit"

export const Some = () => {
  // const { data } = useQuery(SOME_SHIT)
  const { data: moreShit } = useQuery(MORE_SHIT)

  // console.log("🚀 ~ Home ~ data", data?.result)
  console.log("🚀 ~ Home ~ moreShit", moreShit?.result)

  return (
    <>
      <h1>AAAAAAAAAAAAAAAAAAAAAAAAAAAa</h1>
    </>
  )
}
