import { Site } from '@/utils/types'
import { Check, X } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { CardFooter } from './ui/card'
import Link from 'next/link'
import DeleteSiteButton from './DeleteSiteButton'
import EditSiteButton from './EditSiteButton'
import { useUser } from '@clerk/nextjs'
import { useCheckRole } from '@/utils/roles'

function openMap(address: string) {
  const isApple =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MediaStream
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

  let url = ''
  if (address) {
    url =
      isApple || isMac
        ? `http://maps.apple.com/?q=${encodeURIComponent(address)}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address
          )}`

    window.open(url, '_blank')
  }
}

function SingleSiteCard({ site }: { site: Site | undefined }) {
  const handleOpenMap = () => {
    if (site?.siteAddress) {
      openMap(site?.siteAddress)
    } else {
      console.error('No site address available')
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const isAdmin = useCheckRole('admin')
  const isMod = useCheckRole('moderator')

  return (
    <div>
      {isAdmin || isMod ? (
        <div>
          {!isMod ? (
            <DeleteSiteButton id={site?.id} siteName={site?.jobReference} />
          ) : null}
          <EditSiteButton id={site?.id} />
        </div>
      ) : null}

      <div className="flex flex-col justify-center items-center pb-2 mb-10">
        <div className="inline-block px-6 pb-2 border-b-2 border-primary">
          <h1 className="text-4xl pt-2">
            {site?.jobReference || 'No available site reference'}
          </h1>
        </div>
        <p className="text-gray-500 text-sm pt-2">{site?.owners}</p>
      </div>
      <div className="grid grid-cols-3 text-center pb-4">
        <p className="border-r-2 flex justify-center items-center">
          Build Complete:{' '}
          {site?.buildComplete ? (
            <Check className="inline text-lime-500" />
          ) : (
            <X className="inline text-red-600" />
          )}
        </p>
        <p className="border-r-2 flex justify-center items-center">
          Build Start: {site?.buildStart ? formatDate(site?.buildStart) : 'N/A'}
        </p>
        <p>
          Address:{' '}
          {site?.siteAddress ? (
            <Link
              onClick={handleOpenMap}
              style={{
                color: 'blue',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              href={''}
            >
              {site.siteAddress}
            </Link>
          ) : (
            'N/A'
          )}
        </p>
      </div>
      <CardFooter className="mt-6 flex justify-center">
        <Button asChild className="mr-16">
          <Link href={`/sites/${site?.id}/interior`}>Interior</Link>
        </Button>
        <Button asChild>
          <Link href={`/sites/${site?.id}/exterior`}>Exterior</Link>
        </Button>
      </CardFooter>
    </div>
  )
}

export default SingleSiteCard
