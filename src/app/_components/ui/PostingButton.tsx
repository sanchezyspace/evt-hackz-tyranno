import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { PlusCircle } from '@phosphor-icons/react'
import { MouseEventHandler } from 'react'

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function PostingButton(props: Props) {
  return (
    <Box alignContent="center">
      <Button
        width={'200px'}
        height={'50px'}
        borderRadius="100px"
        onClick={props.onClick}
        bg={'red.400'}
        _hover={{ bg: '#C53030' }}
      >
        <HStack>
          <PlusCircle size={'32px'} />
          <Text fontSize={'20px'}>投稿する</Text>
        </HStack>
      </Button>
    </Box>
  )
}
