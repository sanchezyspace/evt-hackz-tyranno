import { DocumentData, DocumentReference, doc } from 'firebase/firestore'
import { Post } from './Post'
import { db } from '../_utils/firebase'

export type User = {
  firestore_doc_id: string
  created_at: Date
  edited_at: Date
  user_name: string
  display_name: string
  email: string
  avatar_url: string
  bio: string
  posts: Array<Post>
  upvoted_posts: Array<Post>
  downvoted_posts: Array<Post>
}

export function getUserInfoFromDoc(
  firestore_doc_id: string,
  data: DocumentData,
): User {
  return {
    ...(data as User),
    firestore_doc_id: firestore_doc_id,
    created_at: data.created_at.toDate(),
    edited_at: data.edited_at.toDate(),
  }
}

export function createFirebaseUser(postCommunityId: string | null, user: User) {
  return {
    ...Object.entries(user)
      .filter(([key]) => key !== 'firestore_doc_id')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    posts: user.posts.map((post) => {
      post.firestore_doc_id
    }),
    upvoted_posts: postCommunityId
      ? user.upvoted_posts.map((post) => {
          doc(
            db,
            'communities',
            postCommunityId,
            'posts',
            post.firestore_doc_id,
          )
        })
      : [],
    downvoted_posts: postCommunityId
      ? user.upvoted_posts.map((post) => {
          doc(
            db,
            'communities',
            postCommunityId,
            'posts',
            post.firestore_doc_id,
          )
        })
      : [],
  }
}
