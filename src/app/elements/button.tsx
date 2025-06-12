import { ComponentProps, ReactNode } from 'react'

interface Ibutton extends ComponentProps<'button'> {
  children: ReactNode
}

export function Button({ children, ...props }: Ibutton) {
  return(
    <button
      {...props}
    >
      {children}
    </button>
  )
}