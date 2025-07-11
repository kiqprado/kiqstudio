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
import { NavBarSectionTitle } from '@/app/elements/project-title-navbar'

import { useMediaRange } from '@/app/utils/breakpoints-hook'
import { PageNotFound } from '@/app/error/page-not-found'

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

interface IProjectClientModel {
  prevProject: Iprojects
  project?: Iprojects
  nextProject: Iprojects
}

export function ProjectClientModel({ prevProject, project, nextProject}: IProjectClientModel) {
  const projectNavigationRef = useRef(null)
  const projectProgressNavBarRef = useRef(null)

  const projectTitleTextRef = useRef(null)
  const projectDescriptionTextRef = useRef(null)

  const imageTemplateOfProjectRef = useRef<HTMLImageElement[]>([])
  const imageTemplateCaptionProjectRef = useRef<HTMLDivElement[]>([])

  const nextProjectProgressNavBarRef = useRef(null)
  const footerRef = useRef(null)

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

    function SetUpImagesScrollTrigger() {
      const triggerElement = document.querySelector('.images-section')

      if(!triggerElement || imageTemplateOfProjectRef.current.length === 0) return

      gsap.set([...imageTemplateOfProjectRef.current, ...imageTemplateCaptionProjectRef.current], {
        opacity: 0,
        y: 20
      })

      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const timeLine = gsap.timeline()
          project.images.forEach((_, index) => {
            timeLine.to(imageTemplateOfProjectRef.current[index], {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.inOut'
            })
            .to(imageTemplateCaptionProjectRef.current[index] , {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.inOut'
            },
              '-=0.3'
            )
          })
        }
      })
    }

    function SetUpFooterAnimation() {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 3}px`,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          if(projectNavigationRef.current && !projectIsTransitioning) {
            gsap.to(projectNavigationRef.current, {
              y: -100,
              duration: 0.5,
              ease: 'power2.inOut'
            })
          }
        },
        onLeaveBack: () => {
          if(projectNavigationRef.current && !projectIsTransitioning) {
            gsap.to(projectNavigationRef.current, {
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

      if(self.progress >= 0.2 && !projectIsTransitioning) {
        setShouldUpdateNavBarProgress(false)
        setProjectIsTransitioning(true)
        AnimateNextProjectTransition()
      }
    }

    function AnimateNextProjectTransition() {
      const tl = gsap.timeline()

      tl.to(
        nextProjectProgressNavBarRef.current,{
          scaleX: 1,
          transformOrigin: 'center center',
          duration: 0.8,
          ease: 'power4.inOut'
        },
        0
      )
      tl.to(
        [
          footerRef.current?.querySelector("#next-project-title-footer")
        ],
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out'
        },
        0.2
      )

      tl.call(() => {
        window.location.href = `/projects/${nextProject.slug}`
      })
    }

    function cleanupAnimations() {
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        imageTemplateOfProjectRef.current = []
        imageTemplateCaptionProjectRef.current = []
      }
    }

    SetUpInitialAnimations()
    SetUpGlobalScrollTriggers()
    SetUpImagesScrollTrigger()

    return cleanupAnimations()

  }, [project, nextProject.slug, projectIsTransitioning, shouldUpdateNavBarProgress, project?.description])

  if(!project) {
    return (
      <PageNotFound>
        Projeto não encontrado
      </PageNotFound>
    )
  }

  return (
    <ReactLenis root>
      <div className='flex flex-col'>
        <div 
          ref={projectNavigationRef}
          className={`w-full max-w-4xl fixed ${mobileRangeFull ? 'top-3' : 'top-5'} left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-3 px-3`}>
          <ButtonLink 
            href={`/projects/${prevProject.slug}`}    
          >
            <ArrowBigLeft/>
            <span className={ mobileRangeFull ? 'hidden' : ''}>Previous</span>
          </ButtonLink>
          <NavBarSectionTitle
            ref={projectProgressNavBarRef}
          > 
            {project.slug}
          </NavBarSectionTitle>
          <ButtonLink 
            href={`/projects/${nextProject.slug}`}
          >
            <span className={ mobileRangeFull ? 'hidden' : ''}>Next</span>
            <ArrowBigRight/>
          </ButtonLink>
        </div>
      
        <div className='h-svh flex items-center justify-center'>
          <div className='w-full flex flex-col items-center relative'>
            <h1 
              ref={projectTitleTextRef}
              className={`tracking-widest font-bold text-6xl`}
            >
              {project.title}
            </h1>
            <p 
              ref={projectDescriptionTextRef}
              className={`absolute ${mobileRangeFull || tabletRangeFull ? 'top-[15vh] px-4' : 'top-[25vh]'}
                max-w-4xl text-justify`}
            >
              {project.description}
            </p>
          </div>  
        </div>
        
        <div className='w-full px-3 mt-16 images-section'>
          {project.images.map((image, index) => (
            <div
              key={index}
              className='flex flex-col items-center gap-3'
            >
              <Image
                src={image}
                alt={`Image of ${project.title}`}
                ref={(el) => {if(el) imageTemplateOfProjectRef.current[index] = el}}
                width={356}
                height={52}
                className='rounded-md'
              />
              <div
                ref={(el) => {if(el) imageTemplateCaptionProjectRef.current[index] = el}}
                className='mb-3'
              >
                <p className='px-4 text-justify tracking-wider'>
                  {project.images_captions[index]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div 
          ref={footerRef}
          className='h-svh w-full flex flex-col justify-center items-center relative'
        >
          <h2 className='tracking-wider font-bold text-4xl'>{nextProject.title}</h2>

          <div
            ref={nextProjectProgressNavBarRef}
            className='absolute h-1 top-128 w-full bg-zinc-700 border border-zinc-50 rounded-4xl origin-center scale-x-0'
          />

          <span 
            id="next-project-title-footer" 
            className='w-full text-center absolute top-132 left-1/2 -translate-x-1/2'
          >
            Keep scrolling to the Next Project
          </span>

          <Link 
            href={'/'}
            className='absolute bottom-12 text-xl tracking-wider hover:text-sky-500 hover:brightness-200 transition-colors duration-300 ease-in-out'
          >
            /Home
          </Link>
        </div> 
      </div>
    </ReactLenis>
  )
}