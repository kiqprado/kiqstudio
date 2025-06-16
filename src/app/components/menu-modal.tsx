import { useState, useRef, useEffect } from 'react'

import Link from 'next/link'

import { projects, contacts } from '../portfolio-data/data'

import { Button } from '../elements/button'

import { X } from 'lucide-react'

interface IMainMenuModal {
  HandleOpeningMenu: () => void
}

export function MainMenuModal({ HandleOpeningMenu }: IMainMenuModal) {
  const [ toggleProjectsSubMenuModal, setToggleProjectsSubMenuModal ] = useState(false)
  const [ toggleContactsSubMenuModal, setToggleContactsSubMenuModal ] = useState(false)

  const projectsSubMenuRef = useRef<HTMLDivElement>(null)

  function HandleToggleProjectsSubMenuModal() {
    setToggleProjectsSubMenuModal(prev => !prev)
  }

  function HandleToggleContactsSubMenuModal() {
    setToggleContactsSubMenuModal(prev => !prev)
  }

  //SUB MENU OPENING ANIMATION
  useEffect(() => {
    if(!toggleProjectsSubMenuModal && projectsSubMenuRef.current) {
      projectsSubMenuRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [ toggleProjectsSubMenuModal])

  return(
    <div className='h-screen w-full z-1 absolute inset-0 bg-zinc-950/50'>
      <div className='relative flex bg-zinc-950'>
        <button
          onClick={HandleOpeningMenu}
          className='absolute top-2.5 right-2.5'
        >
          <X className='hover:scale-110 hover:text-red-500 transition-all duration-300 ease-in-out'/>
        </button>
        <div className='m-auto w-full space-y-3 pt-7 pb-3 text-center'>
          <div 
            ref={projectsSubMenuRef}
            className='relative'
          >
            <Button
              onClick={HandleToggleProjectsSubMenuModal}
              className='text-lg tracking-widest font-bold hover:text-sky-500 transition-all duration-300 ease-in-out'
            >
              [ The Work ]
            </Button>
            <span
              className='absolute top-2.5 text-sm font-bold text-red-500'
            >
              &#47;&#47;{`${projects.length}`.padStart(2, '0')}
            </span>
            { toggleProjectsSubMenuModal && (
            <div className='flex flex-col gap-1.5 items-center justify-center'>
              {projects.map((project, index) => (
                <Link
                  key={index}
                  href={'#'}
                >
                  {project.title}
                </Link>
              ))}
            </div>
          )}
          </div>
          
          <div className='relative'>
            <Button
              className='text-lg tracking-widest font-bold hover:text-sky-500 transition-all duration-300 ease-in-out'
            >
              [ Behind the Pixels ]
            </Button>
            <span
              className='absolute top-2.5 text-sm font-bold text-red-500'
            >
              &#47;&#47;01
            </span>
          </div>

          <div className='relative'>
            <Button
              onClick={HandleToggleContactsSubMenuModal}
              className='text-lg tracking-widest font-bold hover:text-sky-500 transition-all duration-300 ease-in-out'
            >
              [ Let´s talk ]
            </Button>
            <span
              className='absolute top-2.5 text-sm font-bold text-red-500'
            >
              &#47;&#47;{`${contacts.length}`.padStart(2, '0')}
            </span>
            {toggleContactsSubMenuModal && (
              <div className='flex flex-col gap-1.5 items-center justify-center'>
                {contacts.map((contact, index) => (
                  <Link
                    key={index}
                    href={'#'}
                  >
                    {contact.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}