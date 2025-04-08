"use client"

import { useState, useEffect, useRef } from "react";

import gsap from 'gsap'

import Link from "next/link";
import Image from "next/image";
import logo from '../../public/logo-menu.svg'
import logo_hover from '../../public/logo-menu-hover.svg'

import { projects, contacts } from '@/portfolio/page'

import { AnimatedUnderLine } from '@/app/animations/animated-under-line'
import { AnimatedGraphicsLines } from "./animations/animated-graphics-lines";

import { Footer } from "@/components/footer";

import { ArrowLeftFromLine, ArrowRightToLine } from 'lucide-react'

enum MenuItems {
  WORK = 'work',
  Human = 'human',
  Contact = 'contact'
}

export default function Home() {
  const [ isLogoImgOnHover, setIsLogoImgOnHover ] = useState(false)

  const headerMenuOptions = useRef(null)
  const projectsMenuOptions = useRef(null)
  const contactsMenuOptions = useRef(null)

  const [ toggleHeaderMenuModal, setToggleHeaderMenuModal ] = useState(false)
  const [ toggleOptionsProjectMenu, setToggleOptionsProjectMenu ] = useState(false)
  const [ toggleOptionsContactMenu, setToggleOptionsContactMenu ] = useState(false)

  const [ isMouseOnHoverMenuOption, setIsMouseOnHoverMenuOption ] = useState<MenuItems | null>(null)

  function HandleHoverLogoImg() {
    setIsLogoImgOnHover((prev) => !prev)
  }

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
        className='flex items-center justify-between  overflow-x-clip relative px-6 w-full h-16 border-b-1 border-zinc-700/70'
      >
        <div
          onMouseEnter={HandleHoverLogoImg}
          onMouseLeave={HandleHoverLogoImg}
          className='cursor-pointer'
        >
          {isLogoImgOnHover ? (
            <Image
            src={logo_hover}
            alt={`image of ${logo_hover}`}
            height={132}
            width={222}
          />
          ):(
            <Image
              src={logo}
              alt={`Image of ${logo}`}
              height={132}
              width={222}
            />
          )} 
        </div>
        
        <button
          onClick={HandleToggleHeaderMenuModal}
          className="relative right-4 px-6 text-zinc-400 hover:text-zinc-200 overflow-hidden group"
        >
          <span className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,_theme(colors.zinc.950)_13%,_theme(colors.zinc.800)_30%,_theme(colors.zinc.500)_55%,_theme(colors.zinc.800)_75%,_theme(colors.zinc.950)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none" />
          { toggleHeaderMenuModal === false ? (
            <ArrowLeftFromLine className='size-6'/>
          ) : (
            <ArrowRightToLine className='size-6'/>
          )}
        </button>

      
      { toggleHeaderMenuModal && (
        <div 
          ref={headerMenuOptions}
          className='absolute z-10 ml-68 flex items-center  border-zinc-700/35'
        >
          <ul className='w-full flex gap-8 items-center'> 
            <button
              onClick={HandleToggleOptionsProjectMenu}
              onMouseEnter={() => setIsMouseOnHoverMenuOption(MenuItems.WORK)}
              onMouseLeave={() => setIsMouseOnHoverMenuOption(null)}
              className='flex items-center cursor-pointer text-zinc-200 hover:text-zinc-50 relative'
            >
              <span className='text-lg'>The Work (No Fluff, Just Vibes)</span>
              <AnimatedUnderLine
                active={isMouseOnHoverMenuOption === MenuItems.WORK}
              />
            </button>

            <button
              onMouseEnter={() => setIsMouseOnHoverMenuOption(MenuItems.Human)}
              onMouseLeave={() => setIsMouseOnHoverMenuOption(null)}
              className='flex items-center cursor-pointer text-zinc-200 hover:text-zinc-50 relative'
            >
              <span className='text-lg'>The Human Behind the Pixels</span>
              <AnimatedUnderLine
                active={isMouseOnHoverMenuOption === MenuItems.Human}
              />
            </button>

            <button
              onClick={HandleToggleOptionsContactMenu}
              onMouseEnter={() => setIsMouseOnHoverMenuOption(MenuItems.Contact)}
              onMouseLeave={() => setIsMouseOnHoverMenuOption(null)}
              className='flex items-center cursor-pointer text-zinc-200 hover:text-zinc-50 relative'
            > 
              <span className='text-lg'>Let’s Pretend We’re Formal (Really, Let’s Talk)</span>
            
              <AnimatedUnderLine
                active={isMouseOnHoverMenuOption === MenuItems.Contact}
              />
            </button>
          </ul>
      </div>
      )}

      { toggleOptionsProjectMenu && (
        <ul 
          ref={projectsMenuOptions}
          className='absolute top-16 left-72 z-20'
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
          className='absolute top-16 right-30 z-20'
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


      <div className='flex-1 overflow-y-auto px-6'>

      <AnimatedGraphicsLines/>
        
      </div>  

      <Footer/>
    </div>
  )
}