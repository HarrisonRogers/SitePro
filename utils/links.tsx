import React from 'react'
import { Home, HardHat, TreeDeciduous } from 'lucide-react'

type NavLink = {
  href: string
  label: string
  icon: React.ReactNode
}

const links: NavLink[] = [
  {
    href: '/sites',
    label: 'Sites',
    icon: <HardHat />,
  },
  {
    href: '/interior',
    label: 'Interior',
    icon: <Home />,
  },
  {
    href: '/exterior',
    label: 'Exterior',
    icon: <TreeDeciduous />,
  },
]

export default links
