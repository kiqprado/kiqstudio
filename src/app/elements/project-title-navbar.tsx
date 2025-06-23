import { ReactNode, RefObject } from 'react'

interface IProjectTitleNavBar {
  children: ReactNode
  ref?: RefObject<HTMLDivElement> | null
}

export function ProjectTitleNavBarSection({children, ref}: IProjectTitleNavBar) {
  return(
    <div className='relative flex-1 text-center border rounded-md border-zinc-600/75 bg-zinc-800/25'>
      <p className='font-medium text-lg'>{children}</p>
      <div
        ref={ref}
        className='absolute top-0 left-0 w-full h-full bg-zinc-700/25 scale-x-0 origin-center-left -z-10'
      />
    </div>
  )
}