import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'
import { fetchUsersAction } from '@/utils/actions'
import { Card } from './ui/card'
import { User } from '@clerk/nextjs/server'
import Image from 'next/image'
import AssignUserToHouseButton from './AssignUserToHouseButton'
import { UserSite } from '@/utils/types'
import UnassignUserButton from './UnassignUserButton'

const AssignToHouse = ({
  siteId,
  siteRef,
  siteUsers,
}: {
  siteId: string
  siteRef: string
  siteUsers: UserSite[] | undefined
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', siteId],
    queryFn: () => fetchUsersAction(String(siteId)),
    enabled: !!siteId,
  })

  if (isLoading) {
    return <div className="text-xl text-black text-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="text-xl text-black text-center">Error loading users</div>
    )
  }

  const users = data?.data || []

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: User) => {
          const isAssigned = siteUsers?.some(
            (siteUser) =>
              siteUser.userId === user.id && siteUser.siteId === siteId
          )
          return (
            <Card key={user.id} className="mb-8 p-6 bg-white shadow-md">
              <div className="grid grid-cols-1 gap-4 items-center text-center">
                <div className="flex items-center justify-center md:justify-center">
                  <Image
                    src={user.imageUrl}
                    alt="Profile Picture"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <div className="text-lg font-semibold">
                  {user.firstName} {user.lastName === '' ? '' : user.lastName}
                </div>
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
                <div>
                  {!isAssigned ? (
                    <AssignUserToHouseButton
                      userId={user.id}
                      userName={user.firstName}
                      siteId={siteId}
                      siteRef={siteRef}
                    />
                  ) : (
                    <UnassignUserButton
                      siteId={siteId}
                      userId={user.id}
                      userName={user.firstName}
                      siteRef={siteRef}
                    />
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default AssignToHouse
