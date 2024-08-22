'use client'
import React from 'react'
import { Button } from './ui/button'
import { setRole } from '@/app/(dashboard)/admin-dashboard/_actions'
import { useToast } from './ui/use-toast'
import { useMutation } from '@tanstack/react-query'

function MakeAdminButton({
  userId,
  userName,
  userRole,
}: {
  userId: string
  userName: string | null
  userRole: string | null
}) {
  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await setRole(formData)
      return res
    },
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'There was an error' })
        return
      }
      toast({
        description: `${userName} is now a moderator`,
      })
      window.location.reload()
    },
  })

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    const confirmMessage =
      userRole === 'moderator'
        ? `Do you want to remove ${userName}'s moderator role?`
        : `Do you want ${userName} to be a Moderator? They will be able to edit sites and products`

    const confirm = window.confirm(confirmMessage)
    if (!confirm) {
      return
    }

    const formData = new FormData(e.currentTarget)
    mutation.mutate(formData)
  }

  return userRole === 'moderator' ? (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={userId} name="id" />
      <input type="hidden" value="" name="role" />
      <Button type="submit" className="bg-red-500 hover:bg-red-400">
        {mutation.isPending ? 'Pending...' : 'Take Permission Away'}
      </Button>
    </form>
  ) : (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={userId} name="id" />
      <input type="hidden" value="moderator" name="role" />
      <Button type="submit" className="bg-blue-500 hover:bg-blue-400">
        {mutation.isPending ? 'Pending...' : 'Make Moderator'}
      </Button>
    </form>
  )
}

export default MakeAdminButton
