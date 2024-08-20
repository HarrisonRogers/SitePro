'use client'
import SearchUser from '@/components/SearchUser'
import { useCheckRole } from '@/utils/roles'
import { redirect } from 'next/navigation'
import React from 'react'

const UsersPage = () => {
  if (!useCheckRole('admin')) {
    redirect('/sites')
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl">Admin Page</h1>
      <SearchUser />
    </div>
  )
}

export default UsersPage
