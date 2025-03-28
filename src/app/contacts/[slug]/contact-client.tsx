"use client"

import { useState } from 'react'

import Link from "next/link"

import { IContacts } from "@/portfolio/page"

import { ArrowBigLeft, ArrowBigRight, X } from 'lucide-react'

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
      <div className='fixed inset-0 flex'>
        <div className='m-auto flex items-center justify-center'>
          <span>Sorry thats a truthy 404, you can`t contact me like this! :/</span>
        </div>
      </div>
    )
  }
  return (
    <div className='relative h-screen flex'>
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
        <div className='fixed h-screen w-full flex bg-zinc-950/50'>
          <div className='m-auto w-102 py-3 pl-6 pr-3 rounded-md border border-zinc-700/35 bg-zinc-900'>
            <div className='flex items-center gap-3'>
              <div
                className='h-1 rounded-2xl w-full bg-zinc-700'
              />
              <button
                onClick={HandleToggleEmailToSendModal}
              >
                <X/>
              </button>
            </div>
            
            <form 
              action=""
              className='space-y-2'
            >
              <h4 
                className='ml-0.5 text-lg mt-1.5 tracking-wider'
              >
                Hey good to see you, let´s talk...
              </h4>

              <div className='flex flex-col gap-0.5'>
                <span className='ml-1.5'>Subject:</span>
                <input 
                  type="text"
                  placeholder='Tell me about it'
                  className='border rounded-md border-zinc-700/35 bg-zinc-950/50 px-3 py-0.5' 
                  required/>
              </div>

              <div className='flex flex-col gap-0.5'>
                <span className='ml-1.5'>Email:</span>
                <input 
                  type="email"
                  placeholder='ex: john@acme.com'
                  className='border rounded-md border-zinc-700/35 bg-zinc-950/50 px-3 py-0.5' 
                  required/>
              </div>

              <div className='flex flex-col gap-0.5'>
                <span className='ml-1.5'>Message:</span>
                <textarea  
                  required
                  placeholder='Type your message right here!'
                  rows={8}
                  className='border rounded-md border-zinc-700/35 bg-zinc-950/50 px-3 py-0.5'
                />
              </div>
            </form>
            
          </div>
        </div>
      )}
    </div>
  )
}