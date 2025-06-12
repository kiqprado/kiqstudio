import Link from "next/link"

export function Footer() {
  return(
    <p 
      className='text-center'
    >
      This porfólio is 100% <Link href={'https://github.com/kiqprado'} target='_blank'>human-made</Link>, likely my schedule sleep routine
    </p>
  )
}