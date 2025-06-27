import { ReactNode } from 'react'

import Link from 'next/link'

interface IPageNotFound {
  children: ReactNode
}

export function PageNotFound({ children }: IPageNotFound) {
  return (
    <div className='fixed inset-0 flex bg-neutral-950/70'>
      <div className='m-auto flex flex-col items-center gap-3'>
        <h3 className='font-bold tracking-wider'>
          {children}
        </h3>
        <Link
          href={'/'}
          className='text-center font-bold tracking-wider'
        >
          Home
        </Link>
      </div>
    </div>
  )
}