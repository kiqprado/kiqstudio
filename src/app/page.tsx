'use client'

import { useRef, useEffect, useState } from 'react'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin  from 'gsap/TextPlugin'
import lottie, { AnimationItem } from 'lottie-web'
import {AnimatePresence, motion} from 'framer-motion'

import Image from 'next/image'
import Link from 'next/link'

import { useMediaRange } from './utils/breakpoints-hook'
import { projects } from './portfolio-data/data'

import { Header } from './components/header'
import { Footer } from './components/footer'
import { LocationAndTimeDisplay } from './components/location-and-time-display'

import { Button } from './elements/button'

import { ChevronsDown, ArrowDown } from 'lucide-react'

gsap.registerPlugin(TextPlugin, ScrollTrigger)

export default function Home() {
  // SCROLL REVEAL REF
  const mainContainerRef = useRef(null)
  const introMainDescriptionSectionRef = useRef<HTMLDivElement>(null)
  const projectPresentationDetailsRef = useRef<HTMLDivElement>(null)
  const socialsMediaConnectionsRef = useRef<HTMLDivElement>(null)
  const shortSelfPresentationRef = useRef<HTMLDivElement>(null)
  const userLocationSettingRef = useRef<HTMLDivElement>(null)

  //SHORT PORTFOLIO PRESENTATION
  const titlePresentationRef = useRef(null)
  const descriptionPresentationRef = useRef(null)
  // PROJECTS IMAGES CARDS
  const [ currentImagesOnCarouselIndex, setCurrentImagesOnCarouselIndex ] = useState(0)
  const currentImageProjectTemplate = projects[currentImagesOnCarouselIndex]
  const ImageTemplate = currentImageProjectTemplate.images[0]
  // PROJECTS TITLE
  const projectsTitleCarouselRef = useRef<HTMLAnchorElement>(null)
  const [ currentProjectTitleIdex, setCurrentProjectTitleIndex ] = useState(0)
  // ICONS SOCIALS LINKS
  const linkedinSocialsContainerRef = useRef<HTMLDivElement>(null)
  const linkedinSocialsAnimationIconRef = useRef<AnimationItem | null>(null)
  const githubSocialsContainerRef = useRef<HTMLDivElement>(null)
  const githubSocialsAnimationIconRef = useRef<AnimationItem | null>(null)

  //Query's
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')
  
  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG

  function HandleScrollToProjectsView() {
    projectPresentationDetailsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  // ANIMATION PORTFOLIO SHORT PRESENTATION
  useEffect(() => {
    if(titlePresentationRef.current) {
      gsap.fromTo(titlePresentationRef.current, {
        opacity: 0
      }, {
        opacity: 1,
        delay: 0.3,
        duration: 1,
        ease: 'power2.inOut',
      })
    }

    if(descriptionPresentationRef.current) {
      gsap.fromTo(descriptionPresentationRef.current, {
        text: ' ',
        opacity: 0
      }, {
        text: { value: introDescription},
        opacity: 1,
        delay: 0.5,
        duration: 2,
        ease: 'power1.inOut'
      })
    }
  }, [titlePresentationRef, descriptionPresentationRef])

  // ANIMATION CARD CAROUSEL IMAGES PROJECTS
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImagesOnCarouselIndex(prev => (prev + 1) % projects.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  // ANIMATION LINKS TITLE PROJECTS
  useEffect(() => {
    function GenerateARandomIndex() {
      const result: number = Math.floor(Math.random() * projects.length)
      return result
    }

    function ChangeProjectsTitleRandomly() {
      let nextIndex: number
      do {
        nextIndex = GenerateARandomIndex()
      } while ( nextIndex === currentProjectTitleIdex)
      setCurrentProjectTitleIndex(nextIndex)
    }

    function AnimatedProjectsTitleTransition() {
     if(projectsTitleCarouselRef.current) {
      gsap.fromTo(projectsTitleCarouselRef.current, {
        text: '______',
        opacity: 0
      }, {
        text: {
          value: projects[currentProjectTitleIdex].title,
          delimiter: '',
        },
        opacity: 1,
        duration: 2.5,
        ease: 'power1.inOut'
      })
     }
    }
    
    AnimatedProjectsTitleTransition()

    const interval = setInterval(() => {
      ChangeProjectsTitleRandomly()
    }, 3000)

    return() => clearInterval(interval)
  }, [currentProjectTitleIdex])

  // ANIMATION LINKS SOCIAL MEDIA
  useEffect(() => {
    if(linkedinSocialsContainerRef.current) {
      linkedinSocialsAnimationIconRef.current = lottie.loadAnimation({
        container: linkedinSocialsContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/icons8-linkedin.json'
      })
    }

    if(githubSocialsContainerRef.current) {
      githubSocialsAnimationIconRef.current = lottie.loadAnimation({
        container: githubSocialsContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/icons8-github.json'
      })
    }

    return() => {
      linkedinSocialsAnimationIconRef.current?.destroy()
      githubSocialsAnimationIconRef.current?.destroy()
    }
  }, [])

    // DATA INTRO CONST´S
    const introDescription: string = 'Down below, you’ll find quick drops of what I’ve been building — just a taste of the projects I’ve been cookin’ up lately.'
  
  return (
    <div className='h-svh flex flex-col items-center'>
      <Header/>
      <main 
        ref={mainContainerRef}
        className={`flex-1 ${mobileRangeFull || tabletRangeFull ? 'px-3': 'px-9'} flex flex-col items-center gap-5 overflow-y-auto`}
      >
        <div 
          ref={introMainDescriptionSectionRef}
          className='min-h-full min-w-full relative flex flex-col gap-6 justify-center'>
          <h2 
            ref={titlePresentationRef}
            className={`${mobileRangeFull ? 'text-4xl tracking-wider' : 'text-3xl'}`}
          >
            Hey...
          </h2>
          <p 

            ref={descriptionPresentationRef}
            className={`text-justify ${mobileRangeFull ? 'text-lg min-h-24':'text-md'}`}
          >
            {introDescription}
          </p>

          <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-full flex items-center justify-center'>
            <Button
              onClick={HandleScrollToProjectsView}
              size='fit'
            >
              Come to see it 
              <ChevronsDown 
                className='size-5'
              />
          </Button>
          </div>
        </div>

        <div className='min-h-full'>
          <div 
            ref={projectPresentationDetailsRef}
            className='py-3 flex flex-col items-center space-y-6 text-center'
          >
            <AnimatePresence mode='wait'>
              <motion.img
                key={currentImageProjectTemplate.slug}
                src={ImageTemplate}
                alt={currentImageProjectTemplate.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0}}
                transition={{ duration: 3.5 }}
                className='object-cover aspect-video rounded-md shadow-[2px_3px_12px_-2px_rgba(150,150,160,0.2),-1px_-1px_8px_0px_rgba(255,255,255,0.02)] hover:shadow-[4px_6px_20px_-4px_rgba(180,180,190,0.3),-2px_-2px_12px_0px_rgba(255,255,255,0.05)] transition-all duration-500 ease-out'
              />
            </AnimatePresence>
            <p className='tracking-wider'>Some highlights of the current projects</p>
            <span className='flex gap-3 items-center'>
              Don’t miss out! See the full details 
              <ArrowDown 
                className='size-5 hover:text-sky-600 transition-colors duration-300 ease-in'
              />
            </span>
            <div>
              <Link 
                href={`/projects/${projects[currentProjectTitleIdex].slug}`}
                className='cursor-pointer hover:text-red-600 transition-colors duration-300 ease-in'
              >
                <span
                  ref={projectsTitleCarouselRef}
                  className='text-lg tracking-widest'
                >
                  {projects[currentProjectTitleIdex].title}
                </span>
              </Link>
            </div>
          </div>

          <div 
            ref={socialsMediaConnectionsRef}
            className='flex flex-col items-center gap-3'
          >
            <span className='text-lg'>Find me on Socials</span>

            <div className='flex items-center'>
              <div className='flex flex-col items-center'>
                <div
                  ref={linkedinSocialsContainerRef}
                  onMouseEnter={() => linkedinSocialsAnimationIconRef.current?.play()}
                  onMouseLeave={() => linkedinSocialsAnimationIconRef.current?.stop()}
                  className='w-12 h-12'
                />
                <Link
                  href='https://www.linkedin.com/in/kaiqueprado/'
                  target='_blank'
                  className='px-3 text-lg rounded-sm border border-transparent hover:bg-blue-500/30 hover:border hover:border-blue-100/30 transition-all duration-300 ease-in-out'
                >
                  LinkedIn
                </Link>
              </div>
              <div className='flex flex-col items-center'>
                <div
                  ref={githubSocialsContainerRef}
                  onMouseEnter={() => githubSocialsAnimationIconRef.current?.play()}
                  onMouseLeave={() => githubSocialsAnimationIconRef.current?.pause()}
                  className='w-12 h-12'
                />
                <Link
                  href='https://github.com/kiqprado'
                  target='_blank'
                  className='px-3 text-lg rounded-sm border border-transparent hover:bg-neutral-500/30 hover:border hover:border-neutral-100/30 transition-all duration-300 ease-in-out'
                >
                  GitHub
                </Link>
              </div>
            </div>

            <div className='flex flex-col gap-3 items-center'>
              <span>Send me a message</span>
              <button>Email</button>
            </div>
          </div>
        </div>

        <div 
          ref={shortSelfPresentationRef}
          className='min-h-full space-y-3'>
          <div className='flex items-center gap-3'>
            <Link
              href={'https://www.linkedin.com/in/kaiqueprado/'}
              target='_blank'
            >
              <Image
              src={'https://avatars.githubusercontent.com/kiqprado'}
              alt='Profile Picture of Kaique Prado'
              height={66}
              width={66}
              className='rounded-4xl p-0.5 border border-zinc-300'
            />
            </Link>
            
            <Link
              href={'https://www.linkedin.com/in/kaiqueprado/'}
              target='_blank'
            >
              Let’s build together
            </Link>
          </div>
          <p className='text-justify'>Hey there! I’m a passionate Frontend & Fullstack Developer with a strong focus on creating high-performance, secure, and scalable web applications. Whether it's SPAs, Landing Pages, E-Commerce Stores, or Client-Side Routing, I craft seamless digital experiences with clean, efficient code.

On the backend, I build structured databases in Node.js, ensuring security and reliability through modern auth practices like JWT, Zod, bcrypt, OAuth, and middleware validation. On the frontend, I primarily work with Next.js (React) but also have experience with Vue & Angular, delivering fast, SEO-friendly, and dynamic interfaces.

My styling toolkit includes Tailwind CSS (my go-to), along with Sass and Bootstrap, ensuring pixel-perfect designs with maintainable code.

I believe in collaboration, innovation, and robust solutions—let’s build something amazing together!</p>
          {/*<p>Olá! Sou um Desenvolvedor Frontend & Fullstack apaixonado por criar aplicações web performáticas, seguras e escaláveis. Seja SPAs, Landing Pages, Lojas Virtuais ou Roteamento Client-Side, desenvolvo experiências digitais fluidas com código limpo e eficiente.

No backend, construo bancos de dados estruturados em Node.js, garantindo segurança e confiabilidade com práticas modernas como JWT, Zod, bcrypt, OAuth e validação via middlewares. No frontend, trabalho principalmente com Next.js (React), mas também tenho experiência com Vue e Angular, entregando interfaces rápidas, dinâmicas e otimizadas para SEO.

Minha stack de estilização inclui Tailwind CSS (meu preferido), além de Sass e Bootstrap, assegurando designs precisos com código sustentável.

Acredito em colaboração, inovação e soluções robustas—vamos construir algo incrível juntos!</p> */}
        </div>

        <div 
          ref={userLocationSettingRef}
          className='flex gap-1.5 items-center mb-16'
        >
          <span>Location 📍</span>
          <LocationAndTimeDisplay/>
        </div>    
      </main>
      <Footer/>
    </div>
  )
}
