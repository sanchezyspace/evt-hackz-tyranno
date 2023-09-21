import { Button, HStack, Text } from '@chakra-ui/react'
import { MouseEventHandler, ReactElement } from 'react'

type Props = {
  amount?: string
  icon: ReactElement
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function PostActionButton(props: Props) {
  return (
    <Button onClick={props.onClick} colorScheme='white'>
      <HStack width={'40px'} color={'gray'}>
        {props.icon}
        <Text>{props.amount}</Text>
      </HStack>
    </Button>
  )
}
