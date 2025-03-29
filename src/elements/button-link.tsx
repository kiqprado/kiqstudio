import Link from "next/link"

import { ComponentProps, ReactNode } from "react"

interface IButtonLink extends ComponentProps<'link'> {
  children: ReactNode
}

export function ButtonLink({ children, ...props}: IButtonLink) {
  return (
    <Link 
    {...props}
    className='w-36 flex items-center justify-center gap-1.5 border rounded-md border-zinc-500/75 bg-zinc-600/35 hover:border-zinc-400/55 hover:bg-zinc-500/35  text-zinc-300  hover:text-zinc-200 px-6 py-0.5'
  >
    {children}
  </Link>
  )
}