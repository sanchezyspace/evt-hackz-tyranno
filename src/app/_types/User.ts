import { DocumentReference } from "firebase/firestore"
import { Post } from "./Post"

export type User = {
  firestore_ref: DocumentReference
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
