'use client'
import { useAuth, useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'

const RoleAssignment = () => {
  const { isLoaded, userId } = useAuth()
  const { user, isSignedIn, isLoaded: isUserLoaded } = useUser()

  useEffect(() => {
    const assignRole = async () => {
      if (isLoaded && userId) {
        try {
          const res = await fetch('/api/sites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }

          const data = await res.json()
          console.log(data.message)

          await user?.reload()
        } catch (error) {
          console.error('Error assigning role:', error)
        }
      }
    }

    assignRole()
  }, [isLoaded, isUserLoaded, userId, isSignedIn, user])

  return null
}

export default RoleAssignment
