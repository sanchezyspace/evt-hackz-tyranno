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

type Props = {
  avatarUrl: string
  username: string
  userId: string
}

export default function UserIconButton(props: Props) {
  return (
    <Button>
      <HStack>
        <Image
          boxSize={'40px'}
          borderRadius="full"
          src={props.avatarUrl}
          alt="avatarUrl"
          mr="8px"
        />
        <VStack alignItems={'baseline'} gap={0}>
          <Text fontSize={'20px'} fontWeight="bold">
            {props.username}
          </Text>
          <Text fontSize={'12px'} fontWeight="normal" color="gray">
            {props.userId}
          </Text>
        </VStack>
        <Box flex="center" />
        <DotsThree color="gray" size={'24px'} />
      </HStack>
    </Button>
  )
}
