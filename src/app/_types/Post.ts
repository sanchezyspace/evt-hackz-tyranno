import { DocumentReference } from "firebase/firestore"
import { User } from "./User"

export type Post = {
  firestore_ref: DocumentReference
  created_at: Date
  edited_at: Date
  user: User
  body: string
  media_urls: Array<string>
  upvotes: Array<User>
  downvotes: Array<User>
  replies: Array<Post>
}

