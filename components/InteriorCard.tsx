import React from 'react'
import { InteriorProduct } from '@/utils/types'

function InteriorCard({ product }: { product: InteriorProduct }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <h1>{product.supplier}</h1>
      {product.installers.map((person) => (
        <div key={person.id}>
          <h1>{person.name}</h1>
          <h1>Contact - {person.contact}</h1>
        </div>
      ))}
    </div>
  )
}

export default InteriorCard
