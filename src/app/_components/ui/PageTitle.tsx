import { Flex, Text } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export const PageTitle = (props: PropsWithChildren) => {
  return (
    <Flex width={'100%'}>
      <Text fontSize={'24px'} fontWeight={'bold'} padding={2}>
        {props.children}
      </Text>
    </Flex>
  )
}
