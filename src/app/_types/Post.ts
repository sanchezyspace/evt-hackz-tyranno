import { DocumentData, DocumentReference, doc } from 'firebase/firestore'
import { db } from '../_utils/firebase'
import { User } from './User'

export type Post = {
  firestore_doc_id: string
  created_at: Date
  edited_at: Date
  body: string
  media_urls: Array<string>
  upvote_users: Array<User>
  downvote_users: Array<User>
  replies: Array<Post>
  author_info: {
    user_name: string
    display_name: string
    avatar_url: string
  }
}

export function getPostFromDoc(
  doc: DocumentReference,
  data: DocumentData,
): Post {
  return {
    ...(data as Post),
    firestore_doc_id: doc.id,
    created_at: data.created_at.toDate(),
    edited_at: data.edited_at.toDate(),
  }
}

export function createFirestorePost(postCommunityId: string, post: Post) {
  if (postCommunityId === null) {
    throw new Error('currentCommunityId is null')
  }
  return {
    ...Object.entries(post)
      .filter(([key]) => key !== 'firestore_doc_id')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    replies: post.replies.map((reply) => {
      doc(db, 'communities', postCommunityId, 'posts', reply.firestore_doc_id)
    }),
    author_info: {
      user_name: post.author_info.user_name,
      display_name: post.author_info.display_name,
      avatar_url: post.author_info.avatar_url,
    },
  }
}
