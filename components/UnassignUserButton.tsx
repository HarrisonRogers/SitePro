'use client'
import React from 'react'
import { useToast } from './ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unassignUserFromSiteAction } from '@/utils/actions'
import { Button } from './ui/button'

const UnassignUserButton = ({
  siteId,
  userId,
  userName,
  siteRef,
}: {
  siteId: string
  userId: string
  userName: string | null
  siteRef: string
}) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => unassignUserFromSiteAction(siteId, userId),
    onSuccess: (data) => {
      toast({
        description: `${userName} has been unassigned from ${siteRef}`,
      })
      queryClient.invalidateQueries({ queryKey: ['sites'] })
      queryClient.invalidateQueries({ queryKey: ['singleSite', siteId] })
      queryClient.invalidateQueries({ queryKey: ['users', siteId] })
    },
  })

  const handleUnassign = () => {
    mutation.mutate()
  }

  return (
    <Button
      className="bg-red-500 hover:bg-red-400"
      onClick={handleUnassign}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Unassigning...' : 'Unassign From Property'}
    </Button>
  )
}

export default UnassignUserButton
