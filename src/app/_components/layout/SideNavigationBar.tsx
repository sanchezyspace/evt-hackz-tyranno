'use client'

import { Box, Link, Select, VStack } from '@chakra-ui/react'
import {
  Bell,
  Bookmark,
  BookmarkSimple,
  EnvelopeSimple,
  GearSix,
  House,
  NotePencil,
  UserCircle,
} from '@phosphor-icons/react'
import { usePathname, useRouter } from 'next/navigation'
import NavigationMenuItem from '../ui/NavigationMenuItem'
import UserIconButton from '../ui/UserIconButton'
import PostingButton from '../ui/PostingButton'
import { ChangeEvent, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/_utils/firebase'
import { updateUserState, userInfoState } from '@/app/_states/userInfoState'
import { useAtom } from 'jotai'

type Community = {
  id: string
  name: string
}

export default function SideNavigationBar() {
  const iconSize = 24
  const iconWeight = 'regular'
  const navMenuItems = [
    {
      disabledIcon: <House weight={iconWeight} size={iconSize} />,
      enabledIcon: <House weight={'fill'} size={iconSize} />,
      label: 'ホーム',
      href: '/home',
    },
    {
      disabledIcon: <NotePencil weight={iconWeight} size={iconSize} />,
      enabledIcon: <NotePencil weight={'fill'} size={iconSize} />,
      label: '新規作成',
      href: '/publish',
    },
    {
      disabledIcon: <Bell weight={iconWeight} size={iconSize} />,
      enabledIcon: <Bell weight={'fill'} size={iconSize} />,
      label: '通知',
      href: '/notification',
    },
    {
      disabledIcon: <BookmarkSimple weight={iconWeight} size={iconSize} />,
      enabledIcon: <BookmarkSimple weight={'fill'} size={iconSize} />,
      label: 'ブックマーク',
      href: '/bookmark',
    },
    {
      disabledIcon: <EnvelopeSimple weight={iconWeight} size={iconSize} />,
      enabledIcon: <EnvelopeSimple weight={'fill'} size={iconSize} />,
      label: 'メッセージ',
      href: '/massages',
    },
    {
      disabledIcon: <UserCircle weight={iconWeight} size={iconSize} />,
      enabledIcon: <UserCircle weight={'fill'} size={iconSize} />,
      label: 'マイページ',
      href: '/mypage',
    },
    {
      disabledIcon: <GearSix weight={iconWeight} size={iconSize} />,
      enabledIcon: <GearSix weight={'fill'} size={iconSize} />,
      label: '設定',
      href: '/preference',
    },
  ]

  const pathName = usePathname()
  const isCurrent = (href: string) => {
    return pathName.startsWith(href)
  }

  const router = useRouter()
  const [communities, setCommunities] = useState<Community[]>([])
  const [user, setUser] = useAtom(userInfoState)
  const [, updateUser] = useAtom(updateUserState)

  useEffect(() => {
    getDocs(collection(db, 'communities')).then((res) => {
      const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setCommunities(data as Community[])
    })
    updateUser()
  }, [updateUser])
  const onChangeCommunity = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`${pathName}?community=${e.target.value}`)
    // const url = new URL(location.href);
    // url.searchParams.set('community', e.target.value);
    // location.href = url.href;
    // console.log(url.href)
  }

  return (
    <Box as="nav" width="250px" p={4} bg={'gray.100'} height="100vh">
      <VStack
        justify="center"
        alignItems="left"
        spacing={3}
        margin={'auto'}
        height={'100%'}
      >
        {navMenuItems.map((e) => {
          return (
            <NavigationMenuItem
              key={e.href}
              icon={isCurrent(e.href) ? e.enabledIcon : e.disabledIcon}
              href={e.href}
              isCurrent={isCurrent(e.href)}
            >
              {e.label}
            </NavigationMenuItem>
          )
        })}
        <PostingButton />
        <Box flexGrow={2}></Box>
        {user == null ? (
          <>please sign in</>
        ) : user == 'loading' ? (
          'loading'
        ) : (
          <UserIconButton
            username={user.display_name}
            userId={user.user_name}
            avatarUrl={user.avatar_url}
          />
        )}

        <Select placeholder="Select option" onChange={onChangeCommunity}>
          {communities?.map((community) => (
            <option key={community.id} value={community.id}>
              {community.name}
            </option>
          ))}
        </Select>
      </VStack>
    </Box>
  )
}
