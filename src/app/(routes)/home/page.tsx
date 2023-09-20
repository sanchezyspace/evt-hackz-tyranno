import TimelinePost from '@/app/_components/ui/TimelinePost'
import { VStack } from '@chakra-ui/react'

export default function Page() {
  return (
    <>
      <VStack>
        <TimelinePost
          avatarUrl="https://avatars.githubusercontent.com/u/6916170?v=4"
          displayName="万事急須"
          userID="@BigBigBigCrisis"
          postTime="5s"
          postBody="マーシャルの卵でとじちゃって大変さ"
          commentsNumber="3"
          likesNumber="30"
        />
        <TimelinePost
          avatarUrl="https://avatars.githubusercontent.com/u/6916170?v=4"
          displayName="万事急須"
          userID="@BigBigBigCrisis"
          postTime="5s"
          postBody="マーシャルの卵でとじちゃって大変さ"
          commentsNumber="3"
          likesNumber="30"
        />
      </VStack>
    </>
  )
}
