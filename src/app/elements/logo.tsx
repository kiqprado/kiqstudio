import { K } from '../../../public/header/logo/K'
import { I } from '../../../public/header/logo/I'
import { Q } from '../../../public/header/logo/Q'
import { S } from '../../../public/header/logo/S'
import { T } from '../../../public/header/logo/T'
import { U } from '../../../public/header/logo/U'
import { D } from '../../../public/header/logo/D'
import { O } from '../../../public/header/logo/O'

type LogoProps = {
  isMobileRange: boolean
}

export function Logo({ isMobileRange }: LogoProps) {
const iconsOnUpper = [
    {Component: K, sizes: { mobile: 'h-[20px]', desk: 'h-[26px]' }},
    {Component: I, sizes: { mobile: 'h-[21px]', desk: 'h-[27px]' }},
    {Component: Q, sizes: { mobile: 'h-[20px]', desk: 'h-[26px]' }}, 
  ]

  const iconsOnLower = [
    {Component: S, sizes: { mobile: 'h-[14px]', desk: 'h-[18px]' }},
    {Component: T, sizes: { mobile: 'h-[14px]', desk: 'h-[18px]' }},
    {Component: U, sizes: { mobile: 'h-[14px]', desk: 'h-[18px]' }},
    {Component: D, sizes: { mobile: 'h-[14px]', desk: 'h-[18px]' }},
    {Component: I, sizes: { mobile: 'h-[15px]', desk: 'h-[19px]' }},
    {Component: O, sizes: { mobile: 'h-[15px]', desk: 'h-[19px]' }},
  ]

  return(
    <div className=''>
      <ul className='flex gap-1.5'>
        {iconsOnUpper.map(({Component, sizes}, index) => (
          <li
            key={index}
            className='text-zinc-500 hover:text-zinc-100 transition-all duration-300 ease-in-out'
          >
            <Component className={`${isMobileRange ? sizes.mobile : sizes.desk} w-auto`}/>
          </li>
        ))}
      </ul>
      <ul className='flex gap-1 ml-6'>
        {iconsOnLower.map(({Component, sizes}, index) => (
          <li
            key={index}
            className='text-zinc-500 hover:text-zinc-100 transition-all duration-300 ease-in-out'
          >
            <Component className={`${isMobileRange ? sizes.mobile : sizes.desk} w-auto`}/>
          </li>
        ))}
      </ul>
    </div>
  )
}