'use client'
import React from 'react'
import { useToast } from './ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  deleteExteriorProductAction,
  deleteInteriorProductAction,
} from '@/utils/actions'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

type DeleteProductProps = {
  type: 'interior' | 'exterior'
  id: string | undefined
}

const DeleteProductButton: React.FC<DeleteProductProps> = ({ type, id }) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()
  const { id: siteId } = useParams()

  const mutationFn =
    type === 'interior'
      ? (id: string) => deleteInteriorProductAction(siteId as string, id)
      : (id: string) => deleteExteriorProductAction(siteId as string, id)

  const { mutate } = useMutation({
    mutationFn: (id: string | undefined) => mutationFn(String(id)),
    onSuccess: () => {
      toast({ description: 'Product deleted successfully' })
      queryClient.invalidateQueries({ queryKey: [`${type}Products`, siteId] })
      router.push(`/sites/${siteId}/${type}`)
    },
    onError: () => {
      toast({ description: 'Failed to delete product' })
    },
  })

  const handleDelete = (id: string | undefined) => {
    mutate(id)
  }

  return (
    <div className="p-2 pb-0">
      <Button variant={'outline'} onClick={() => handleDelete(id)}>
        <X />
      </Button>
    </div>
  )
}

export default DeleteProductButton
