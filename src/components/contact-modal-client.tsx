import ContactFormClient from "./contact-form-client"

import { X } from 'lucide-react'

interface IContactModalClient {
  HandleToggleEmailToSendModal: () => void
}

export function ContactModalClient({ HandleToggleEmailToSendModal }:IContactModalClient ) {
  return (
    <div className='fixed h-screen w-full flex bg-zinc-950/50'>
      <div 
        className='m-auto relative flex flex-col gap-2 justify-center w-102 py-3 px-4 rounded-md border border-zinc-700/35 bg-zinc-900'
      >
        <div
          className='h-1 rounded-2xl bg-zinc-700 mr-5 mt-1.5'
        />
          
        <button
          onClick={HandleToggleEmailToSendModal}
          className='absolute top-2 right-2 text-zinc-300 hover:text-zinc-100'
        >
          <X/>
        </button> 
            
        <ContactFormClient/>
            
      </div>
    </div>
  )
}