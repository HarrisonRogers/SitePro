import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Card } from './ui/card'
import Link from 'next/link'

const AddSiteButton = () => {
  return (
    <Card className="hover:border-green-500 flex flex-col justify-center items-center h-64">
      <Link href={'/sites/add-site'}>
        <Button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600">
          <Plus />
        </Button>
      </Link>
      <h1 className="mt-4 text-2xl">Add Site</h1>
    </Card>
  )
}

export default AddSiteButton
