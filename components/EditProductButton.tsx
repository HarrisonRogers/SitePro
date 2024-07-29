import { Pencil } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EditProductButton = ({ id, type }: { id: string; type: string }) => {
  return (
    <div>
      <Link
        href={
          type == 'exterior' ? `exterior/${id}/edit` : `interior/${id}/edit`
        }
        className="text-white"
      >
        <Pencil className="ml-1 mt-4 w-5 " />
      </Link>
    </div>
  )
}

export default EditProductButton
