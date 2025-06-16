'use client'

import { useRef, useEffect, useState } from 'react'

import gsap from 'gsap'
import TextPlugin  from 'gsap'
import lottie, { AnimationItem } from 'lottie-web'
import {AnimatePresence, motion} from 'framer-motion'

import Image from 'next/image'
import Link from 'next/link'

import { Header } from './components/header'
import { Footer } from './components/footer'

import { projects } from './portfolio-data/data'
import { LocationAndTimeDisplay } from './components/location-and-time-display'

gsap.registerPlugin(TextPlugin)

export default function Home() {
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
        text: ''
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
  
  return (
    <div className='h-svh flex flex-col items-center'>
      <Header/>
      <main className='px-3 py-1.5 flex-1 flex flex-col items-center gap-3 overflow-y-auto'>
        <div>
          <h2 className='text-3xl'>Hey...</h2>
          <p className='text-justify'>Down below, you’ll find quick drops of what I’ve been building — just a taste of the projects I’ve been cookin’ up lately.</p>
        </div>
        <div className='flex flex-col items-center gap-3'>
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
          <div>
            <Link 
              href={'#'}
            >
              <span
                ref={projectsTitleCarouselRef}
                className='text-lg tracking-widest'
              >
                {projects[currentProjectTitleIdex].title}
              </span>
            </Link>
          </div>
          <p>Find me on Socials</p>

          <div className='flex items-center'>
            <div className='flex flex-col items-center'>
              <div
                ref={linkedinSocialsContainerRef}
                onMouseEnter={() => linkedinSocialsAnimationIconRef.current?.play()}
                onMouseLeave={() => linkedinSocialsAnimationIconRef.current?.stop()}
                className='w-10 h-10'
              />
              <Link
                href='https://www.linkedin.com/in/kaiqueprado/'
                target='_blank'
                className='px-3 rounded-sm border border-transparent hover:bg-blue-500/30 hover:border hover:border-blue-100/30 transition-all duration-300 ease-in-out'
              >
                LinkedIn
              </Link>
            </div>
            <div className='flex flex-col items-center'>
              <div
                ref={githubSocialsContainerRef}
                onMouseEnter={() => githubSocialsAnimationIconRef.current?.play()}
                onMouseLeave={() => githubSocialsAnimationIconRef.current?.pause()}
                className='w-10 h-10'
              />
              <Link
                href='https://github.com/kiqprado'
                target='_blank'
                className=' px-3 rounded-sm border border-transparent hover:bg-neutral-500/30 hover:border hover:border-neutral-100/30 transition-all duration-300 ease-in-out'
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
        <div className='space-y-3'>
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
          <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloremque, nostrum, quasi molestias corporis voluptatum non sapiente officia hic fugiat maiores amet vel provident officiis, quidem quam ullam unde? Laudantium.
          Consequatur dicta neque explicabo dolorum. Laboriosam et cum, qui aspernatur amet similique fugiat numquam saepe rem est excepturi aut delectus temporibus nihil nesciunt molestias voluptate iste ex. Molestiae, omnis atque.
          Corporis eos, libero quam a debitis corrupti suscipit reiciendis ex neque similique culpa, excepturi voluptatem fuga! Illo, iusto, atque tempora aspernatur libero odit nisi fugit itaque commodi, placeat veritatis voluptates.</p>
          <div className='flex gap-1.5 items-center'>
            <span>Location 📍</span>
            <LocationAndTimeDisplay/>
          </div>
        </div>
          
      </main>
      <Footer/>
    </div>
  )
}
