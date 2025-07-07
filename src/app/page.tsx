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

import { Button } from './elements/button'
import { ButtonIcon } from './elements/button-icon'

import { ChevronsDown, ArrowDown } from 'lucide-react'

gsap.registerPlugin(TextPlugin, ScrollTrigger)

export default function Home() {
  // SCROLL REVEAL REF
  const mainContainerRef = useRef(null)
  const introMainDescriptionSectionRef = useRef<HTMLDivElement>(null)
  const projectPresentationDetailsRef = useRef<HTMLDivElement>(null)
  const socialsMediaConnectionsRef = useRef<HTMLDivElement>(null)
  const shortSelfPresentationRef = useRef<HTMLDivElement>(null)

  //SHORT PORTFOLIO PRESENTATION
  const titlePresentationRef = useRef(null)
  const descriptionPresentationRef = useRef(null)
  const buttonContainerPresentationRef = useRef<HTMLDivElement>(null)
  // SECOND SECTION
  // PROJECTS IMAGES CARDS
  const projectImageCard = useRef(null)
  const [ currentImagesOnCarouselIndex, setCurrentImagesOnCarouselIndex ] = useState(0)
  const currentImageProjectTemplate = projects[currentImagesOnCarouselIndex]
  const ImageTemplate = currentImageProjectTemplate.images[0]
  // PROJECTS P refs
  const shortParagraphFromImagesCarouselHighLightsRef = useRef<HTMLParagraphElement>(null)
  const shortSpanFromTitleProjectsCarouselRef = useRef<HTMLSpanElement>(null)
  // PROJECTS TITLE
  const [ projectTitleHasRevealed, setProjectTitleHasRevealed ] = useState(false)
  const projectsTitleCarouselRef = useRef<HTMLAnchorElement>(null)
  const [ currentProjectTitleIdex, setCurrentProjectTitleIndex ] = useState(0)
  // THIRD SECTION
  // SOCIALS LINK HEADER ON PRESENTATION
  const profileSectionLinksFromCollabsRef = useRef<HTMLDivElement>(null)
  const profileShortDescriptionRef = useRef<HTMLParagraphElement>(null)
  // ICONS SOCIALS LINKS
  const linkedinSocialsContainerRef = useRef<HTMLDivElement>(null)
  const linkedinSocialsAnimationIconRef = useRef<AnimationItem | null>(null)
  const githubSocialsContainerRef = useRef<HTMLDivElement>(null)
  const githubSocialsAnimationIconRef = useRef<AnimationItem | null>(null)
  const discordSocialsContainerRef = useRef<HTMLDivElement>(null)
  const discordSocialsAnimationIconRef = useRef<AnimationItem | null>(null)
  const mailSocialsContainerRef = useRef<HTMLDivElement>(null)
  const mailsSocialsAnimationIconRef = useRef<AnimationItem | null>(null)

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

  function HandleScrollToShortSelfPresentationView() {
    shortSelfPresentationRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
  //ANIMATIONS FIRST SECTION VH
  // ANIMATIONS PORTFOLIO SHORT PRESENTATION
  useEffect(() => {
    const timeLine = gsap.timeline()

    if(titlePresentationRef.current) {
      timeLine.fromTo(titlePresentationRef.current, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
      },
        0.3
      )
    }

    if(descriptionPresentationRef.current) {
      timeLine.fromTo(descriptionPresentationRef.current, {
        text: ' ',
        opacity: 0
      }, {
        text: { value: introDescriptionParagraph },
        opacity: 1,
        duration: 2,
        ease: 'power1.inOut'
      },
        '>-0.8'
      )
    }

    if(buttonContainerPresentationRef.current) {
      timeLine.fromTo(buttonContainerPresentationRef.current, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
      },
        '+=1'
      )
    }
  }, [])
  //ANIMATIONS SECOND SECTION VH
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            const timeLine = gsap.timeline()

            if(projectImageCard.current) {
              timeLine.fromTo(projectImageCard.current, {
                opacity: 0,
                y: 40
              }, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.inOut'
              },
                0
              )
            }

            if(shortParagraphFromImagesCarouselHighLightsRef.current) {
              timeLine.fromTo(shortParagraphFromImagesCarouselHighLightsRef.current, {
                opacity: 0
              }, {
                opacity: 1,
                duration: 1.2,
                ease: 'power2.inOut'
              },
                '+=0.5'
              )
            }

            if(shortSpanFromTitleProjectsCarouselRef.current) {
              timeLine.fromTo(shortSpanFromTitleProjectsCarouselRef.current, {
                opacity: 0
              }, {
                opacity: 1,
                duration: 1.2,
                ease: 'power1.inOut'
              },
                '+=0.5'
              )
            }

            if (projectsTitleCarouselRef.current) {
              timeLine.fromTo(projectsTitleCarouselRef.current, 
              {
                opacity: 0,
                y: 10,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out',
              },
              '+=0.5'
            )
            }
            observer.unobserve(entry.target)

            setProjectTitleHasRevealed(true)
          }
        })
      },
      {
        threshold: 0.3
      }
    )

    if(projectPresentationDetailsRef.current) {
      observer.observe(projectPresentationDetailsRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])
  // ANIMATIONS CAROUSEL IMAGES
  useEffect(() => {
    let imageInterval: NodeJS.Timeout

    function StartImagesProjectTemplateCarousel() {
      imageInterval = setInterval(() => {
        setCurrentImagesOnCarouselIndex(prev => (prev + 1) % projects.length)
      }, 7000)
    }

    StartImagesProjectTemplateCarousel()

    return () => {
      clearInterval(imageInterval)
    }
  }, [])
  // ANIMATIONS CAROUSEL TITLES PROJECTS
  useEffect(() => {
    if(!projectTitleHasRevealed) return

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
        text: ' ',
      }, {
        text: {
          value: projects[currentProjectTitleIdex].title,
          delimiter: '',
        },
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
  }, [currentProjectTitleIdex, projectTitleHasRevealed])
  //ANIMATIONS THIRD SECTION VH
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            const timeLine = gsap.timeline()

            if(profileSectionLinksFromCollabsRef.current) {
              timeLine.fromTo(profileSectionLinksFromCollabsRef.current, {
                opacity: 0,
                x: 90
              }, {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power1.inOut'
              })
            }

            if(profileShortDescriptionRef.current) {
              timeLine.fromTo(profileShortDescriptionRef.current, {
                text: ' ',
                opacity: 0
              }, {
                text: {
                  value: selfShortPresentationDescriptionParagraph
                },
                opacity: 1,
                duration: 3.5,
                ease: 'power1.inOut'
              },
                '+=0.5'
              )
            }

            observer.unobserve(entry.target)
          }
        })
      }, {
        threshold: 0.3
      }
    )

    if(shortSelfPresentationRef.current) {
      observer.observe(shortSelfPresentationRef.current)
    }

    return() => {
      observer.disconnect()
    }
  }, [])

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

    if(discordSocialsContainerRef.current) {
      discordSocialsAnimationIconRef.current = lottie.loadAnimation({
        container: discordSocialsContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/icons8-discord.json'
      })
    }

    if(mailSocialsContainerRef.current) {
      mailsSocialsAnimationIconRef.current = lottie.loadAnimation({
        container: mailSocialsContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/mail-icon.json'
      })
    }

    return() => {
      linkedinSocialsAnimationIconRef.current?.destroy()
      githubSocialsAnimationIconRef.current?.destroy()
      discordSocialsAnimationIconRef.current?.destroy()
      mailsSocialsAnimationIconRef.current?.destroy()
    }
  }, [])

    // DATA TEXTS CONST´S
    const introDescriptionParagraph: string = 'Down below, you’ll find quick drops of what I’ve been building — just a taste of the projects I’ve been cookin’ up lately.'
    const selfShortPresentationDescriptionParagraph: string = `Hey there! I’m a passionate Frontend & Fullstack Developer with a strong focus on creating high-performance, secure, and scalable web applications. Whether it's SPAs, Landing Pages, E-Commerce Stores, or Client-Side Routing, I craft seamless digital experiences with clean, efficient code.

On the backend, I build structured databases in Node.js, ensuring security and reliability through modern auth practices like JWT, Zod, bcrypt, OAuth, and middleware validation. On the frontend, I primarily work with Next.js (React) but also have experience with Vue & Angular, delivering fast, SEO-friendly, and dynamic interfaces.

My styling toolkit includes Tailwind CSS (my go-to), along with Sass and Bootstrap, ensuring pixel-perfect designs with maintainable code.

I believe in collaboration, innovation, and robust solutions—let’s build something amazing together!`
  
  return (
    <div className='h-svh flex flex-col items-center'>
      <Header/>
      <main 
        ref={mainContainerRef}
        className={`flex-1 ${mobileRangeFull || tabletRangeFull ? 'px-3': 'px-9'} flex flex-col items-center gap-5 overflow-y-auto`}
      >
        <div 
          ref={introMainDescriptionSectionRef}
          className='min-h-full w-full relative flex flex-col gap-6 justify-center'>
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
            {introDescriptionParagraph}
          </p>

          <div 
            ref={buttonContainerPresentationRef}
            className='absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center'
          >
            <Button
              onClick={HandleScrollToProjectsView}
              size='fit'
            >
              <span 
                className={`${mobileRangeFull || tabletRangeFull ? 'text-lg' : 'text-md'} whitespace-nowrap`}
              >
                Come to see it
              </span> 
              <ChevronsDown 
                className={`${mobileRangeFull || tabletRangeFull ? 'size-6' : 'size-5'}`}
              />  
            </Button>
          </div>
        </div>

        <div 
          ref={projectPresentationDetailsRef}
          className={`py-3 flex flex-col items-center space-y-12 text-center 
            ${mobileRangeFull || tabletRangeFull ? 'min-h-full' : ''} relative`}
        >
          <div
            ref={projectImageCard}
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
          </div>
          <p 
            ref={shortParagraphFromImagesCarouselHighLightsRef}
            className={`tracking-widest ${mobileRangeFull || tabletRangeFull ? 'text-lg' : 'text-md'}`}
          >
            Some highlights of the current projects
          </p>
          <span
            ref={shortSpanFromTitleProjectsCarouselRef}
            className={`flex flex-col items-center justify-center gap-3 tracking-widest 
              ${mobileRangeFull || tabletRangeFull ? 'text-lg' : 'text-md'}`}
          >
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
                className='text-3xl tracking-widest'
              >
                {projects[currentProjectTitleIdex].title}
              </span>
            </Link>
          </div>
          
          <div className='absolute bottom-3.5 right-1.5'>
            <ButtonIcon
              onClick={HandleScrollToShortSelfPresentationView}
            >
              <ChevronsDown className='size-7'/>
            </ButtonIcon>
          </div>
          
        </div>

        <div
          ref={shortSelfPresentationRef}
          className='min-h-full space-y-3 py-5'
        >
          <div
            ref={profileSectionLinksFromCollabsRef}
            className='flex items-center gap-5'
          >
            <Link
              href={'https://www.linkedin.com/in/kaiqueprado/'}
              target='_blank'
            >
              <Image
              src={'https://avatars.githubusercontent.com/kiqprado'}
              alt='Profile Picture of Kaique Prado'
              height={66}
              width={66}
              className='rounded-4xl p-0.5 border border-zinc-300 hover:border-zinc-50 transition-colors duration-300 ease-in-out'
            />
            </Link>
            
            <Link
              href={'https://www.linkedin.com/in/kaiqueprado/'}
              target='_blank'
              className={`${mobileRangeFull || tabletRangeFull ? 'text-lg tracking-wider' : 'text-md'}`}
            >
              Let’s build together
            </Link>
          </div>
          <p
            ref={profileShortDescriptionRef}
            className='text-justify'
          >
            {selfShortPresentationDescriptionParagraph}
          </p>
          {/*<p>Olá! Sou um Desenvolvedor Frontend & Fullstack apaixonado por criar aplicações web performáticas, seguras e escaláveis. Seja SPAs, Landing Pages, Lojas Virtuais ou Roteamento Client-Side, desenvolvo experiências digitais fluidas com código limpo e eficiente.

No backend, construo bancos de dados estruturados em Node.js, garantindo segurança e confiabilidade com práticas modernas como JWT, Zod, bcrypt, OAuth e validação via middlewares. No frontend, trabalho principalmente com Next.js (React), mas também tenho experiência com Vue e Angular, entregando interfaces rápidas, dinâmicas e otimizadas para SEO.

Minha stack de estilização inclui Tailwind CSS (meu preferido), além de Sass e Bootstrap, assegurando designs precisos com código sustentável.

Acredito em colaboração, inovação e soluções robustas—vamos construir algo incrível juntos!</p> */}
        </div>
        
        <div 
          ref={socialsMediaConnectionsRef}
          className='flex flex-col items-center gap-3 mb-9'
        >
          <span
            className={`${mobileRangeFull ? 'text-xl' : 'text-md'}`}
          >
            Find me on Socials
          </span>
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
            <div className='flex flex-col items-center'>
                <div
                  ref={discordSocialsContainerRef}
                  onMouseEnter={() => discordSocialsAnimationIconRef.current?.play()}
                  onMouseLeave={() => discordSocialsAnimationIconRef.current?.pause()}
                  className='w-11 h-11'
                />
                <Link
                  href='https://discord.com/users/1105146206348398642'
                  target='_blank'
                  className='px-3 text-lg rounded-sm border border-transparent hover:bg-violet-500/30 hover:border hover:border-violet-100/30 transition-all duration-300 ease-in-out'
                >
                  Discord
                </Link>
            </div>
            <div className='flex flex-col items-center'>
                <div
                  ref={mailSocialsContainerRef}
                  onMouseEnter={() => mailsSocialsAnimationIconRef.current?.play()}
                  onMouseLeave={() => mailsSocialsAnimationIconRef.current?.stop()}
                  className='w-22 h-22 flex overflow-hidden scale-[1.4] -m-[22px] pointer-events-auto'
                />
                <Link
                  href='https://discord.com/users/1105146206348398642'
                  target='_blank'
                  className='px-3 text-lg rounded-sm border border-transparent hover:bg-gray-500/30 hover:border hover:border-gray-100/30 transition-all duration-300 ease-in-out z-10'
                >
                  Email
                </Link>
            </div>
          </div>
        </div>    
      </main>
      {!(mobileRangeFull || tabletRangeFull) && (
        <Footer/> 
      )} 
    </div>
  )
}
