import { DocumentReference } from "firebase/firestore"
import { Post } from "./Post"

export type SavedPost = {
  firestore_ref: DocumentReference
  created_at: Date
  edited_at: Date
  post: Post
}

