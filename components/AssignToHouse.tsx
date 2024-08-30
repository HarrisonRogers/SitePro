import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'
import { fetchUsersAction } from '@/utils/actions'
import { Card } from './ui/card'
import { User } from '@clerk/nextjs/server'
import Image from 'next/image'

const AssignToHouse = ({ siteId }: { siteId: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', siteId],
    queryFn: () => fetchUsersAction(String(siteId)),
    enabled: !!siteId,
  })

  if (isLoading) {
    return <div className="text-4xl text-black text-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="text-4xl text-black text-center">Error loading users</div>
    )
  }

  const users = data?.data || []

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: User) => (
          <Card key={user.id} className="mb-8 p-6 bg-white shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center text-center">
              <div className="flex items-center justify-center md:justify-center">
                <Image
                  src={user.imageUrl}
                  alt="Profile Picture"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</div>
              <div
                className="text-sm text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide"
                style={{ maxWidth: '100%' }}
              >
                {
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress
                }
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Button className="bg-blue-500 hover:bg-blue-400">
        Assign To Property
      </Button>
    </div>
  )
}

export default AssignToHouse
