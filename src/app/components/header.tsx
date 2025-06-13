'use client'

import { useState } from 'react'

import Link from 'next/link'
import { projects, contacts } from '../portfolio-data/data'

import { Button } from '../elements/button'
import { Logo } from '../elements/logo'

import { Menu, X } from 'lucide-react'


export function Header() {
  const [ menuOpening, seTMenuOpening ] = useState(false)

  function HandleOpeningMenu() {
    seTMenuOpening(prev => !prev)
  }

  return(
    <header className='w-full px-2.5 py-1.5 flex justify-between items-center'>
      <Logo
        isMobileRange={true}
      />
      <div className='w-full flex flex-col'>
        <Button
          onClick={HandleOpeningMenu}
          className='self-end'
        >
          <Menu/>
        </Button>
        <div className='h-0.5 bg-zinc-900'/>
      </div>

      {menuOpening && (
        <div className='h-screen w-full z-1 absolute inset-0 bg-zinc-950/50'>
          <div className='relativem flex bg-zinc-950'>
            <button
              onClick={HandleOpeningMenu}
              className='absolute top-2.5 right-2.5'
            >
              <X className='hover:scale-110 hover:text-red-500 transition-all duration-300 ease-in-out'/>
            </button>
            <div className='m-auto space-y-3 pt-7 pb-3 text-center'>
              <div className='relative'>
                <Link 
                  href={'#'} 
                  target='_blank'
                  className='text-lg tracking-widest font-bold hover:text-sky-500 transition-all duration-300 ease-in-out'
                >
                  [ The Work ]
                </Link>
                <span
                  className='absolute top-2.5 text-sm font-bold text-red-500'
                >
                  &#47;&#47;{`${projects.length}`.padStart(2, '0')}
                </span>
              </div>
              <div className='relative'>
                <Link 
                  href={'#'} 
                  target='_blank'
                  className='text-lg tracking-widest font-bold hover:text-sky-500 transition-all duration-300 ease-in-out'
                >
                  [ Behind the Pixels ]
                </Link>
                <span
                  className='absolute top-2.5 text-sm font-bold text-red-500'
                >
                  &#47;&#47;01
                </span>
              </div>
              <div className='relative'>
                <Link 
                  href={'#'} 
                  target='_blank'
                  className='text-lg tracking-widest font-bold hover:text-sky-500 transition-all duration-300 ease-in-out'
                >
                  [ Let´s talk ]
                </Link>
                <span
                  className='absolute top-2.5 text-sm font-bold text-red-500'
                >
                  &#47;&#47;{`${contacts.length}`.padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )

}