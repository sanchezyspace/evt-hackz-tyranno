import { DocumentReference } from 'firebase/firestore'

export type EspCommandsQueue = {
  firestore_doc_id: string
  created_at: Date
  edited_at: Date
  endpoint: string
  executed_at: Date | null
  query_params: Map<string, string | number>
}
