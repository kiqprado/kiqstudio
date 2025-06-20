import { useEffect, useRef } from 'react'

import gsap from 'gsap'

export function AnimatedGraphicLinesBg(){
  const triangleRef = useRef<HTMLDivElement>(null)
  const trianglePathRef = useRef<SVGPathElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const circlePathRef = useRef<SVGPathElement>(null)
  const squareRef = useRef<HTMLDivElement>(null)
  const squarePathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if(!triangleRef.current || !trianglePathRef.current ||
       !circleRef.current || !circlePathRef.current || !squareRef.current || !squarePathRef.current
    ) return

    gsap.set(trianglePathRef.current, {
      opacity: 0,
      strokeDasharray: 150,
      strokeDashoffset: 150
    })
    gsap.set(circlePathRef.current, {
      opacity: 0,
      strokeDasharray: 200,
      strokeDashoffset: 200
    })
    gsap.set(squarePathRef.current, {
      opacity: 0,
      strokeDasharray: 120,
      strokeDashoffset: 120
    })

    function OnTriangleEnter() {
      gsap.to(trianglePathRef.current, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power2.inOut'
      })
    }

    function OnTriangleLeave() {
      gsap.to(trianglePathRef.current, {
        opacity: 0,
        strokeDashoffset: 150,
        duration: 0.5
      })
    }

    function OnCircleEnter() {
      gsap.to(circlePathRef.current, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power2.inOut'
      })
    }

    function OnCircleLeave() {
      gsap.to(circlePathRef.current, {
        opacity: 0,
        strokeDashoffset: 200,
        duration: 0.5
      })
    }

    function OnSquareEnter() {
      gsap.to(squarePathRef.current, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power2.inOut'
      })
    }

    function OnSquareLeave() {
      gsap.to(squarePathRef.current, {
        opacity: 0,
        strokeDashoffset: 120,
        duration: 0.5
      })
    }

    triangleRef.current.addEventListener('mouseenter', OnTriangleEnter)
    triangleRef.current.addEventListener('mouseleave', OnTriangleLeave)
    circleRef.current.addEventListener('mouseenter', OnCircleEnter)
    circleRef.current.addEventListener('mouseleave', OnCircleLeave)
    squareRef.current.addEventListener('mouseenter', OnSquareEnter)
    squareRef.current.addEventListener('mouseleave', OnSquareLeave)

    return() => {
      triangleRef.current?.removeEventListener('mouseenter', OnTriangleEnter)
      triangleRef.current?.removeEventListener('mouseleave', OnTriangleLeave)
      circleRef.current?.removeEventListener('mouseenter', OnCircleEnter)
      circleRef.current?.removeEventListener('mouseleave', OnCircleLeave)
      squareRef.current?.removeEventListener('mouseenter', OnSquareEnter)
      squareRef.current?.removeEventListener('mouseleave', OnSquareLeave)
    }

  }, [])
  return (
    <div className='h-full mx-6 mt-16 border-x border-zinc-900/30 relative'>
      <div className='border-b border-zinc-900/20 h-26'/>

      <div className='absolute left-[-6] top-2'>
        <div
          ref={triangleRef}
          className='w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-zinc-500 hover:border-t-zinc-300 relative'
        />
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" 
          width="44" 
          height="44" 
          viewBox="0 0 40 40"
        >
          <path
            ref={trianglePathRef}
            d="M 10 30 L 20 10 L 30 30"
            fill="none"
            stroke="rgb(244 244 245)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
    
      <div className='absolute left-[-4] top-25'>
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
            ref={circlePathRef}
            d="M 20 4 A 16 16 0 0 1 20 36"
            fill="none"
            stroke="rgb(244 244 245)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg> 
      </div>
    
      <div className='absolute right-112 top-25'>
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