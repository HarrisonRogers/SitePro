'use client'
import { Roles } from './globals'
import { useUser } from '@clerk/nextjs'

export const useCheckRole = (role: Roles) => {
  const { user } = useUser()

  return user?.publicMetadata?.role === role
}
