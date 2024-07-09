import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Card } from './ui/card'

const AddSiteButton = () => {
  return (
    <Card className="hover:border-green-500">
      <div className="flex flex-col justify-center items-center h-full">
        <Button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600">
          <Plus />
        </Button>
        <h1 className="mt-4 text-2xl">Add Site</h1>
      </div>
    </Card>
  )
}

export default AddSiteButton
