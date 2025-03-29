"use client"

import Image from "next/image"

import { useEffect, useRef, useState} from 'react'

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from 'gsap/TextPlugin'
import { ReactLenis } from 'lenis/react'

import { Iprojects } from '@/portfolio/page'

import { ButtonLink } from '@/elements/button-link'
import { NavBarSectionTitle } from '@/elements/nav-bar-section-title'

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

interface IProjectClient {
  prevProject: Iprojects
  project?: Iprojects
  nextProject: Iprojects
}

export default function ProjectClient({ prevProject, project, nextProject}: IProjectClient) {
  const projectNavRef = useRef(null)
  const progressBarRef = useRef(null)
  const descriptionTextRef = useRef(null)
  const footerRef = useRef(null)
  const nextProjectProgressBarRef = useRef(null)

  const [ isTransitioning, setIsTransitioning ] = useState(false)
  const [ shouldUpdateBarProgress, setShouldUpdateBarProgress ] = useState(true)

  

  useEffect(()=> {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)

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

    if(descriptionTextRef.current) {
      gsap.fromTo( descriptionTextRef.current, {
        text: ' '
      },{
        text: { value: project.description},
        duration: 11,
        delay: 0.5,
        ease: 'none'
      })
    }

    ScrollTrigger.create({
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

    ScrollTrigger.create({
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

  }, [nextProject.slug, isTransitioning, shouldUpdateBarProgress, project?.description])

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
          <ButtonLink 
            href={`/projects/${prevProject.slug}`}
          >
            <ArrowBigLeft className='size-5'/>
            Previous
          </ButtonLink>

          <NavBarSectionTitle
            ref={progressBarRef}
          >
            {project.title}
          </NavBarSectionTitle>

          <ButtonLink 
            href={`/projects/${nextProject.slug}`}
          >
            <ArrowBigRight className='size-5'/>
            Next
          </ButtonLink>
      </div>

      <div className='relative h-screen flex flex-col justify-center items-center'>
        <h1 className='tracking-widest font-bold text-6xl'>{project.title}</h1>
        <p 
          ref={descriptionTextRef}
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