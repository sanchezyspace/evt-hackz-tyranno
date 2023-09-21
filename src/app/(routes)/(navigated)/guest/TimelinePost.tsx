'use client'

import { Box, Card, HStack, Image, Text, VStack } from '@chakra-ui/react'
import {
  ArrowFatDown,
  ArrowFatUp,
  Chat,
  DotsThree,
  Export,
} from '@phosphor-icons/react'
import PostActionButton from '../../../_components/ui/PostActionButton'
import { useAtomValue } from 'jotai'
import { userInfoState } from '@/app/_states/userInfoState'
import { useEffect, useRef, useState } from 'react'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/_utils/firebase'
import { useAuthContext } from '@/app/AuthProvider'

import { nanoid } from 'nanoid'
import { startRevolvingLight } from '@/app/_utils/iot_revolving_light'

type Props = {
  avatarUrl?: string
  displayName?: string
  userID?: string
  postTime?: string
  postBody?: string
  postImageUrl?: string
  commentsNumber?: string
  likesNumber?: string
  dislikesNumber?: string
  firebasePostId: string
  upvoteUsers: string[]
  downvoteUsers: string[]
}

export default function TimelinePost(props: Props) {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [likesNumber, setLikesNumber] = useState(0)
  const currentCommunityId = '91wKf49fmPHWCGYX574K'
  // const [currentCommunityId, setCurrentCommunityId] = useState<string | null>(
  //   null,
  // )
  // ...
  let postRef = useRef<any>(null)
  // ...

  useEffect(() => {
    if (isLiked) {
      setLikesNumber(likesNumber + 1)
    } else {
      setLikesNumber(likesNumber - 1)
    }
  }, [isLiked, likesNumber])

  useEffect(() => {
    if (isDisliked) {
      setLikesNumber(likesNumber - 1)
    } else {
      setLikesNumber(likesNumber + 1)
    }
  }, [isDisliked, likesNumber])

  const handleLike = () => {}

  const handleCancelLike = () => {}

  const handleDislike = () => {
    console.log(currentCommunityId)
    if (currentCommunityId === null) return

    console.log(props.downvoteUsers)

    if (props.downvoteUsers.length > 10) {
      startRevolvingLight({red: true, yellow: true, buzzer: true, duration: 1000})
    }

    updateDoc(
      doc(db, 'communities', currentCommunityId, 'posts', props.firebasePostId),
      {
        downvote_users: [...props.downvoteUsers, nanoid()],
      },
    )
  }

  return (
    <Card
      width={'100%'}
      maxWidth={'800px'}
      rounded={'lg'}
      colorScheme={'gray.100'}
      bg={'gray.50'}
      boxShadow={'xs'}
      align={'flex-start'}
      padding={6}
    >
      <HStack alignItems={'flex-start'} width={'100%'} gap={2}>
        <Image // アバター画像
          boxSize={'40px'}
          marginTop={1}
          display={'inline-block'}
          borderRadius="full"
          src={props.avatarUrl}
          alt="avatarUrl"
        />
        <VStack width={'100%'} alignItems={'flex-start'}>
          {/* アバター画像以外全部、左半分 */}
          <HStack width={'100%'}>
            {/* ユーザー名、ID、投稿時間、ボタン */}
            <HStack alignItems={'baseline'}>
              <Text fontSize={'16px'} fontWeight="bold">
                {props.displayName}
              </Text>
              <Text fontSize={'16px'} fontWeight={'normal'} color={'gray'}>
                {props.userID}
              </Text>
            </HStack>
            <Text color={'gray'}>・</Text>
            <Text color={'gray'} fontSize={'16px'}>
              {props.postTime}
            </Text>
            <div style={{ flexGrow: '1' }} />
            <DotsThree color={'gray'} />
          </HStack>
          {/* ユーザー名、ID、投稿時間、ボタン */}
          <Text>{props.postBody}</Text>
          <HStack width={'100%'} justifyContent={'space-between'}>
            {/* コメント、いいね、よくないね、共有*/}
            {/* コメント*/}
            <PostActionButton
              icon={<Chat size={'18px'} color={'gray'} />}
              amount={props.commentsNumber}
            ></PostActionButton>
            {/* いいね*/}
            <PostActionButton
              icon={<ArrowFatUp size={'18px'} color={'gray'} />}
              amount={props.likesNumber}
              onClick={handleLike}
            ></PostActionButton>
            {/* よくないね*/}
            <PostActionButton
              icon={<ArrowFatDown size={'18px'} color={'gray'} />}
              amount={props.downvoteUsers.length.toString()}
              onClick={handleDislike}
            ></PostActionButton>
            {/* 共有*/}
            <PostActionButton
              icon={<Export size={'18px'} color={'gray'} />}
              amount={''}
            ></PostActionButton>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  )
}
