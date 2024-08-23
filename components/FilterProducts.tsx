import React, { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { filterCategories } from '@/utils/categories'

const FilterProducts = ({
  type,
  selectedCategory,
  setSelectedCategory,
}: {
  type: 'interior' | 'exterior'
  selectedCategory: string | null
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  return (
    <div>
      <Select
        value={selectedCategory || ''}
        onValueChange={(value) => setSelectedCategory(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="filter by category" />
        </SelectTrigger>
        <SelectContent>
          {filterCategories[type].map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FilterProducts
