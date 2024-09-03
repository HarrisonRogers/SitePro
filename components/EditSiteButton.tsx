import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

const EditSiteButton = ({ id }: { id: string | undefined }) => {
  return (
    <Button asChild className="sm:p-2 p-1">
      <Link href={`/sites/${id}/edit`} className="outline-black">
        <Pencil className="w-8 h-5 sm:w-10 sm:h-5" />
      </Link>
    </Button>
  )
}

export default EditSiteButton
