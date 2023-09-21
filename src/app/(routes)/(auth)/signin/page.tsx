'use client'

import { auth, googleAuthProvider } from '@/app/_utils/firebase_authentication'
import { Button, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { GoogleLogo } from '@phosphor-icons/react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAtom } from 'jotai'
import { updateUserState, userInfoState } from '@/app/_states/userInfoState'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/_utils/firebase'

export default function Page() {
  const router = useRouter()
  const [user, setUser] = useAtom(userInfoState)
  const [, updateUser] = useAtom(updateUserState)

  const handleClickSignIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        if (credential === null) {
          throw new Error('GoogleAuthProvider.credentialFromResult is null')
        }
        const token = credential.accessToken
        const user = result.user

        console.log('token', token)
        console.log('user', user)

        const res = await getDoc(doc(db, 'users', user.uid))
        if (!res.exists()) {
          router.push('/create_account')
          return
        } else {
          router.push('/')
          return
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  return (
    <>
      <HStack h={'100vh'}>
        <Center h={'100%'} bg={'red.300'} flexGrow={1}>
          <Text fontSize={'3xl'} fontWeight={'600'}>
            Welcome to #0FF
          </Text>
        </Center>
        <Center h={'100%'} bg={'white'} flexGrow={1}>
          <VStack
            width={'400px'}
            gap={'10px'}
            // bg={'gray.100'}
            rounded={'3xl'}
            padding={'20px'}
          >
            <Flex alignItems={'flex-start'} width={'100%'}>
              <Text fontSize={'xl'} fontWeight={'600'} textAlign={'left'}>
                Sign In
              </Text>
            </Flex>
            <Button
              leftIcon={<GoogleLogo size={24} />}
              colorScheme={'white'}
              bg={'gray.100'}
              color={'black'}
              width={'100%'}
              onClick={handleClickSignIn}
            >
              Sign In with Google
            </Button>
          </VStack>
        </Center>
      </HStack>
    </>
  )
}
