import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

const EditSiteButton = ({ id }: { id: string | undefined }) => {
  return (
    <div className="p-2">
      <Button>
        <Link href={`/sites/${id}/edit`} className="outline-black">
          <Pencil />
        </Link>
      </Button>
    </div>
  )
}

export default EditSiteButton
