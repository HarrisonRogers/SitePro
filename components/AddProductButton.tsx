import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Card } from './ui/card'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

const AddProductButton = () => {
  const params = useParams()
  const { id } = params
  const path = usePathname()

  return (
    <Card className="hover:border-green-500 flex flex-col justify-center items-center h-auto">
      {path !== `/sites/${id}/exterior` ? (
        <div className="text-center">
          <Link href={`/sites/${id}/interior/add-interior-product`}>
            <Button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 mt-2">
              <Plus />
            </Button>
          </Link>
          <h1 className="mt-2 mb-2 text-2xl">Add Interior Product</h1>
        </div>
      ) : (
        <div className="text-center">
          <Link href={`/sites/${id}/exterior/add-exterior-product`}>
            <Button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 mt-2">
              <Plus />
            </Button>
          </Link>
          <h1 className="mt-2 mb-2 text-2xl">Add Exterior Product</h1>
        </div>
      )}
    </Card>
  )
}

export default AddProductButton
