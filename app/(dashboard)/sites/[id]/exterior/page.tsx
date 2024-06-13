'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Product = {
  name: string
  quantity: number
}

const Exterior = () => {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const productsParam = searchParams.get('products')
    if (productsParam) {
      const decodedProducts = decodeURIComponent(productsParam).trim()
      setProducts(JSON.parse(decodedProducts))
    }
  }, [searchParams])

  return (
    <div>
      <h1>Exterior Products</h1>
      <ul>
        {products?.map((product, index) => (
          <li key={index}>
            {product.name} - Quantity: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Exterior
