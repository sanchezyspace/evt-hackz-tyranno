'use client'

import { Card, HStack, Text, Textarea, VStack } from '@chakra-ui/react'
import { type } from 'os'
import { ReactElement } from 'react'
import PostingButton from './PostingButton'

type Props = {
  icon?: ReactElement
  postBody?: string
}

export default function PostingForm(props: Props) {
  return (
    <Card

      width={'100%'}
      maxWidth={'800px'}
      rounded={'lg'}
      colorScheme={'gray.100'}
      bg={'gray.100'}
      align={'flex-start'}
    >
      <HStack alignItems={'flex-start'} width={'100%'}>
        {props.icon}
        <VStack width='inherit' alignItems={'flex-end'}>
          <Textarea
            width={'100%'}
            placeholder="もっと他にやることあるやろ"
            fontSize={'16px'}
            fontWeight={'normal'}
          />
          {props.postBody}

          <PostingButton />
        </VStack>
      </HStack>
    </Card>
  )
}
