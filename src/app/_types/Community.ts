import { DocumentReference } from "firebase/firestore";

export type Community = {
  firestore_doc_id: string
  created_at: Date
  edited_at: Date
  community_name: string
  display_name: string
  members: Array<string>
  description: string
  avatar_url: string
}

export const getCommunityFromDoc = (docId: string, docData: any): Community => {
  return {
    firestore_doc_id: docId,
    created_at: docData.created_at.toDate(),
    edited_at: docData.edited_at.toDate(),
    community_name: docData.name,
    display_name: docData.display_name,
    members: docData.members,
    description: docData.description,
    avatar_url: docData.avatar_url,
  }
}
