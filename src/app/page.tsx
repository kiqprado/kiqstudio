"use client"

import { useState, useEffect, useRef } from 'react'

import gsap from 'gsap'

import Link from 'next/link'

import { projects, contacts } from '@/portfolio/page'

import { AnimatedUnderLine } from '@/app/animations/animated-under-line'
import { AnimatedGraphicsLines } from '@/app/animations/animated-graphics-lines'

import { Logo } from '@/elements/logo'

import { Footer } from '@/components/footer'
import { LocationTimeDisplay } from '@/components/location-and-time-display'

import { X } from 'lucide-react'

enum MenuItems {
  WORK = 'work',
  Human = 'human',
  Contact = 'contact'
}

export default function Home() {
  const headerMenuOptions = useRef(null)
  const projectsMenuOptions = useRef(null)
  const contactsMenuOptions = useRef(null)

  const [ toggleHeaderMenuModal, setToggleHeaderMenuModal ] = useState(false)
  const [ toggleOptionsProjectMenu, setToggleOptionsProjectMenu ] = useState(false)
  const [ toggleOptionsContactMenu, setToggleOptionsContactMenu ] = useState(false)

  const [ isMouseOnHoverMenuOption, setIsMouseOnHoverMenuOption ] = useState<MenuItems | null>(null)

 
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
        y: '-100%',
        opacity: 0
      })
      gsap.set(contactsMenuOptions.current, {
        y: '-100%',
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
      if(!projectsMenuOptions || !toggleHeaderMenuModal) return;

      const animation = gsap.timeline({ 
        defaults: { 
          duration: 0.5, 
          ease: 'power2.inOut' 
        } 
      })

      if (toggleHeaderMenuModal) {
        animation.to(projectsMenuOptions.current, { 
          opacity: 1, 
          y: '0' 
        })
        projectsMenuOptions.current?.querySelectorAll('li').forEach((item: string, index: number) => {
          animation.from(item, { 
            opacity: 0, 
            y: '-50%', 
            delay: index * 0.3 
          })
        })
      } else {
        animation.to(projectsMenuOptions.current, { 
          opacity: 0, 
          y: '-100%' 
        });
      }

      return () => animation.kill();
    }

    function AnimateContactMenu() {
      if(!contactsMenuOptions || !toggleHeaderMenuModal) return

      const animation = gsap.timeline({ 
        defaults: {
          duration: 0.5, 
          ease: 'power2.inOut'   
        }
      })

      if(toggleHeaderMenuModal) {
        animation.to(contactsMenuOptions.current, {
          opacity: 1,
          y: '0%'
        })
        contactsMenuOptions.current?.querySelectorAll('li').forEach((item: string, index: number) => {
          animation.from(item, {
            opacity: 0,
            y: '-50%',
            delay: index * 0.3
          })
        })
      } else {
        animation.to(contactsMenuOptions.current, {
          opacity: 0,
          y: '-100%'
        })
      }

      return() => animation.kill()
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
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <AnimatedGraphicsLines/>
      </div>

      <header 
        className='flex items-center justify-between  overflow-x-clip relative px-6 w-full h-18'
      >
        <Logo/>

        <div className='border-b-1 pl-24 h-8 w-full border-zinc-700 '/>

        <button
          onClick={HandleToggleHeaderMenuModal}
          className="absolute z-30 right-4 px-6 text-zinc-400 hover:text-zinc-200 overflow-hidden group"
        >
          <span className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,_theme(colors.zinc.950)_13%,_theme(colors.zinc.900)_30%,_theme(colors.zinc.800)_55%,_theme(colors.zinc.900)_75%,_theme(colors.zinc.950)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none" />
          { toggleHeaderMenuModal ? (
            <div className="flex items-center gap-1 font-bold text-lg cursor-pointer">
              <X/>
              <span>Close</span>
            </div>
          ): (
            <span className="font-bold text-lg cursor-pointer">... Options</span>
          )}
        </button>

      { toggleHeaderMenuModal && (
        <ul ref={headerMenuOptions} className='absolute w-[66%] flex items-center justify-between px-26 ml-66'> 
          <button
            onClick={HandleToggleOptionsProjectMenu}
            onMouseEnter={() => setIsMouseOnHoverMenuOption(MenuItems.WORK)}
            onMouseLeave={() => setIsMouseOnHoverMenuOption(null)}
            className='flex items-center cursor-pointer text-zinc-200 hover:text-zinc-50 relative'
          >
            <span className='text-lg'>[ The Work ]</span>
            <AnimatedUnderLine
              active={isMouseOnHoverMenuOption === MenuItems.WORK}
            />
          </button>

          <button
            onMouseEnter={() => setIsMouseOnHoverMenuOption(MenuItems.Human)}
            onMouseLeave={() => setIsMouseOnHoverMenuOption(null)}
            className='flex items-center cursor-pointer text-zinc-200 hover:text-zinc-50 relative'
          >
            <span className='text-lg'>[ Behind the Pixels ]</span>
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
            <span className='text-lg'>[ Let’s Talk ]</span>
            <AnimatedUnderLine
              active={isMouseOnHoverMenuOption === MenuItems.Contact}
            />
          </button>
        </ul>
      )}

      { toggleOptionsProjectMenu && (
        <ul 
          ref={projectsMenuOptions}
          className='absolute top-14 left-78 z-30'
          style={{ opacity: 0, transform: 'translateY(-200%)'}}
        >
          {projects.map((project) => (
            <li
              key={project.id}
              className='w-66 hover:font-bold rounded-sm text-center'
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
          className='absolute top-14 right-48 z-30'
          style={{ opacity: 0, transform: 'translateY(-200%)'}}
        >
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className='w-66 hover:font-bold rounded-sm text-center'
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


      <div className='flex-1 overflow-y-auto px-8'>
        
        <LocationTimeDisplay/>
      
      </div>  

      <Footer/>
    </div>
  )
}