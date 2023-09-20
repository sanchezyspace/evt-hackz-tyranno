import { Box, Button, HStack, Spacer, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'

type Props = {
  icon?: ReactElement
  children: ReactElement | string
  isCurrent?: boolean
  href?: string
}

const NavigationMenuItem = (props: Props) => {
  const router = useRouter()

  return (
    <Box alignContent="center">
      <HStack>
        <Button
          leftIcon={props.icon}
          colorScheme="white"
          color="black"
          variant="solid"
          borderRadius="100px"
          bg={props.isCurrent ? 'white' : 'transparent'}
          onClick={() => {
            if (props.href) {
              router.push(props.href)
            }
          }}
        >
          <Box width="5px" />
          <Text fontSize={'18px'} fontWeight="700" transform="translateY(-1px)">
            {props.children}
          </Text>
        </Button>
      </HStack>
      <Spacer />
    </Box>
  )
}

export default NavigationMenuItem
