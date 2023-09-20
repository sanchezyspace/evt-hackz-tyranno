import { DocumentReference } from "firebase/firestore"

export type EspCommandsQueue = {
  firestore_ref: DocumentReference
  created_at: Date
  edited_at: Date
  endpoint: string
  executed_at: Date | null
  query_params: Map<string, string | number>
}
