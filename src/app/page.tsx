"use client"

import { useState } from "react";

import Link from "next/link";

import { projects, contacts } from '@/portfolio/page'

import { Footer } from "@/components/footer";

import { ArrowLeftFromLine, ArrowRightToLine, CircleSmall } from 'lucide-react'

export default function Home() {
  const [ toggleHeaderMenuModal, setToggleHeaderMenuModal ] = useState(false)
  const [ toggleOptionsProjectMenu, setToggleOptionsProjectMenu ] = useState(false)
  const [ toggleOptionsContactMenu, setToggleOptionsContactMenu ] = useState(false)

  function HandleToggleHeaderMenuModal() {
    setToggleHeaderMenuModal((prev) => !prev)
  }

  function HandleToggleOptionsProjectMenu() {
    setToggleOptionsProjectMenu((prev) => !prev)
  }

  function HandleToggleOptionsContactMenu() {
    setToggleOptionsContactMenu((prev) => !prev)  
  }

  return (
    <div className='h-screen flex flex-col'>

      <header className='flex items-center px-4 w-full h-12 border-b-1 border-zinc-700/70 justify-between relative'>
        <h1 className='text-2xl'>KIQ STUDIO</h1>

        <button
          onClick={HandleToggleHeaderMenuModal}
          className='leading-0 border-1 rounded-md px-2 py-1 text-zinc-400 hover:text-zinc-200'
        >
          { toggleHeaderMenuModal === false ? (
            <ArrowLeftFromLine className='size-6'/>
          ) : (
            <ArrowRightToLine className='size-6'/>
          )}
          
        </button>

      
      { toggleHeaderMenuModal && (
        <div 
          className='absolute flex items-center h-12 ml-44  border-zinc-700/35'
        >
          <ul className='flex gap-6 items-center relative'> 
            <button
              onClick={HandleToggleOptionsProjectMenu}
              className='flex items-center gap-1.5 cursor-pointer text-zinc-200 hover:text-zinc-50'
            >
              <CircleSmall className='size-3'/>
              The Work (No Fluff, Just Vibes)
            </button>
            <button
              className='flex items-center gap-1.5 cursor-pointer text-zinc-200 hover:text-zinc-50'
            >
              <CircleSmall className='size-3'/>
              The Human Behind the Pixels
            </button>
            <button
              onClick={HandleToggleOptionsContactMenu}
              className='flex items-center gap-1.5 cursor-pointer text-zinc-200 hover:text-zinc-50'
            >
              <CircleSmall className='size-3'/>
              Let’s Pretend We’re Formal (But Really, Let’s Talk)
            </button>
            <li className='flex items-center gap-1.5 cursor-pointer text-zinc-200 hover:text-zinc-50'>
              <CircleSmall className='size-3'/>
              <Link href='/admin'>Insert new Project</Link>
            </li>
          </ul>
      </div>
      )}

      { toggleOptionsProjectMenu && (
        <ul className='absolute top-12 left-74'>
          {projects.map((project) => (
            <li
              key={project.id}
            >
              <Link
                href={`/projects/${project.slug}`}
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      { toggleOptionsContactMenu && (
        <ul className='absolute top-12 right-96'>
          {contacts.map((contact) => (
            <li
              key={contact.id}
            >
              <Link 
                href={`/contacts/${contact.slug}`}
              >
                {contact.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      </header>


      <div className='flex-1 overflow-y-auto'>

      </div>

      <Footer/>
    </div>
  )
}
