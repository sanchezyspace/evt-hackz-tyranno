'use client'

import { Box, Link, VStack } from '@chakra-ui/react'
import { Bell, Bookmark, BookmarkSimple, EnvelopeSimple, GearSix, House, NotePencil, UserCircle,  } from '@phosphor-icons/react'
import { usePathname, useRouter } from 'next/navigation'
import NavigationMenuItem from '../ui/NavigationMenuItem'
import MyAvatar from '../ui/MyAvatar'

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
      label: '',
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
        label: 'メッセージ',
        href: '/mypage',
      },
      {
        disabledIcon: <GearSix weight={iconWeight} size={iconSize} />,
        enabledIcon: <GearSix weight={'fill'} size={iconSize} />,
        label: '設定',
        href: '/preference',
      },

  ]

  const isCurrent = (href: string) => {
    const pathName = usePathname()
    return pathName.startsWith(href)
  }


  return (
    <Box
      as="nav"
      width="316px"
      p={4}
      bg={'gray.100'}
      height="100vh"
    >
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
        <Box flexGrow={2}></Box>
        <MyAvatar />
      </VStack>
    </Box>
  )
}
