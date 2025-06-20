'use client'

import { useRef, useEffect } from 'react'

import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

import Link from 'next/link'
import Image from 'next/image'

import { Iprojects } from '@/app/portfolio-data/data'

import { ButtonLink } from '@/app/elements/button-link'
import { ProjectTitleNavBar } from '@/app/elements/project-title-navbar'

import { useMediaRange } from '@/app/utils/breakpoints-hook'

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

interface IProjectClientModel {
  prevProject: Iprojects
  project?: Iprojects
  nextProject: Iprojects
}

export function ProjectClientModel({ prevProject, project, nextProject}: IProjectClientModel) {
  const projectTitleTextRef = useRef(null)
  const projectDescriptionTextRef = useRef(null)

  //Query's
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')
  
  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG

  gsap.registerPlugin(TextPlugin)
  useEffect(() => {
    if(!project) return

    // INITIAL EFFECTS SCALE
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
  }, [project?.description])

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
    <div className='w-full'>
      <div className={`w-full max-w-4xl fixed ${mobileRangeFull ? 'top-3' : 'top-5'} left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-3 px-3`}>
        <ButtonLink 
          href={`/projects/${prevProject.slug}`}    
        >
          <ArrowBigLeft/>
          <span className={ mobileRangeFull ? 'hidden' : ''}>Previous</span>
        </ButtonLink>
        <ProjectTitleNavBar> 
          {project.slug}
        </ProjectTitleNavBar>
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
      
    </div>
  )
}