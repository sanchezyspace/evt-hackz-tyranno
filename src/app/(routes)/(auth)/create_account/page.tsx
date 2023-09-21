'use client'

import React, { useState } from 'react'
import { User, getUserInfoFromDoc } from '@/app/_types/User'
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { EditAccountForm } from '@/app/_components/EditAccountForm'

export default function Page() {
  return <EditAccountForm />
}
