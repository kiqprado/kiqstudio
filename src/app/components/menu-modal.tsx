import { useState, useRef, useEffect } from 'react'

import Link from 'next/link'

import { projects, contacts } from '../portfolio-data/data'

import { useMediaRange } from '../utils/breakpoints-hook'

import { X } from 'lucide-react'

interface IMainMenuModal {
  HandleOpeningMenu: () => void
}

export function MainMenuModal({ HandleOpeningMenu }: IMainMenuModal) {
  const [ toggleProjectsSubMenuModal, setToggleProjectsSubMenuModal ] = useState(false)
  const [ toggleContactsSubMenuModal, setToggleContactsSubMenuModal ] = useState(false)

  const projectsSubMenuRef = useRef<HTMLDivElement>(null)

  //Query's
    const isMobileSM = useMediaRange('mobileSM')
    const isMobileMD = useMediaRange('mobileMD')
    const isMobileLG = useMediaRange('mobileLG')
    const isTabletMD = useMediaRange('tabletMD')
    const isTabletLG = useMediaRange('tabletLG')
    
    const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
    const tabletRangeFull = isTabletMD || isTabletLG

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
            <button
              onClick={HandleToggleProjectsSubMenuModal}
              className={`${mobileRangeFull || tabletRangeFull ? 'text-xl' : 'text-lg'} 
                tracking-widest font-bold hover:text-sky-500 transition-all duration-300 ease-in-out`}
            >
              [ The Work ]
            </button>
            <span
              className='absolute top-2.5 text-sm font-bold text-red-500'
            >
              &#47;&#47;{`${projects.length}`.padStart(2, '0')}
            </span>
            { toggleProjectsSubMenuModal && (
            <div className='flex flex-col gap-1.5 items-center justify-center'>
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className={`${mobileRangeFull || tabletRangeFull ? 'text-xl' : 'text-md'} 
                    hover:brightness-200 hover:tracking-wider transition-all duration-300 ease-in-out`}
                >
                  {project.title}
                </Link>
              ))}
            </div>
          )}
          </div>
          
          <div className='relative'>
            <button
              className={`${mobileRangeFull || tabletRangeFull ? 'text-xl' : 'text-lg'} 
                tracking-widest font-bold hover:text-sky-500 transition-all duration-300 ease-in-out`}
            >
              [ Behind the Pixels ]
            </button>
            <span
              className='absolute top-2.5 text-sm font-bold text-red-500'
            >
              &#47;&#47;01
            </span>
          </div>

          <div className='relative'>
            <button
              onClick={HandleToggleContactsSubMenuModal}
              className={`${mobileRangeFull || tabletRangeFull ? 'text-xl' : 'text-lg'} 
                tracking-widest font-bold hover:text-sky-500 transition-all duration-300 ease-in-out`}
            >
              [ Let´s talk ]
            </button>
            <span
              className='absolute top-2.5 text-sm font-bold text-red-500'
            >
              &#47;&#47;{`${contacts.length}`.padStart(2, '0')}
            </span>
            {toggleContactsSubMenuModal && (
              <div className='flex flex-col gap-1.5 items-center justify-center'>
                {contacts.map((contact) => (
                  <Link
                    key={contact.id}
                    href={`/contacts/${contact.slug}`}
                    className={`${mobileRangeFull || tabletRangeFull ? 'text-xl' : 'text-md'} 
                      hover:brightness-200 hover:tracking-wider transition-all duration-300 ease-in-out`}
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