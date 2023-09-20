import { atom } from 'jotai'
import { Community } from './_types/Community'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './_utils/firebase'

export const communityState = atom(async () => {
  const res = await getDoc(doc(db, 'communities', 'test'))
  return res.data()
})


