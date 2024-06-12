'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const Interior = () => {
  const params = useParams()
  const id = params

  return <div className="text-4xl">interior for</div>
}

export default Interior
