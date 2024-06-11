import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Logo from '@/app/assets/rbj-logo-white.png'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-primary py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
      <div>
        <Link href="/sites">
          <Image
            src={Logo}
            alt="RBJ Logo"
            className="mx-auto"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div>
        <UserButton />
      </div>
    </nav>
  )
}

export default Navbar
