import Link from 'next/link'

import { IContacts } from '@/app/portfolio-data/data'


import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

interface IContactClientModel {
  prevProject: IContacts
  project?: IContacts
  nextProject: IContacts
}

export function ContactClientModel({ prevContact, contact, nextContact}: IContactClientModel) {

  if(!contact) {
    return (
      <div className='fixed inset-0 bg-zinc-950/50 flex'>
        <div className='m-auto px-6 py-3 flex items-center justify-center'>
          <span className='font-medium text-xl'>Contact unavailable</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link href={`/projects/${prevContact.slug}`}><ArrowBigLeft/> Prev</Link>
      <span>{contact.slug}</span>
      <Link href={`/projects/${nextContact.slug}`}>Next <ArrowBigRight/></Link>
    </div>
  )
}