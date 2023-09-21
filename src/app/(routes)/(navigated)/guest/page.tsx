'use client'
import '@/app/_utils/firebase'
import Link from 'next/link'
import TimelinePost from './TimelinePost'
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
  // const communityId = searchParams.get('community')
  const [communityId, setCommunityId] = useState<string | null>(null)
  useEffect(() => {
    const id = localStorage.getItem('communityId')
    setCommunityId(id)
  }, [])

  const [postsList, setPostsList] = useState<Post[]>([])
  const [topPostBodyFormValue, setTopPostBodyFormValue] = useState<string>('')

  const handleClickPostButton = async () => {
  }

  useEffect(() => {
    console.log(communityId)

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
  return (
    <>
      <VStack width={'100%'} maxWidth={'700px'} padding={6}>
        <PageTitle>ホー</PageTitle>
        <PostingForm
          userAvatarUrl={'https://secure.gravatar.com/avatar/a1a9f42c83fdfddcfed0da2b981d4fea?s=300&d=identicon&r=g'}
          placeholder="いまどうしてる？"
          formValue={topPostBodyFormValue}
          onFormChange={(e) => {
            setTopPostBodyFormValue(e.target.value)
          }}
          onPostButtonClick={handleClickPostButton}
        />
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
              firebasePostId={post.firestore_doc_id}
              upvoteUsers={post.upvote_users}
              downvoteUsers={post.downvote_users}
            />
          )
        })}
      </VStack>
    </>
  )
}
