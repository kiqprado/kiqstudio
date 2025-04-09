import { K } from '../../public/logo/K'
import { I } from '../../public/logo/I'
import { Q } from '../../public/logo/Q'
import { S } from '../../public/logo/S'
import { T } from '../../public/logo/T'
import { U } from '../../public/logo/U'
import { D } from '../../public/logo/D'
import { O } from '../../public/logo/O'


export function Logo() {
  const icons = [
    {Component: K, size: 'h-[26px]'},
    {Component: I, size: 'h-[27px]'},
    {Component: Q, size: 'h-[26px]'},
    {Component: S, size: 'h-[26px]'},
    {Component: T, size: 'h-[26px]'},
    {Component: U, size: 'h-[26px]'},
    {Component: D, size: 'h-[26px]'},
    {Component: I, size: 'h-[27px]'},
    {Component: O, size: 'h-[27px]'},
  ]
  
  return(
    <ul className='flex items-baseline gap-1'>
      {icons.map(({Component, size}, index) => (
        <li
          key={index}
          className='transition-all duration-300 ease-in-out transform hover:scale-105 text-zinc-500 hover:text-zinc-300'
        >
          <Component className={`${size} w-auto`}/>
        </li>
      ))}

    </ul>
  )
}