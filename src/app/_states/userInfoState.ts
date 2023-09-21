import { atom } from 'jotai'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/_utils/firebase'
import { User, getUserInfoFromDoc } from '@/app/_types/User'

// ユーザー情報の状態を表すatom
export const userInfoState = atom<User | null | 'loading'>('loading')

// ユーザー情報を更新する関数
export const updateUserState = atom(
  (get) => get(userInfoState),
  (get, set) => {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const res = await getDoc(doc(db, 'users', user.uid))
        if (!res.exists()) {
          throw new Error('User not found')
        }
        set(userInfoState, getUserInfoFromDoc(res.id, res.data()))
      } else {
        set(userInfoState, null)
      }
    })
  },
)
