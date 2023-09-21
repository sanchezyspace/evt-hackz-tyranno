import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './AuthProvider'
import Provider from './provider'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Provider>
            <ChakraProvider>{children}</ChakraProvider>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  )
}
