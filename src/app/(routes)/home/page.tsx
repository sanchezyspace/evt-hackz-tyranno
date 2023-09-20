'use client'
import '@/app/_utils/firebase'
import { useAuthContext } from '@/app/AuthProvider'
import Link from 'next/link'
import TimelinePost from '@/app/_components/ui/TimelinePost'
import { VStack } from '@chakra-ui/react'

export default function Page() {
  const user = useAuthContext()
  if (user === 'loading') {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }

  if (user === null) {
    return (
      <>
        <h1>Not logged in</h1>
        <Link href={'/signin'}>Sign in</Link>
      </>
    )
  }

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

