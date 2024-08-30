import React from 'react'
import { Button } from './ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { assignUserToHouseAction } from '@/utils/actions'
import { useToast } from './ui/use-toast'

const AssignUserToHouseButton = ({
  userId,
  userName,
  siteId,
  siteRef,
}: {
  userId: string
  userName: string | null
  siteId: string
  siteRef: string | undefined
}) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => assignUserToHouseAction(userId, siteId),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'There was an error' })
        return
      }
      toast({
        description: `${userName} has been assigned to ${siteRef}`,
      })
      queryClient.invalidateQueries({ queryKey: ['users', siteId] })
      queryClient.invalidateQueries({ queryKey: ['singleSite', siteId] })
    },
    onError: () => {
      toast({ description: `Failed to assign ${userName} to ${siteRef}` })
    },
  })

  const handleSubmit = () => {
    mutation.mutate()
  }

  return (
    <Button
      className="bg-blue-500 hover:bg-blue-400"
      onClick={handleSubmit}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Assigning...' : 'Assign To Property'}
    </Button>
  )
}

export default AssignUserToHouseButton
