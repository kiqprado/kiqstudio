'use client'

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

  //Query's
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')
  
  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG

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
      <div className='flex items-center justify-center gap-3 py-2.5 px-3'>
        <ButtonLink 
        href={`/projects/${prevProject.slug}`}
        className='flex items-center gap-1.5'     
      >
        <ArrowBigLeft/>
        <span className={ mobileRangeFull ? 'hidden' : ''}> Prev </span>
      </ButtonLink>
      <ProjectTitleNavBar> 
        {project.slug}
      </ProjectTitleNavBar>
      <ButtonLink 
        href={`/projects/${nextProject.slug}`}
        className='flex items-center gap-1.5'
      >
        <span className={ mobileRangeFull ? 'hidden' : ''}> Next </span>
        <ArrowBigRight/>
      </ButtonLink>
      </div>
      
      <div className=' h-svh flex flex-col items-center'>
        <h1 className={`tracking-widest font-bold text-6xl my-36`}>
          {project.title}
        </h1>
        <p className='px-3 text-justify'>{project.description}</p>
      </div>

      <div>
        {project.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image of ${project.title}`}
            width={256}
            height={52}
          />
        ))}
      </div>

      <Link href={'/'}>Home</Link>
    </div>
  )
}