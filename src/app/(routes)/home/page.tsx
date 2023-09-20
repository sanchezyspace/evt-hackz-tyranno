'use client'
import '@/app/_utils/firebase'
import { useAuthContext } from '@/app/AuthProvider'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import { useState } from 'react'

export default function Page() {
  const [user, setUser] = useState<User | null | 'loading'>('loading')

  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user)
      setUser(user)
    } else {
      console.log('User is signed out')
      setUser(null)
    }
  })
  if (user === 'loading') {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }

  if (user === null) {
    return (
      <>
        <h1>Not logged in</h1>
        <Link href={'/signin'}>Sign in </Link>
      </>
    )
  }

  return (
    <>
      <h1>Home</h1>
      <p>Welcome {user.displayName}</p>
    </>
  )
}
