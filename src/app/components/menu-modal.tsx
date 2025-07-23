import { useState, useRef, useEffect } from 'react'

import { projects, contacts } from '../portfolio-data/data'
import { useMediaRange } from '../utils/breakpoints-hook'

import { SubMenuModal } from '@/app/components/sub-menu-modal'

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
    <div className={`absolute z-1 w-full h-screen inset-0 bg-zinc-950/70`}>
      <div className={`relative flex ${mobileRangeFull || tabletRangeFull ? 'bg-zinc-950' : 'bg-transparent'} `}>
        <button
          onClick={HandleOpeningMenu}
          className='absolute top-2.5 right-2.5 cursor-pointer hover:scale-110 transform transition-all duration-300 ease-in-out bg-zinc-950'
        >
          <X className='hover:text-red-500 '/>
        </button>
        <div className={`${mobileRangeFull || tabletRangeFull ? 'm-auto space-y-3 pt-7 pb-3' : 'flex justify-center gap-15 mt-3.5'} w-full text-center`}>
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
              <SubMenuModal
                items={projects}
                basePath='projects'
                isMobile={mobileRangeFull || tabletRangeFull}
              />
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
              <SubMenuModal
                items={contacts}
                basePath='contacts'
                isMobile={mobileRangeFull || tabletRangeFull}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}