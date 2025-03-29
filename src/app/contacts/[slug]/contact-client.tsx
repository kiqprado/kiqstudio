"use client"

import { useState } from 'react'

import Link from "next/link"

import { IContacts } from "@/portfolio/page"

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

import PageNotFound from '@/error/not-found'

import { ButtonLink } from '@/elements/button-link'
import { NavBarSectionTitle } from '@/elements/nav-bar-section-title'

import { ContactModalClient } from '@/components/contact-modal-client'


interface IContactClient {
  prevContact: IContacts
  contact?: IContacts
  nextContact: IContacts
}

export default function ContactClient({ prevContact, contact, nextContact} : IContactClient) {
  const [ toggleEmailToSendModal, setToggleEmailToSendModal ] = useState(false)

  function HandleToggleEmailToSendModal() {
    setToggleEmailToSendModal((prev) => !prev)
  }

  if(!contact) {
    return (
      <PageNotFound>
        {'Sorry thats a truthy 404, you can`t contact me like this! :/'}
      </PageNotFound>
    )
  }
  return (
    <div className='relative h-screen flex'>
      <div 
        className='fixed top-0 left-1/2 -translate-x-1/2 w-1/2 flex items-center justify-between z-2 gap-6 py-6'
      >
        <ButtonLink
          href={`/contacts/${prevContact.slug}`}
        >
          <ArrowBigLeft className='size-5'/>
          Previous
        </ButtonLink>

        <NavBarSectionTitle>
          {contact.title}
        </NavBarSectionTitle>

        <ButtonLink 
          href={`/contacts/${nextContact.slug}`}
        >
          <ArrowBigRight className='size-5'/>
          Next
        </ButtonLink>
      </div>

      <div className='m-auto flex flex-col items-center justify-center'>
        <h3 className='tracking-wider font-bold text-3xl'>{contact.subtitle}</h3>

        <p className='w-222 text-justify'>{contact.description}</p>
     
        <div className='flex'>
          <ul>
            {contact.role.map((role, index) => (
              <li 
                key={index}
              >
                {role}
              </li>
            ))}
          </ul>
          <ul>
            {contact.url.map((url, index) => (
              <li key={index}>
                {url === 'Send me a message' ? (
                  <button
                    onClick={HandleToggleEmailToSendModal}
                    className='cursor-pointer'
                  >
                    Send me a message
                  </button>
                ) : (
                  <Link
                    href={url}
                    target='_blank'
                  >
                    {url}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      { toggleEmailToSendModal && (
        <ContactModalClient
          HandleToggleEmailToSendModal={HandleToggleEmailToSendModal}
        />
      )}
    </div>
  )
}