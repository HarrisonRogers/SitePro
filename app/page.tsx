import Image from 'next/image'
import WhiteLogo from '@/app/assets/rbj-logo-white.png'
import BlackLogo from '@/app/assets/rbj_logo-black.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen flex flex-col justify-center items-center">
        <Image
          src={BlackLogo}
          alt="RBJ Logo"
          className="block mb-4"
          width={400}
        />
        <div className="text-center border-t-2 pt-4">
          <h1 className="capitalize text-4xl lg:text-5xl font-bold">
            Asset Management
          </h1>
          <p className="mt-4 mx-auto max-w-4xl">
            efficiently manage your property assets. easily request maintenance
            services for your properties, ensuring timely and effective upkeep.
            Additionally, detailed information about subcontractors who
            installed various assets, particularly when the work was not
            performed by the main building company, RBJ. readily available,
            facilitating seamless coordination and communication for property
            maintenance and management.
          </p>
          <Button asChild className="mt-4">
            <Link href={'/sites'}>Get Started</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
