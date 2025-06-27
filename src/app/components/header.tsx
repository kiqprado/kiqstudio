'use client'

import { useState } from 'react'

import { MainMenuModal } from './menu-modal'

import { ButtonIcon } from '../elements/button-icon'
import { Logo } from '../elements/logo'

import { Menu } from 'lucide-react'


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
        <ButtonIcon
          onClick={HandleOpeningMenu}
          align='end'
        >
          <Menu/>
        </ButtonIcon>
        <div className='h-0.5 bg-zinc-900'/>
      </div>

      {menuOpening && (
        <MainMenuModal
          HandleOpeningMenu={HandleOpeningMenu}
        />
      )}
    </header>
  )
  
}