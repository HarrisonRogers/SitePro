'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'

const SearchUser = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const queryTerm = formData.get('search') as string
    router.push(`${pathname}?search=${queryTerm}`)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded flex flex-col justify-center items-center"
      >
        <div className="flex flex-col w-1/5 items-center justify-center space-y-4">
          <div className="w-full flex flex-col items-center space-y-2">
            <label htmlFor="search">Search for User</label>
            <Input
              type="text"
              id="search"
              name="search"
              className="w-full text-primary text-center"
            />
          </div>
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SearchUser
