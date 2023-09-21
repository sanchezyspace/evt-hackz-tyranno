import { Post } from './Post'

export type SavedPost = {
  firestore_doc_id: string
  created_at: Date
  edited_at: Date
  post: Post
}
