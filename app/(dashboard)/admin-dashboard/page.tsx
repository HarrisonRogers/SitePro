import { redirect } from 'next/navigation'
import { clerkClient } from '@clerk/nextjs/server'
import SearchUser from '@/components/SearchUser'
import { setRole } from './_actions'
import checkRole from './_check-role'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import MakeAdminButton from '@/components/MakeAdminButton'

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const isAdmin = await checkRole('admin')

  if (!isAdmin) {
    redirect('/sites')
  }

  // const query = searchParams?.search
  const usersResponse = await clerkClient.users.getUserList()
  const users = usersResponse.data || []

  return (
    <div className="text-center">
      <h1 className="text-4xl mb-8">Admin Page</h1>
      {/* --- Add Search functionality later */}
      {/* <SearchUser /> */}
      {users.map((user) => {
        const role = user.publicMetadata.role
        return (
          <Card key={user.id} className="mb-8 p-6 bg-white shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center text-center">
              <div className="flex items-center justify-center md:justify-center">
                <Image
                  src={user.imageUrl}
                  alt="Profile Picture"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</div>
              <div className="text-sm text-gray-500">
                {
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress
                }
              </div>
              {/* <div className="flex flex-col items-center md:items-start space-y-2"> */}
              <div className="text-sm font-semibold">
                {role === 'admin' || role === 'moderator' || role === 'client'
                  ? role.charAt(0).toUpperCase() + role.slice(1)
                  : 'No Role'}
              </div>
              {role !== 'admin' && (
                <MakeAdminButton
                  userId={user.id}
                  userName={user.firstName}
                  userRole={String(role)}
                />
              )}
              {/* </div> */}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
