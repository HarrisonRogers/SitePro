import React from 'react'
import { ExteriorProduct } from '@/utils/types'

function ProductCard({ product }: { product: ExteriorProduct }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 text-center text-muted py-4">
      <div className=" border-r-2 h-full flex justify-center items-center py-1">
        <h1 className="text-xl md:text-2xl">{product.name}</h1>
      </div>
      <div className="hidden border-r-2 md:flex justify-center items-center">
        <h1>{product.supplier}</h1>
      </div>
      <div className="hidden border-r-2 md:flex justify-center items-center">
        {product.installers.map((person) => (
          <div key={person.id}>
            <h1>
              {person.name}: {person.contact}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <div>
          {product.maintenanceInstructions.map((instruction) => (
            <div key={instruction.id}>
              <h1>{instruction.actionRequired}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
