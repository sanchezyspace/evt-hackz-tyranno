import '@/app/_utils/firebase'

import { getAuth, GoogleAuthProvider } from 'firebase/auth'

export const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')

export const auth = getAuth()
