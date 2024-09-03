'use client'
import React from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Logo from '@/app/assets/rbj-logo-white.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useCheckRole } from '@/utils/roles'

const Navbar = () => {
  const params = usePathname()
  const isAdmin = useCheckRole('admin')
  const { user } = useUser()

  return (
    <nav className="bg-primary py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/sites" className="inline">
          <Image
            src={Logo}
            alt="RBJ Logo"
            className="mx-auto w-[100px] sm:w-[150px] h-auto"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        {isAdmin && params === '/sites' ? (
          <Button asChild variant={'link'} className="text-xs sm:text-2xl p-0">
            <Link href={`/admin-dashboard`} className="text-secondary p-0">
              <h1>Change Users Role</h1>
            </Link>
          </Button>
        ) : null}
        {params !== '/sites' ? (
          <div>
            <Button
              asChild
              variant={'link'}
              className="text-xs sm:text-2xl p-0"
            >
              <Link href={`/sites`} className="text-secondary p-0">
                <h1>Back to Sites</h1>
              </Link>
            </Button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col justify-center items-center">
        <UserButton />
        {typeof user?.publicMetadata.role === 'string' && (
          <p className="text-white text-center mt-2 text-sm">
            {user.publicMetadata.role.charAt(0).toUpperCase() +
              user.publicMetadata.role.slice(1)}
          </p>
        )}
      </div>
    </nav>
  )
}

export default Navbar
