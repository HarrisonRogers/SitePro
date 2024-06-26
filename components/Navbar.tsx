'use client'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Logo from '@/app/assets/rbj-logo-white.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const params = usePathname()

  return (
    <nav className="bg-primary py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/sites" className="inline">
          <Image
            src={Logo}
            alt="RBJ Logo"
            className="mx-auto"
            width={150}
            height={150}
          />
        </Link>
      </div>
      {params !== '/sites' ? (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Button asChild variant={'link'} className="text-2xl p-0">
            <Link href={`/sites`} className="text-secondary p-0">
              <h1>Back to Sites</h1>
            </Link>
          </Button>
        </div>
      ) : (
        ''
      )}

      <div>
        <UserButton />
      </div>
    </nav>
  )
}

export default Navbar
