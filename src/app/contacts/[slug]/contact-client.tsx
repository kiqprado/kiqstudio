import Link from "next/link"

import { IContacts } from "@/portfolio/page"

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

interface IContactClient {
  prevContact: IContacts
  contact?: IContacts
  nextContact: IContacts
}

export default function ContactClient({ prevContact, contact, nextContact} : IContactClient) {

  if(!contact) {
    return (
      <div className='fixed inset-0 flex'>
        <div className='m-auto flex items-center justify-center'>
          <span>Sorry thats a truthy 404, you can`t contact me like this! :/</span>
        </div>
      </div>
    )
  }
  return (
    <div className='relative h-screen'>
      <div 
          className='fixed top-0 left-1/2 -translate-x-1/2 w-1/2 flex items-center justify-between z-2 gap-6 py-6'
        >
          <Link 
            href={`/contacts/${prevContact.slug}`}
            className='w-36 flex items-center justify-center gap-1.5 border rounded-md border-zinc-500/75 bg-zinc-600/35 hover:border-zinc-400/55 hover:bg-zinc-500/35  text-zinc-300  hover:text-zinc-200 px-6 py-0.5'
          >
            <ArrowBigLeft className='size-5'/>
            Previous
          </Link>

          <div className='relative flex-1 text-center border rounded-md border-zinc-600/75 bg-zinc-800/25'>
            <p className='font-medium text-lg'>{contact.title}</p>
            <div
              className='absolute top-0 left-0 w-full h-full bg-zinc-700/25 scale-x-0 origin-center-left -z-10'
            />
          </div>

          <Link 
            href={`/contacts/${nextContact.slug}`}
            className='w-36 flex items-center justify-center gap-1.5 border rounded-md border-zinc-500/75 bg-zinc-600/35  hover:border-zinc-400/55 hover:bg-zinc-500/35 text-zinc-300  hover:text-zinc-200 px-6 py-0.5'
          >
            <ArrowBigRight className='size-5'/>
            Next
          </Link>
      </div>
    </div>
  )
}