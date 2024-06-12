import Image from 'next/image'
import WhiteLogo from '@/app/assets/rbj-logo-white.png'
import BlackLogo from '@/app/assets/rbj_logo-black.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            Site<span className="text-secondary">Pro</span>
          </h1>
          <p className="mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            fugiat enim ad unde voluptatem expedita perspiciatis officia in,
            porro velit dignissimos at sunt nostrum sint reiciendis fugit qui
            magni natus sit? Assumenda quo nemo vero obcaecati quos incidunt
            corporis iure?
          </p>
          <Button asChild className="mt-4" color="white">
            <Link href={'/sites'}>Get Started</Link>
          </Button>
        </div>
        <Image src={BlackLogo} alt="RBJ Logo" className="hidden lg:block" />
      </section>
    </main>
  )
}
