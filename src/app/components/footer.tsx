import Link from 'next/link'

import { useMediaRange } from '../utils/breakpoints-hook'

export function Footer() {
   //Query's
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')
  
  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG

  return(
    <div 
      className='text-center'
    >
      { mobileRangeFull || tabletRangeFull ? (
        <p>This porfólio is 100% <Link href={'https://github.com/kiqprado'} target='_blank'>human-made</Link>.</p>
        ):(
        <p>This porfólio is 100% <Link href={'https://github.com/kiqprado'} target='_blank'>human-made</Link>, (unlike my sleep schedule).</p>
      )} 
    </div>
  )
}