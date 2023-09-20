import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { DotsThree } from '@phosphor-icons/react'

export default function MyAvatar() {
  return (
    <HStack>
      <Image
        boxSize={'40px'}
        borderRadius="full"
        src="https://avatars.githubusercontent.com/u/6916170?v=4"
        alt="avatarUrl"
        mr="8px"
      />
      <VStack alignItems={'baseline'} gap={0}>
        <Text fontSize={'20px'} fontWeight="bold">
          万事急須
        </Text>
        <Text fontSize={'12px'} fontWeight="normal" color="gray">
          @BigBigBigCrisis
        </Text>
      </VStack>
      <Box flex="center" />
      <DotsThree color="gray" size={'24px'} />
    </HStack>
  )
}
