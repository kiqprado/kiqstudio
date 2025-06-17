import Link from 'next/link'
import { ComponentProps, ReactNode } from 'react'

import { useMediaRange } from '../utils/breakpoints-hook'

interface IButtonLink extends ComponentProps<'link'> {
  children: ReactNode
}

export function ButtonLink({ children, ...props}: IButtonLink) {
  //Query's
      const isMobileSM = useMediaRange('mobileSM')
      const isMobileMD = useMediaRange('mobileMD')
      const isMobileLG = useMediaRange('mobileLG')
      const isTabletMD = useMediaRange('tabletMD')
      const isTabletLG = useMediaRange('tabletLG')
      
      const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
      const tabletRangeFull = isTabletMD || isTabletLG

  return(
    <Link
      {...props}
      className={`${mobileRangeFull ? 'w-fit' : 'w-36'} flex items-center justify-center gap-1.5 border rounded-md border-zinc-500/75 bg-zinc-600/35 hover:border-zinc-400/55 hover:bg-zinc-500/35  text-zinc-300  hover:text-zinc-200 px-6 py-0.5`}
    >
      {children}
    </Link>
  )
}