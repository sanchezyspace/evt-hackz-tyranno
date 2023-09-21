'use client'
import { Button } from '@chakra-ui/react'
import Provider from './provider'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from './AuthProvider'

export default function Page() {
  const user = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (user === 'loading') return
    if (user === null) router.push('/signin')
    else router.push('/home')
  }, [user])
  return <></>
}
