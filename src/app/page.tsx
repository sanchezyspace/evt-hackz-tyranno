import { Button } from "@chakra-ui/react";
import Provider from "./Provider";

export default function Page () {
  return (
    <>
      <Provider>
        <Button colorScheme="blue">こんにちは</Button>
      </Provider>
    </>
  )
}