'use client'
import { ChakraProvider } from '@chakra-ui/react'

export default function provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>
}
