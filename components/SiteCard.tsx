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
  return (
    <div>
      <CardHeader>
        <Button
          asChild
          variant={'link'}
          className="text-2xl flex justify-start w-0 p-0"
        >
          <Link href={`sites/${site.id}`} className="">
            <CardTitle>{site.jobReference}</CardTitle>
          </Link>
        </Button>
        <CardDescription>{site.siteAddress}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Owners: {site.owners}</p>
        <p>Build Start: {site.buildStart}</p>
        <p>
          Build Complete:{' '}
          {site.buildComplete ? (
            <Check className="inline text-lime-500" />
          ) : (
            <X className="inline text-red-600" />
          )}
        </p>
        <CardFooter className="mt-4 p-0 flex justify-between">
          <Button asChild>
            <Link href={`sites/${site.id}/interior`}>Interior</Link>
          </Button>
          <Button asChild>
            <Link href={`sites/${site.id}/exterior`}>Exterior</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </div>
  )
}

export default SiteCard
