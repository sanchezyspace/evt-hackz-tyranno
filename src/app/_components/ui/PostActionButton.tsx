import { HStack, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

type Props = {
  amount?: string
  icon: ReactElement
}

export default function PostActionButton(props: Props) {
  return (
    <HStack width={'50px'} color={'gray'}>
      {props.icon}
      <Text>{props.amount}</Text>
    </HStack>
  )
}
