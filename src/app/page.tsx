"use client"

import { useState, useEffect, useRef } from "react";

import gsap from 'gsap'

import Link from "next/link";

import { projects, contacts } from '@/portfolio/page'

import { Footer } from "@/components/footer";

import { ArrowLeftFromLine, ArrowRightToLine, CircleSmall } from 'lucide-react'

export default function Home() {
  const headerMenuOptions = useRef(null)
  const projectsMenuOptions = useRef(null)
  const contactsMenuOptions = useRef(null)

  const [ toggleHeaderMenuModal, setToggleHeaderMenuModal ] = useState(false)
  const [ toggleOptionsProjectMenu, setToggleOptionsProjectMenu ] = useState(false)
  const [ toggleOptionsContactMenu, setToggleOptionsContactMenu ] = useState(false)

  function HandleToggleHeaderMenuModal() {
    setToggleHeaderMenuModal((prev) => !prev)
  }

  function HandleToggleOptionsProjectMenu() {
    setToggleOptionsProjectMenu((prev) => !prev)
    setToggleOptionsContactMenu(false)
  }

  function HandleToggleOptionsContactMenu() {
    setToggleOptionsContactMenu((prev) => !prev)
    setToggleOptionsProjectMenu(false)
  }

  useEffect(() => {
    function setupInitialMenuStates() {
      gsap.set(headerMenuOptions.current, {
        x: '100%',
        opacity: 0
      })
      gsap.set(projectsMenuOptions.current, {
        y: '-200%',
        opacity: 0
      })
      gsap.set(contactsMenuOptions.current, {
        y: '-200%',
        opacity: 0
      })
    }

    function AnimateHeaderMenu() {
      if(!headerMenuOptions.current) return

      if(toggleHeaderMenuModal) {
        gsap.to(headerMenuOptions.current, {
          x: '0',
          opacity: 1,
          duration: 1.1,
          ease: 'power2.inOut'
        })
      } else {
        setToggleOptionsProjectMenu(false)
        setToggleOptionsContactMenu(false)

        gsap.to(headerMenuOptions.current, {
          x: '100%',
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut'
        })
      }
    }

    function AnimateProjectMenu() {
      if(!projectsMenuOptions.current || !toggleHeaderMenuModal) return

      if(toggleOptionsProjectMenu) {
        gsap.to(projectsMenuOptions.current, {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          ease: 'power2.inOut'
        })
      } else {
        gsap.to(projectsMenuOptions.current, {
          y: '-200%',
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut'
        })
      }
    }

    function AnimateContactMenu() {
      if(!contactsMenuOptions.current || !toggleHeaderMenuModal) return

      if(toggleOptionsContactMenu) {
        gsap.to(contactsMenuOptions.current, {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          ease: 'power2.inOut'
        })
      } else {
        gsap.to(contactsMenuOptions.current, {
          y: '-200%',
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut'
        })
      }
    }

    function cleanUpTrigger() {
      return () => {
        gsap.killTweensOf(headerMenuOptions.current)
        gsap.killTweensOf(projectsMenuOptions.current)
        gsap.killTweensOf(contactsMenuOptions.current)
      }
    }

    setupInitialMenuStates()
    AnimateHeaderMenu()
    AnimateProjectMenu()
    AnimateContactMenu()

    return cleanUpTrigger()
  }, [toggleHeaderMenuModal, toggleOptionsProjectMenu, toggleOptionsContactMenu])

  return (
    <div className='h-screen flex flex-col'>

      <header 
        className='flex items-center px-4 w-full h-12 border-b-1 border-zinc-700/70 justify-between relative overflow-x-clip'
      >
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
          ref={headerMenuOptions}
          className='absolute flex items-center h-12 ml-44  border-zinc-700/35'
        >
          <ul className='flex gap-4 items-center relative'> 
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
        <ul 
          ref={projectsMenuOptions}
          className='absolute top-12 left-46'
          style={{ opacity: 0, transform: 'translateY(-200%)'}}
        >
          {projects.map((project) => (
            <li
              key={project.id}
              className='w-66 hover:border hover:bg-zinc-900/50 border-zinc-500 hover:font-bold rounded-sm text-center'
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
        <ul 
          ref={contactsMenuOptions}
          className='absolute top-12 right-62'
          style={{ opacity: 0, transform: 'translateY(-200%)'}}
        >
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className='w-94 hover:border hover:bg-zinc-900/50 border-zinc-500 hover:font-bold rounded-sm text-center'
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
