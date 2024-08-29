import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'
import { fetchUsersAction } from '@/utils/actions'
import { Card } from './ui/card'
import { User } from '@clerk/nextjs/server'

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

  if (!Array.isArray(users)) {
    console.error('Data is not an array:', data)
    return (
      <div className="text-4xl text-black text-center">
        Data is not an array
      </div>
    )
  }

  // Log each user individually
  users.forEach((user) => console.log(user))

  // Render user cards
  const userComponents = users.map((user) => (
    <Card key={user.id} className="p-4">
      <div className="text-lg font-semibold">
        {user.first_name} {user.last_name}
      </div>
      <div className="text-sm text-gray-600">{user.email}</div>
    </Card>
  ))

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userComponents}
      </div>
      <Button className="bg-blue-500 hover:bg-blue-400">
        Assign To Property
      </Button>
    </div>
  )
}

export default AssignToHouse
