import PostingForm from '@/app/_components/ui/PostingForm'
import { Image } from '@chakra-ui/react'

export default function Page() {
  return (
    <>
      <PostingForm
        postBody="古代中国"
        icon={
          <Image
            borderRadius="full"
            boxSize="40px"
            src="https://avatars.githubusercontent.com/u/6916170?v=4"
            alt="thank you"
          />
        }
      />
    </>
  )
}
