import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { clerkClient, User } from '@clerk/nextjs/server'

const AssignToHouse = () => {
  const [users, setUsers] = useState([])

  return (
    <div className="flex justify-center items-center mt-6">
      <Button className="bg-blue-500 hover:bg-blue-400">
        Assign To Property
      </Button>
    </div>
  )
}

export default AssignToHouse
