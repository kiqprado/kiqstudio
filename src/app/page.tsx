"use client"

import { useState } from "react";

import Link from "next/link";


import { ArrowBigRightDash, Menu, X } from 'lucide-react'

export default function Home() {
  const [ toggleMenuModal, setToggleMenuModal ] = useState(false)

  function HandleToggleMenuModal() {
    setToggleMenuModal((prev) => !prev)
  }

  return (
    <div className='h-screen flex relative'>
      <button
        onClick={HandleToggleMenuModal}
        className='absolute top-2 left-2 border px-1.5 rounded-md text-zinc-300/90 hover:text-zinc-200'
      >
        <Menu/>
      </button>

      { toggleMenuModal && (
        <div 
          className='m-auto w-88 h-96 flex items-center justify-center gap-1.5 border rounded-sm border-zinc-700/35 relative'
        >
          <button
            onClick={HandleToggleMenuModal}
            className='absolute top-2 right-2 text-zinc-500 hover:text-zinc-300'
          >
            <X/>
          </button>

          <ul className='flex flex-col justify-center space-y-3'>
            <li className='flex items-center gap-1.5'>
            <ArrowBigRightDash/>
            <Link href='/projects'>The Work (No Fluff, Just Vibes)</Link>
            </li>
            <li className='flex items-center gap-1.5'>
            <ArrowBigRightDash/>
            <Link href='/about'>The Human Behind the Pixels</Link>
            </li>
            <li className='flex items-center gap-1.5'>
            <ArrowBigRightDash/>
            <Link href='/contacts'>Let’s Pretend We’re Formal (But Really, Let’s Talk)</Link>
            </li>
            <li className='flex items-center gap-1.5'>
            <ArrowBigRightDash/>
            <Link href='/admin'>Insert new Project</Link>
            </li>
          </ul>
      </div>
      )}
    </div>
  );
}
