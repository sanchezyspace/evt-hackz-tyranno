'use client'
import '@/app/_utils/firebase'
import { useAuthContext } from '@/app/AuthProvider'
import Link from 'next/link'

export default function Page() {
  const user = useAuthContext()
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
        <Link href={'/signin'}>Sign in</Link>
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
