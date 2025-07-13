import { useState, useRef, useEffect } from 'react'

import Link from 'next/link'

import { ChevronsDown, ChevronsUp } from 'lucide-react'

interface ISubMenuModal {
  items: { id: string; slug: string; title: string}[]
  basePath: string
  isMobile: boolean
}

export function SubMenuModal({ items, basePath, isMobile}: ISubMenuModal ) {
  const [ index, setIndex ] = useState(0)
  const listContainerRef = useRef<HTMLDivElement>(null)

  const isListAtStart = index === 0
  const isListAtEnd = index + 3 >= items.length
  const visibleItems = items.slice(index, index + 3)

  function scrollToDown() {
    if(!isListAtEnd) setIndex(prev => prev + 1)
  }

  function scrollToTop() {
    setIndex(0)
  }

  useEffect(() => {
    listContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  },[index])

  return (
    <div 
      ref={listContainerRef}
      className='flex flex-col items-center justify-center gap-1.5'
    >
      {visibleItems.map((item) => (
        <Link
          key={item.id}
          href={`/${basePath  }/${item.slug}`}
          className={`${isMobile ? 'text-xl' : 'text-md'} 
            hover:brightness-200 hover:tracking-wider transition-all duration-300 ease-in-out`}
        >
          {item.title}
        </Link>
      ))}

      {items.length > 3 && (
        <button
          onClick={isListAtEnd ? scrollToTop : scrollToDown}
          className='text-zinc-300 hover:text-sky-500 transition-all mt-1'
          aria-label={isListAtEnd ? 'Back to Top' : 'See More'}
        >
          { isListAtEnd ? <ChevronsUp/> : <ChevronsDown/>}
        </button>
      )}
    </div>
  )
}