'use client'
import React from 'react'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const Index = () => {
  // const router = useRouter()
  const params = useParams()
  const { id } = params

  return (
    <div>
      <h1>Site Details for {id}</h1>
      <Link href={`/sites/${id}/interior`}>Interior</Link>
      <Link href={`/sites/${id}/exterior`}>Exterior</Link>
    </div>
  )
}

export default Index
