import { Card, HStack, VStack } from '@chakra-ui/react'
import { type } from 'os'
import { ReactElement } from 'react'

type Props = {
  icon?: ReactElement
  postBody?: string
}

export default function PostingButton(props: Props) {
  return(
  <>
   <Card
      width={'80%'}
      maxWidth={'800px'}
      rounded={'lg'}
      colorScheme={'gray.100'}
      bg={'gray.100'}
      align={'flex-start'}
    >
    <HStack>
      {props.icon}
      <VStack>

      </VStack>
    </HStack>


  </Card>
  </>
  )
}
