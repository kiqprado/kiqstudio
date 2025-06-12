'use client'

import { useState } from 'react'

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
          {menuOpening ? <Menu/> : <X/>}
        </Button>

        <div className='h-0.5 bg-zinc-900'/>
      </div>
    </header>
  )

}