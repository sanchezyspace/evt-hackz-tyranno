'use client'
import '@/app/_utils/firebase'
import Link from 'next/link'
import TimelinePost from '@/app/_components/ui/TimelinePost'
import { VStack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Post, createFirestorePost } from '@/app/_types/Post'
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { db } from '@/app/_utils/firebase'
import { getTwitterTimeElapsedString } from '@/app/_utils/time'
import PostingForm from '@/app/_components/ui/PostingForm'
import { userInfoState } from '@/app/_states/userInfoState'
import { useAtomValue } from 'jotai'
import { PageTitle } from '@/app/_components/ui/PageTitle'

export default function Page() {
  const searchParams = useSearchParams()
  const communityId = searchParams.get('community')

  const [postsList, setPostsList] = useState<Post[]>([])
  const [topPostBodyFormValue, setTopPostBodyFormValue] = useState<string>('')
  const user = useAtomValue(userInfoState)

  const handleClickPostButton = async () => {
    if (communityId === null) {
      return
    }
    if (user === null || user === 'loading') {
      return
    }
    const post: Post = {
      firestore_doc_id: '',
      body: topPostBodyFormValue,
      created_at: new Date(),
      edited_at: new Date(),
      upvote_users: [],
      downvote_users: [],
      replies: [],
      media_urls: [],
      author_info: {
        user_name: user.user_name,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
      },
    }
    const firestorePost = createFirestorePost(communityId, post)
    console.log(firestorePost)
    try {
      await addDoc(
        collection(db, 'communities', communityId, 'posts'),
        firestorePost,
      )
      setTopPostBodyFormValue('')
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  useEffect(() => {
    if (communityId === null) {
      return
    }
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'communities', communityId, 'posts'),
        orderBy('created_at', 'desc'),
        limit(20),
      ),
      (doc) => {
        console.log(
          'Added data: ',
          doc.docs.map((doc) => doc.data()),
        )
        setPostsList(
          doc.docs.map(
            (doc) =>
              ({
                ...doc.data(),
                firestore_doc_id: doc.id,
                created_at: doc.data().created_at.toDate(),
              } as Post),
          ),
        )
      },
    )
    return unsubscribe
  }, [communityId])

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
      <VStack width={'100%'} maxWidth={'700px'} padding={6}>
        <PageTitle>ホー</PageTitle>
        <PostingForm
          userAvatarUrl={user.avatar_url}
          placeholder="いまどうしてる？"
          formValue={topPostBodyFormValue}
          onFormChange={(e) => {
            setTopPostBodyFormValue(e.target.value)
          }}
          onPostButtonClick={handleClickPostButton}
        />
        {user === null ? (
          <>
            <h1>Not logged in</h1>
            <Link href={'/signin'}>Sign in</Link>
          </>
        ) : (
          <>
            {/* <h1>Welcome, {user.display_name}</h1>
            <Link href={'/signout'}>Sign out</Link> */}
          </>
        )}
        {postsList.map((post) => {
          return (
            <TimelinePost
              key={post.firestore_doc_id}
              avatarUrl={post.author_info.avatar_url}
              displayName={post.author_info.display_name}
              userID={'@' + post.author_info.user_name}
              postTime={getTwitterTimeElapsedString(post.created_at)}
              postBody={post.body}
              commentsNumber={post.replies.length.toString()}
              likesNumber={post.upvote_users.length.toString()}
            />
          )
        })}
      </VStack>
    </>
  )
}
