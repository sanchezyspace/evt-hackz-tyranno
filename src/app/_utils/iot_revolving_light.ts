import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'

const defaultDuration = 1500

type Props = {
  red: boolean
  yellow: boolean
  buzzer: boolean
  duration: number
}

export const addDocument = async (channel: number, duration: number) => {
  await addDoc(collection(db, 'esp_commands_queue'), {
    endpoint: 'relay',
    method: 'POST',
    query_params: {
      channel,
      state: 1,
      duration,
    },
  })
}

export const startRevolvingLight = async (props: Props) => {
  if (props.red) addDocument(2, props.duration ?? defaultDuration)
  if (props.yellow) addDocument(1, props.duration ?? defaultDuration)
  if (props.buzzer) addDocument(0, props.duration ?? defaultDuration)
}
