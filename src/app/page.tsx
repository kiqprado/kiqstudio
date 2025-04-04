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
    function SetUpInitialMenuStates() {
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

      const animation  = toggleHeaderMenuModal ? 
        gsap.to(headerMenuOptions.current, {
          x: '0%',
          opacity: 1,
          duration: 1.1,
          ease: 'power2.inOut'
        })
      : 
        gsap.to(headerMenuOptions.current, {
          x: '100%',
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete: () => {
            setToggleOptionsProjectMenu(false)
            setToggleOptionsContactMenu(false)
          }
        })

      return () => animation.kill()
    }

    SetUpInitialMenuStates()
    const headerCleanUp = AnimateHeaderMenu()

    return () => {
      headerCleanUp?.()
      gsap.killTweensOf(headerMenuOptions.current)
    }

  }, [toggleHeaderMenuModal])

  useEffect(() => {
    function AnimateProjectMenu() {
      if(!projectsMenuOptions || !toggleHeaderMenuModal) return

      const animation = toggleOptionsProjectMenu ? (
        gsap.to(projectsMenuOptions.current, {
          y: '0',
          opacity: 1,
          duration: 1.1,
          ease: 'power2.inOut'
        })
      ) : (
        gsap.to(projectsMenuOptions.current, {
          y: '-200%',
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut'
        })
      )

      return () => animation.kill()
    }

    function AnimateContactMenu() {
      if(!contactsMenuOptions || !toggleHeaderMenuModal)  return

      const animation = toggleOptionsContactMenu ? 
        gsap.to(contactsMenuOptions.current, {
          y: '0',
          opacity: 1,
          duration: 1.1,
          ease: 'power2.inOut'
        })
      : 
        gsap.to(contactsMenuOptions.current, {
          y: '-200%',
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut'
        })

      return () => animation.kill()
    }

    const projectCleanUp = AnimateProjectMenu()
    const contactCleanUp = AnimateContactMenu()

    return () => {
      projectCleanUp?.()
      contactCleanUp?.()
      gsap.killTweensOf(projectsMenuOptions.current)
      gsap.killTweensOf(contactsMenuOptions.current)
    }

  }, [toggleHeaderMenuModal, toggleOptionsProjectMenu, toggleOptionsContactMenu])

  return (
    <div className='h-screen flex flex-col'>

      <header 
        className='flex items-center justify-between  overflow-x-clip relative px-4 w-full h-12 border-b-1 border-zinc-700/70'
      >
        <h1 className='text-2xl'>KIQ STUDIO</h1>

        
          
        <button
          onClick={HandleToggleHeaderMenuModal}
          className="relative right-4 px-16 text-zinc-400 hover:text-zinc-200 overflow-hidden group"
        >
          <span className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,_theme(colors.zinc.950)_13%,_theme(colors.zinc.700)_30%,_theme(colors.zinc.500)_55%,_theme(colors.zinc.800)_75%,_theme(colors.zinc.950)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none" />
          { toggleHeaderMenuModal === false ? (
            <ArrowLeftFromLine className='size-6'/>
          ) : (
            <ArrowRightToLine className='size-6'/>
          )}
        </button>

      
      { toggleHeaderMenuModal && (
        <div 
          ref={headerMenuOptions}
          className='absolute ml-52 flex items-center  border-zinc-700/35'
        >
          <ul className='w-full flex gap-4 items-center'> 
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