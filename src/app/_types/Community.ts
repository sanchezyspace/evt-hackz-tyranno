import { DocumentReference } from "firebase/firestore";

export type Community = {
  firestore_doc_id: string
  created_at: Date
  edited_at: Date
  name: string
  description: string
  avatar_url: string
}
