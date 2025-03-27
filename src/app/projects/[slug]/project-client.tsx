"use client"

import Link from "next/link"
import Image from "next/image"

import { useEffect, useRef, useState} from 'react'

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ReactLenis } from 'lenis/react'

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

import { Iprojects } from '@/portfolio/page'

interface IProjectClient {
  prevProject: Iprojects
  project?: Iprojects
  nextProject: Iprojects
}

export default function ProjectClient({ prevProject, project, nextProject}: IProjectClient) {
  const projectNavRef = useRef(null)
  const progressBarRef = useRef(null)
  const projectDescriptionRef = useRef(null)
  const footerRef = useRef(null)
  const nextProjectProgressBarRef = useRef(null)

  const [ isTransitioning, setIsTransitioning ] = useState(false)
  const [ shouldUpdateBarProgress, setShouldUpdateBarProgress ] = useState(true)

  

  useEffect(()=> {
    gsap.registerPlugin(ScrollTrigger)

    gsap.set(projectNavRef.current, {
      opacity: 0,
      y: -100
    })

    gsap.to(projectNavRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.25,
      ease: "power3.out"
    })

    gsap.to(projectDescriptionRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: "power3.inOut"
    })

    const navScrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if(progressBarRef.current) {
          gsap.set(progressBarRef.current, {
            scaleX: self.progress
          })
        }
      }
    })

    const footerScrollTrigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 3}px`,
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        if(projectNavRef.current && !isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: -100,
            duration: 0.5,
            ease: "power2.inOut"
          })
        }
      },
      onLeave: () => {
        if(projectNavRef.current && !isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: 0,
            duration: 0.5,
            ease: "power2.inOut"
          })
        }
      },
      onUpdate: (self) => {
        if(nextProjectProgressBarRef && shouldUpdateBarProgress) {
          gsap.set(nextProjectProgressBarRef.current, {
            scaleX: self.progress,

          })
        }

        if(self.progress >= 1 && !isTransitioning) {
          setShouldUpdateBarProgress(false)
          setIsTransitioning(true)

          const theTimeLine = gsap.timeline()

          theTimeLine.set(nextProjectProgressBarRef.current, {
            scaleX: 1
          })

          theTimeLine.to(
            [footerRef.current?.querySelector("#next-project-title-footer"),
             footerRef.current?.querySelector("next-project-progress-bar-footer")],
            {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut"
            }
          )

          theTimeLine.call(() => {
            window.location.href = `/projects/${nextProject.slug}`
          })
        }
      }
    })

    return ()=> {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }

  }, [nextProject.slug, isTransitioning, shouldUpdateBarProgress])

  if(!project) {
    return (
      <div className='fixed inset-0 bg-zinc-950/50 flex'>
        <div className='m-auto px-6 py-3 flex items-center justify-center'>
          <span className='font-medium text-xl'>Projeto não encontrado</span>
        </div>
      </div>
    )
  }

  return (
    <ReactLenis root>
      <div className='flex flex-col items-center'>
        <div 
          ref={projectNavRef}
          className='fixed top-0 left-1/2 -translate-x-1/2 w-1/2 flex items-center justify-between z-2 gap-6 py-6'
        >
          <Link 
            href={`/projects/${prevProject.slug}`}
            className='w-36 flex items-center justify-center gap-1.5 border rounded-md border-zinc-500/75 bg-zinc-600/35 hover:border-zinc-400/55 hover:bg-zinc-500/35  text-zinc-300  hover:text-zinc-200 px-6 py-0.5'
          >
            <ArrowBigLeft className='size-5'/>
            Previous
          </Link>

          <div className='relative flex-1 text-center border rounded-md border-zinc-600/75 bg-zinc-800/25'>
            <p className='font-medium text-lg'>{project.title}</p>
            <div
              ref={progressBarRef}
              className='absolute top-0 left-0 w-full h-full bg-zinc-700/25 scale-x-0 origin-center-left -z-10'
            />
          </div>

          <Link 
            href={`/projects/${nextProject.slug}`}
            className='w-36 flex items-center justify-center gap-1.5 border rounded-md border-zinc-500/75 bg-zinc-600/35  hover:border-zinc-400/55 hover:bg-zinc-500/35 text-zinc-300  hover:text-zinc-200 px-6 py-0.5'
          >
            <ArrowBigRight className='size-5'/>
            Next
          </Link>
      </div>

      <div className='relative h-screen flex flex-col justify-center items-center'>
        <h1 className='tracking-widest font-bold text-6xl'>{project.title}</h1>
        <p 
          ref={projectDescriptionRef}
          className='text-center tracking-wider w-4xl absolute top-124'
        >
          {project.description}
        </p>
      </div>

      <div className='flex flex-col gap-8'>
        {project.images && project.images.map((image, index) => (
          <div
            key={index}
          >
            <Image 
              src={image} 
              alt={`Image of ${project.title}`}
              width={1000}
              height={500}
            />
          </div>
        ))}
      </div>

      <div 
        ref={footerRef}
        className='relative h-screen w-full flex flex-col justify-center items-center'
      >
        <h2 className='tracking-wider font-bold text-4xl'>{nextProject.title}</h2>

        <div
          id="next-project-progress-bar-footer" 
          ref={nextProjectProgressBarRef}
          className='absolute top-124 w-full h-1 bg-zinc-700/50 border border-zinc-500 rounded-xl px-0.5'
        />

        <span 
          id="next-project-title-footer" 
          className='w-full text-center absolute top-152 left-1/2 -translate-x-1/2'
        >
          Next Project
        </span>
        
      </div>
    </div>
    </ReactLenis> 
  )
}