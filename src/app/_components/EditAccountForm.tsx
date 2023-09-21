'use client'

import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/app/AuthProvider'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/app/_utils/firebase'
import { User } from '../_types/User'
import { useAtomValue } from 'jotai'
import { userInfoState } from '../_states/userInfoState'

type Props = {
  buttonContent?: React.ReactNode
}

export const EditAccountForm = (props: Props) => {
  const [userName, setUserName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [bio, setBio] = useState('')
  const router = useRouter()

  const authUser = useAuthContext()
  const user = useAtomValue(userInfoState)

  useEffect(() => {
    if (user === null || user === 'loading') {
      return
    }
    setUserName(user.user_name)
    setDisplayName(user.display_name)
    setEmail(user.email)
    setAvatarUrl(user.avatar_url)
    setBio(user.bio)
  }, [user])

  const handleCreateAccount = async () => {
    try {
      if (authUser === null) {
        throw new Error('ログインしていません')
      }
      if (authUser === 'loading') {
        throw new Error('ログイン情報を取得中です')
      }
      const newUser: User = {
        firestore_doc_id: authUser.uid,
        created_at: new Date(),
        edited_at: new Date(),
        user_name: userName,
        display_name: displayName,
        email: email,
        avatar_url: avatarUrl,
        bio: bio,
        posts: [],
        upvoted_posts: [],
        downvoted_posts: [],
      }

      await setDoc(doc(db, 'users', authUser.uid), newUser)

      router.push('/')
    } catch (error) {
      console.error('アカウント作成に失敗しました:', error)
    }
  }

  return (
    <Center>
      <VStack spacing={4}>
        <FormControl id="user_name">
          <FormLabel>ユーザー名</FormLabel>
          <Input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value)
            }}
          />
        </FormControl>
        <FormControl id="display_name">
          <FormLabel>表示名</FormLabel>
          <Input
            type="text"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value)
            }}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>メールアドレス</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </FormControl>
        <FormControl id="avatar_url">
          <FormLabel>アバターURL</FormLabel>
          <Input
            type="text"
            value={avatarUrl}
            onChange={(e) => {
              setAvatarUrl(e.target.value)
            }}
          />
        </FormControl>
        <FormControl id="bio">
          <FormLabel>自己紹介</FormLabel>
          <Textarea
            value={bio}
            onChange={(e) => {
              setBio(e.target.value)
            }}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={handleCreateAccount}
          isLoading={authUser === 'loading'}
        >
          {props.buttonContent ?? '更新する'}
        </Button>
      </VStack>
    </Center>
  )
}
