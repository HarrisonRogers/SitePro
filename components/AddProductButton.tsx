import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Card } from './ui/card'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const AddProductButton = () => {
  const params = useParams()
  const { id } = params

  return (
    <Card className="hover:border-green-500 flex flex-col justify-center items-center h-auto">
      <Link href={`/sites/${id}/interior/add-interior-product`}>
        <Button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 mt-4">
          <Plus />
        </Button>
      </Link>
      <h1 className="mt-4 mb-4 text-2xl">Add Product</h1>
    </Card>
  )
}

export default AddProductButton
