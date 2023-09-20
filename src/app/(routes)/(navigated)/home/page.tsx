'use client'
import '@/app/_utils/firebase'
import { useAuthContext } from '@/app/AuthProvider'
import Link from 'next/link'
import TimelinePost from '@/app/_components/ui/TimelinePost'
import { VStack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Post } from '@/app/_types/Post'
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '@/app/_utils/firebase'
import { useAtomValue } from 'jotai'
import { loadable } from 'jotai/utils'
import { communityState } from '@/app/state'

export default function Page() {
  const searchParams = useSearchParams();
  const communityId = searchParams.get('community')

  const [postsList, setPostsList] = useState<Post[]>([])
  const user = useAuthContext()

  const community = useAtomValue(loadable(communityState))

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'communities', 'test', 'posts'),
        orderBy('created_at', 'desc'),
        limit(20),
      ),
      (doc) => {
        console.log('Added data: ', doc.docChanges())
        setPostsList(doc.docs.map((doc) => doc.data() as Post))
      },
    )
    return unsubscribe
  }, [])

  console.log("posts list: ", postsList)

  if (user === 'loading') {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }
  return (
    <>
      <VStack>
        {user === null ? (
          <>
            <h1>Not logged in</h1>
            <Link href={'/signin'}>Sign in</Link>
          </>
        ) : (
          <>
            <h1>Welcome, {user.displayName}</h1>
            <Link href={'/signout'}>Sign out</Link>
          </>
        )}
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
