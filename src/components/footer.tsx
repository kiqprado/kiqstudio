import Link from "next/link"

export function Footer() {
  return(
    <footer className='flex items-center justify-center h-12 border-t-1 border-zinc-700/70'>
      <span className='text-zinc-200 tracking-wider'>This portfolio is 100% 
        <Link 
          href='https://instagram.com/kiqprado' 
          target='_blank'
          className='px-1 hover:text-zinc-50'
        >
          human-made
        </Link> 
          (unlike my sleep schedule).
        </span>
      </footer>
  )
}