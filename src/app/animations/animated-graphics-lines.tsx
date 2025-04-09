import { useRef, useEffect } from "react"
import gsap from 'gsap'

export function AnimatedGraphicsLines() {
  const circleRef = useRef<HTMLDivElement>(null)
  const arcPathRef = useRef<SVGPathElement>(null)
  const squareRef = useRef<HTMLDivElement>(null)
  const squarePathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if(!circleRef.current || !arcPathRef.current || !squareRef.current || !squarePathRef.current) return

    gsap.set(arcPathRef.current, {
      opacity: 0,
      strokeDasharray: 200,
      strokeDashoffset: 200
    })
    gsap.set(squarePathRef.current, {
      opacity: 0,
      strokeDasharray: 120,
      strokeDashoffset: 120
    })

    function onCircleEnter() {
      gsap.to(arcPathRef.current, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power2.inOut'
      })
    }

    function onCircleLeave() {
      gsap.to(arcPathRef.current, {
        opacity: 0,
        strokeDashoffset: 200,
        duration: 0.5
      })
    }

    function onSquareEnter() {
      gsap.to(squarePathRef.current, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power2.inOut'
      })
    }

    function onSquareLeave() {
      gsap.to(squarePathRef.current, {
        opacity: 0,
        strokeDashoffset: 120,
        duration: 0.5
      })
    }

    circleRef.current.addEventListener('mouseenter', onCircleEnter)
    circleRef.current.addEventListener('mouseleave', onCircleLeave)
    squareRef.current.addEventListener('mouseenter', onSquareEnter)
    squareRef.current.addEventListener('mouseleave', onSquareLeave)

    return() => {
      circleRef.current?.removeEventListener('mouseenter', onCircleEnter)
      circleRef.current?.removeEventListener('mouseleave', onCircleLeave)
      squareRef.current?.removeEventListener('mouseenter', onSquareEnter)
      squareRef.current?.removeEventListener('mouseleave', onSquareLeave)
    }
  }, [])

  return(
    <div className='h-full border-x border-zinc-900/30 mx-6 relative'>
      <div className='border-b border-zinc-900/30 h-26'/>
    
      <div className='absolute left-[-4] top-25 z-20'>
        <div
          ref={circleRef}
          className='h-2 w-2 rounded-xl  bg-zinc-500 hover:bg-zinc-300 relative'
        />
        <svg 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" 
          width="40" 
          height="40" 
          viewBox="0 0 40 40"
        >
          <path
            ref={arcPathRef}
            d="M 20 4 A 16 16 0 0 1 20 36"
            fill="none"
            stroke="rgb(244 244 245)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg> 
      </div>
      
      <div className='absolute right-112 top-25 z-20'>
        <div
          ref={squareRef}
          className='h-2 w-2 rotate-45 bg-zinc-500 hover:bg-zinc-300 relative'
        />
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
          width="58"
          height="58"
          viewBox="0 0 48 48"
        >
          <path
            ref={squarePathRef}
            d="M12 12 L36 12 L36 36 L12 36 Z"
            fill="none"
            stroke="rgb(244 244 245)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}