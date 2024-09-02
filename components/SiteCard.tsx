import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Check, X } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Site } from '@/utils/types'

const SiteCard = ({ site }: { site: Site }) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  return (
    <div className="flex flex-col justify-center items-center text-center h-full">
      <CardHeader>
        <Button
          asChild
          variant={'link'}
          className="text-2xl flex justify-start  p-0"
        >
          <Link href={`sites/${site.id}`} className="w-full">
            <CardTitle
              className={
                site.jobReference.length > 20
                  ? 'lg:text-xl md:text-lg sm:text-base text-sm capitalize'
                  : 'capitalize'
              }
            >
              {site.jobReference}
            </CardTitle>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="capitalize">Owners: {site.owners}</p>
        <p>
          Build Start: {site.buildStart ? formatDate(site?.buildStart) : 'N/A'}
        </p>
        <p>
          Build Complete:{' '}
          {site.buildComplete ? (
            <Check className="inline text-lime-500" />
          ) : (
            <X className="inline text-red-600" />
          )}
        </p>
      </CardContent>
    </div>
  )
}

export default SiteCard
