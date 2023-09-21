'use client'

type Props = {}

import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { set } from 'firebase/database'
import { MouseEventHandler, useEffect, useState } from 'react'

export default function HaikuGenerator() {
  const [kaminoku, setKaminoku] = useState('')
  const [nakanoku, setNakanoku] = useState('')
  const [shimonoku, setShimonoku] = useState('')

  const [rotate, setRotate] = useState(0)

  const [haikuReview, setHaikuReview] = useState<'meiku' | 'unko' | null>(null)

  const [isValidHaiku, setValidHaiku] = useState(false)

  useEffect(() => {
    setValidHaiku(kaminoku !== '' && nakanoku !== '' && shimonoku !== '')
  }, [kaminoku, nakanoku, shimonoku])

  const handleClickUnko: MouseEventHandler<HTMLButtonElement> = () => {
    setRotate((before) => {
      return before + 15
    })
    setHaikuReview('unko')
  }

  const resetForms = () => {
    setKaminoku('')
    setNakanoku('')
    setShimonoku('')
    setRotate(0)
    setHaikuReview(null)
  }

  return (
    <HStack display={['none', 'block']} >
      <VStack>
        {haikuReview !== null ? (
          <Image
            position={'absolute'}
            top={'163px'}
            left={'406px'}
            src={
              haikuReview == 'meiku'
                ? '/widget/haiku-generator/hoshi.png'
                : haikuReview == 'unko'
                ? '/widget/haiku-generator/kusoga.png'
                : ''
            }
            alt="star"
            zIndex={'-1000'}
          ></Image>
        ) : (
          <></>
        )}
        <Flex
          marginTop={'20px'}
          style={{
            writingMode: 'vertical-rl',
            transform: `rotate(` + rotate + `deg)`,
          }}
          fontSize={'32px'}
          fontWeight={'bold'}
          flexDirection={'column'}
          height={'300px'}
        >
          <Text>{kaminoku}</Text>
          <Text>{nakanoku}</Text>
          <Text>{shimonoku}</Text>
        </Flex>

        <Input
          value={kaminoku}
          placeholder="上の句"
          onChange={(e) => {
            setKaminoku(e.target.value)
          }}
        />
        <Input
          value={nakanoku}
          placeholder="中の句"
          onChange={(e) => {
            setNakanoku(e.target.value)
          }}
        />
        <Input
          value={shimonoku}
          placeholder="下の句"
          onChange={(e) => {
            setShimonoku(e.target.value)
          }}
        />
        {isValidHaiku ? (
          <VStack>
            <HStack>
              <Button colorScheme={'red'} color={'white'}>
                名句！
              </Button>
              <Button
                colorScheme={'blue'}
                color={'white'}
                onClick={handleClickUnko}
              >
                うんこ句笑
              </Button>
            </HStack>
            <Button colorScheme={'white'} color={'black'} onClick={resetForms}>
              リセット
            </Button>
          </VStack>
        ) : (
          <></>
        )}
      </VStack>
      <Text
        marginTop={'20px'}
        style={{ writingMode: 'vertical-rl' }}
        fontSize={'32px'}
        fontWeight={'bold'}
      >
        俳句ジェネレーター
      </Text>
    </HStack>
  )
}
