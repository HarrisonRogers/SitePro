import { redirect } from 'next/navigation'
import { clerkClient } from '@clerk/nextjs/server'
import SearchUser from '@/components/SearchUser'
import { setRole } from './_actions'
import checkRole from './_check-role'
import Image from 'next/image'

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const isAdmin = await checkRole('admin')

  if (!isAdmin) {
    redirect('/sites')
  }

  const query = searchParams?.search
  const usersResponse = await clerkClient.users.getUserList()
  const users = usersResponse.data || []

  console.log(users)

  return (
    <div className="text-center">
      <h1 className="text-4xl">Admin Page</h1>
      <SearchUser />
      {users.map((user) => (
        <div key={user.id}>
          <Image
            src={user.imageUrl}
            alt="Profile Picture"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>{`${user.firstName} ${user.lastName}`}</div>
          <div>
            {
              user.emailAddresses.find(
                (email) => email.id === user.primaryEmailAddressId
              )?.emailAddress
            }
          </div>
          <div>
            {user.publicMetadata.role !== 'admin'
              ? 'Not admin'
              : (user.publicMetadata.role as string)}
          </div>
          <form action={setRole}>
            <input type="hidden" value={user.id} name="id" />
            <input type="hidden" value="admin" name="role" />
            <button type="submit">Make Admin</button>
          </form>
          <form action={setRole}>
            <input type="hidden" value={user.id} name="id" />
            <input type="hidden" value="moderator" name="role" />
            <button type="submit">Make Moderator</button>
          </form>
        </div>
      ))}
    </div>
  )
}
