'use client'
import React from 'react'
import { useToast } from './ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSiteAction } from '@/utils/actions'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

function DeleteSiteButton({
  id,
  siteName,
}: {
  id: string | undefined
  siteName: string | undefined
}) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: (id: string | undefined) => deleteSiteAction(String(id)),
    onSuccess: () => {
      toast({ description: 'Site deleted successfully' })
      queryClient.invalidateQueries({ queryKey: ['sites'] })
      router.push('/sites')
    },
    onError: () => {
      toast({ description: 'Failed to delete site' })
    },
  })

  const handleDelete = (id: string | undefined) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${siteName}`
    )
    mutate(id)
  }

  return (
    <Button
      className="sm:p-2 p-1"
      variant={'destructive'}
      onClick={() => handleDelete(id)}
    >
      <X className="w-8 h-5 sm:w-10 sm:h-5" />
    </Button>
  )
}

export default DeleteSiteButton
