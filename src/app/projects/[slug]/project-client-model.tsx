'use client'

import { useRef, useEffect, useState } from 'react'

import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

import Link from 'next/link'
import Image from 'next/image'

import { Iprojects } from '@/app/portfolio-data/data'

import { ButtonLink } from '@/app/elements/button-link'
import { ProjectTitleNavBarSection } from '@/app/elements/project-title-navbar'

import { useMediaRange } from '@/app/utils/breakpoints-hook'

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

interface IProjectClientModel {
  prevProject: Iprojects
  project?: Iprojects
  nextProject: Iprojects
}

export function ProjectClientModel({ prevProject, project, nextProject}: IProjectClientModel) {
  const projectNavigationRef = useRef(null)
  const projectProgressNavBarRef = useRef(null)
  const nextProjectProgressNavBarRef = useRef(null)
  const footerRef = useRef(null)

  const projectTitleTextRef = useRef(null)
  const projectDescriptionTextRef = useRef(null)

  const [ projectIsTransitioning, setProjectIsTransitioning ] = useState(false)
  const [ shouldUpdateNavBarProgress, setShouldUpdateNavBarProgress ] = useState(false)

  //Query's
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')
  
  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG

  gsap.registerPlugin(TextPlugin, ScrollTrigger)

  useEffect(() => {
    if(!project) return

    // INITIAL EFFECTS SCALE
    function SetUpInitialAnimations() {
      gsap.set(projectNavigationRef.current, {
        opacity: 0,
        y: -100
      })

      gsap.to(projectNavigationRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.25,
        ease: 'power3.inOut'
      })

      if(projectTitleTextRef.current) {
        gsap.fromTo(projectTitleTextRef.current, {
          opacity: 0
        }, {
          opacity: 1,
          duration: 0.7,
          delay: 0.3,
          ease: 'power1.in'
        })
      }

      if(projectDescriptionTextRef.current) {
        gsap.fromTo(projectDescriptionTextRef.current, {
          text: ' '
        }, {
          text: { value: project.description },
          duration: 11,
          delay: 0.9,
          ease: 'none'
        })
      }
    }

    function SetUpGlobalScrollTriggers() {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if(projectProgressNavBarRef.current) {
            gsap.set(projectProgressNavBarRef.current, {
              scaleX: self.progress
            })
          }
        }
      })

      SetUpFooterAnimation()
    }

    function SetUpFooterAnimation() {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 3}px`,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          if(projectProgressNavBarRef.current && !projectIsTransitioning) {
            gsap.to(projectProgressNavBarRef.current, {
              y: -100,
              duration: 0.5,
              ease: 'power2.inOut'
            })
          }
        },
        onLeaveBack: () => {
          if(projectProgressNavBarRef.current && !projectIsTransitioning) {
            gsap.to(projectProgressNavBarRef.current, {
              y: 0,
              duration: 0.5,
              ease: 'power2.inOut'
            })
          }
        },
        onUpdate: (self) => {
          HandleFooterProgress(self)
        }
      })
    }

    function HandleFooterProgress(self: ScrollTrigger) {
      if(nextProjectProgressNavBarRef.current && shouldUpdateNavBarProgress) {
        gsap.set(nextProjectProgressNavBarRef.current, {
          scaleX: self.progress
        })
      }

      if(self.progress >= 1 && !projectIsTransitioning) {
        setShouldUpdateNavBarProgress(false)
        setProjectIsTransitioning(true)
        AnimateNextProjectTransition()
      }
    }

    function AnimateNextProjectTransition() {
      const theCurrentTimeLine = gsap.timeline()

      theCurrentTimeLine.set(nextProjectProgressNavBarRef.current, {
        scaleX: 1
      })

      theCurrentTimeLine.to(
        [
          footerRef.current?.querySelector("#next-project-title-footer"),
          footerRef.current?.querySelector('#next-project-progress-bar-footer')
        ],
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        }
      )

      theCurrentTimeLine.call(() => {
        window.location.href = `/projects/${nextProject.slug}`
      })
    }

    function cleanupAnimations() {
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }

    SetUpInitialAnimations()
    SetUpGlobalScrollTriggers()

    return cleanupAnimations()

  }, [project, nextProject.slug, projectIsTransitioning, shouldUpdateNavBarProgress, project?.description])

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
      <div className='w-full'>
        <div 
          ref={projectNavigationRef}
          className={`w-full max-w-4xl fixed ${mobileRangeFull ? 'top-3' : 'top-5'} left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-3 px-3`}>
          <ButtonLink 
            href={`/projects/${prevProject.slug}`}    
          >
            <ArrowBigLeft/>
            <span className={ mobileRangeFull ? 'hidden' : ''}>Previous</span>
          </ButtonLink>
          <ProjectTitleNavBarSection
            ref={projectProgressNavBarRef}
          > 
            {project.slug}
          </ProjectTitleNavBarSection>
          <ButtonLink 
            href={`/projects/${nextProject.slug}`}
          >
            <span className={ mobileRangeFull ? 'hidden' : ''}>Next</span>
            <ArrowBigRight/>
          </ButtonLink>
        </div>
      
        <div className='h-svh relative flex flex-col items-center justify-center'>
          <h1 
            ref={projectTitleTextRef}
            className={`tracking-widest font-bold text-6xl`}>
            {project.title}
          </h1>
          <p 
            ref={projectDescriptionTextRef}
            className={`absolute ${mobileRangeFull || tabletRangeFull ? 'top-136' : 'top-124'} px-3 text-justify max-w-4xl`}
          >
            {project.description}
          </p>
        </div>

        <div className='flex flex-col items-center gap-3'>
          {project.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Image of ${project.title}`}
              width={356}
              height={52}
              className='rounded-md'
            />
          ))}
        </div>
      
        <div className='flex justify-center my-26'>
          <Link href={'/'}>Home</Link>
        </div>

        <div 
          ref={footerRef}
          className='relative h-screen w-full flex flex-col justify-center items-center'
        >
          <h2 className='tracking-wider font-bold text-4xl'>{nextProject.title}</h2>

          <div
            id="next-project-progress-bar-footer" 
            ref={nextProjectProgressNavBarRef}
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