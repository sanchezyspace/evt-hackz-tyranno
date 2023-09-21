import { atom } from 'jotai'
import { Community, getCommunityFromDoc } from '../_types/Community'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../_utils/firebase'

export const communityState = atom<Community | null | 'loading'>('loading')

export const updateCommunityState = atom(
  (get) => get(communityState),
  (get, set) => {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const res = await getDoc(
          doc(db, 'users', user.uid, 'community'),
        )
        if (!res.exists()) {
          throw new Error('Community not found')
        }
        set(communityState, getCommunityFromDoc(res.id, res.data()))
      } else {
        set(communityState, null)
      }
    })
  },
)
