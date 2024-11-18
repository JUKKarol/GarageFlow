import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Wrench } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="shadow-md shadow-zinc-900 bg-zinc-950 fixed w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Wrench className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-100">GarageFlow</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/workshops" className="border-transparent text-gray-200 hover:border-zinc-500 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Workshops
              </Link>
              <Link href="/schedule" className="border-transparent text-gray-200 hover:hover:border-zinc-500 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Schedule
              </Link>
              <Link href="/about" className="border-transparent text-gray-200 hover:hover:border-zinc-500 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="outline" className="mr-2 bg-zinc-950 text-white hover:text-white hover:bg-zinc-900">Sign up</Button>
            <Link href="/login">
                <Button className="bg-gray-100 text-black hover:bg-gray-300">Log in</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}