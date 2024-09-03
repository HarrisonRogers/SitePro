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
        className="text-white hover:text-gray-300"
      >
        <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
      </Link>
    </div>
  )
}

export default EditProductButton
