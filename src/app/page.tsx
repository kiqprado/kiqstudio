"use client"

import { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import gsap from 'gsap'
import TextPlugin  from 'gsap'
import lottie, { AnimationItem } from 'lottie-web'
import { motion, AnimatePresence} from 'framer-motion'

import { projects, contacts } from '@/portfolio/page'

import { AnimatedUnderLine } from '@/app/animations/animated-under-line'
import { AnimatedGraphicsLines } from '@/app/animations/animated-graphics-lines'

import { Logo } from '@/elements/logo'

import { Footer } from '@/components/footer'
import { LocationTimeDisplay } from '@/components/location-and-time-display'

import { X } from 'lucide-react'

enum MenuItems {
  WORK = 'work',
  Human = 'human',
  Contact = 'contact'
}

export default function Home() {
  gsap.registerPlugin(TextPlugin)

  const headerMenuOptions = useRef(null)
  const projectsMenuOptions = useRef(null)
  const contactsMenuOptions = useRef(null)

  const titleCarouselRef = useRef<HTMLAnchorElement>(null)

  const gitHubIconRef = useRef<HTMLDivElement>(null)
  const animationGitHubRef = useRef<AnimationItem | null>(null)
  const linkedinIconRef = useRef<HTMLDivElement>(null)
  const animationLinkedinRef = useRef<AnimationItem | null>(null)
  

  const [ toggleHeaderMenuModal, setToggleHeaderMenuModal ] = useState(false)
  const [ toggleOptionsProjectMenu, setToggleOptionsProjectMenu ] = useState(false)
  const [ toggleOptionsContactMenu, setToggleOptionsContactMenu ] = useState(false)

  const [ isMouseOnHoverMenuOption, setIsMouseOnHoverMenuOption ] = useState<MenuItems | null>(null)

  const [ currentTitleIndex, setCurrentTitleIndex ] = useState(0)
  const [ imagesOnCardCarousel, setImagesOnCardCarousel ] =  useState(0)
  const currentImageProject = projects[imagesOnCardCarousel]
  const currentImage = currentImageProject.images[0]
 
  function HandleToggleHeaderMenuModal() {
    setToggleHeaderMenuModal((prev) => !prev)
  }

  function HandleToggleOptionsProjectMenu() {
    setToggleOptionsProjectMenu((prev) => !prev)
    setToggleOptionsContactMenu(false)
  }

  function HandleToggleOptionsContactMenu() {
    setToggleOptionsContactMenu((prev) => !prev)
    setToggleOptionsProjectMenu(false)
  }

  useEffect(() => {
    function SetUpInitialMenuStates() {
      gsap.set(headerMenuOptions.current, {
        x: '100%',
        opacity: 0
      })
      gsap.set(projectsMenuOptions.current, {
        y: '-100%',
        opacity: 0
      })
      gsap.set(contactsMenuOptions.current, {
        y: '-100%',
        opacity: 0
      })
    }

    function AnimateHeaderMenu() {
      if(!headerMenuOptions.current) return

      const animation  = toggleHeaderMenuModal ? 
        gsap.to(headerMenuOptions.current, {
          x: '0%',
          opacity: 1,
          duration: 1.1,
          ease: 'power2.inOut'
        })
      : 
        gsap.to(headerMenuOptions.current, {
          x: '100%',
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete: () => {
            setToggleOptionsProjectMenu(false)
            setToggleOptionsContactMenu(false)
          }
        })

      return () => animation.kill()
    }

    SetUpInitialMenuStates()
    const headerCleanUp = AnimateHeaderMenu()

    return () => {
      headerCleanUp?.()
      gsap.killTweensOf(headerMenuOptions.current)
    }

  }, [toggleHeaderMenuModal])

  useEffect(() => {
    function AnimateProjectMenu() {
      if(!projectsMenuOptions || !toggleHeaderMenuModal) return;

      const animation = gsap.timeline({ 
        defaults: { 
          duration: 0.5, 
          ease: 'power2.inOut' 
        } 
      })

      if (toggleHeaderMenuModal) {
        animation.to(projectsMenuOptions.current, { 
          opacity: 1, 
          y: '0' 
        })
        projectsMenuOptions.current?.querySelectorAll('li').forEach((item: string, index: number) => {
          animation.from(item, { 
            opacity: 0, 
            y: '-50%', 
            delay: index * 0.3 
          })
        })
      } else {
        animation.to(projectsMenuOptions.current, { 
          opacity: 0, 
          y: '-100%' 
        });
      }

      return () => animation.kill();
    }

    function AnimateContactMenu() {
      if(!contactsMenuOptions || !toggleHeaderMenuModal) return

      const animation = gsap.timeline({ 
        defaults: {
          duration: 0.5, 
          ease: 'power2.inOut'   
        }
      })

      if(toggleHeaderMenuModal) {
        animation.to(contactsMenuOptions.current, {
          opacity: 1,
          y: '0%'
        })
        contactsMenuOptions.current?.querySelectorAll('li').forEach((item: string, index: number) => {
          animation.from(item, {
            opacity: 0,
            y: '-50%',
            delay: index * 0.3
          })
        })
      } else {
        animation.to(contactsMenuOptions.current, {
          opacity: 0,
          y: '-100%'
        })
      }

      return() => animation.kill()
    }

    const projectCleanUp = AnimateProjectMenu()
    const contactCleanUp = AnimateContactMenu()

    return () => {
      projectCleanUp?.()
      contactCleanUp?.()
      gsap.killTweensOf(projectsMenuOptions.current)
      gsap.killTweensOf(contactsMenuOptions.current)
    }

  }, [toggleHeaderMenuModal, toggleOptionsProjectMenu, toggleOptionsContactMenu])

  useEffect(() => {
    const interval = setInterval(() => {
      setImagesOnCardCarousel(prev => 
      (prev + 1) % projects.length
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function generateARandomIndex() {
      const result: number = Math.floor(Math.random() * projects.length)
      return result
    }

    function changeRandomIndex() {
      let nextIndex: number
      do {
        nextIndex = generateARandomIndex()
      } while (nextIndex === currentTitleIndex)

      setCurrentTitleIndex(nextIndex)
    }

    function animatedTitle() {
      if (titleCarouselRef.current) {
        gsap.fromTo(titleCarouselRef.current, {
          text: '',
        }, {
          text: {
            value: projects[currentTitleIndex].title,
            delimiter: '',
          },
          duration: 2.5,
          ease: 'power1.inOut',
        })
      }
    }

    animatedTitle()

    const interval = setInterval(() => {
      changeRandomIndex()
    }, 3000)

    return () => clearInterval(interval)
  }, [currentTitleIndex])

  useEffect(() => {
    if(gitHubIconRef.current) {
      animationGitHubRef.current = lottie.loadAnimation({
        container: gitHubIconRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/icons8-github.json'
      })
    }

    if(linkedinIconRef.current) {
      animationLinkedinRef.current = lottie.loadAnimation({
        container: linkedinIconRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/icons8-linkedin.json'
      })
    }

    return() => {
      animationGitHubRef.current?.destroy()
      animationLinkedinRef.current?.destroy()
    }

  }, [])

  return (
    <div className='h-screen flex flex-col'>
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <AnimatedGraphicsLines/>
      </div>

      <header 
        className='flex items-center justify-between  overflow-x-clip relative px-6 w-full h-18'
      >
        <Logo/>

        <div className='border-b-1 pl-24 h-8 w-full border-zinc-700 '/>

        <button
          onClick={HandleToggleHeaderMenuModal}
          className="absolute z-30 right-4 px-2 text-zinc-400 hover:text-zinc-200 overflow-hidden group"
        >
          <span 
            className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,_theme(colors.zinc.950)_13%,_theme(colors.zinc.900)_30%,_theme(colors.zinc.800)_55%,_theme(colors.zinc.900)_75%,_theme(colors.zinc.950)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none" 
          />
          { toggleHeaderMenuModal ? (
            <div className="flex items-center gap-1 font-bold text-lg cursor-pointer transition-all duration-500 ease-in-out hover:text-red-500">
              <X/>
              <span>Close</span>
            </div>
          ):(
            <span className="font-bold text-lg cursor-pointer">... Options</span>
          )}
        </button>

      { toggleHeaderMenuModal && (
        <ul ref={headerMenuOptions} className='absolute w-[66%] flex items-center justify-between px-26 ml-66'> 
          <button
            onClick={HandleToggleOptionsProjectMenu}
            onMouseEnter={() => setIsMouseOnHoverMenuOption(MenuItems.WORK)}
            onMouseLeave={() => setIsMouseOnHoverMenuOption(null)}
            className='flex items-center cursor-pointer text-zinc-200 hover:text-zinc-50 relative'
          >
            <span className='text-lg'>[ The Work ]</span>
            <AnimatedUnderLine
              active={isMouseOnHoverMenuOption === MenuItems.WORK}
            />

            <span 
              className='absolute right-[-20] bottom-0 text-xs font-bold text-red-500'
            >
              &#47;&#47;{`${projects.length}`.padStart(2, '0')}
            </span>
          </button>

          <Link
            href={`behind/behind-the-pixel`}
            onMouseEnter={() => setIsMouseOnHoverMenuOption(MenuItems.Human)}
            onMouseLeave={() => setIsMouseOnHoverMenuOption(null)}
            className='flex items-center cursor-pointer text-zinc-200 hover:text-zinc-50 relative'
          >
            <span className='text-lg'>[ Behind the Pixels ]</span>
            <AnimatedUnderLine
              active={isMouseOnHoverMenuOption === MenuItems.Human}
            />

            <span 
              className='absolute right-[-18] bottom-0 text-xs font-bold text-red-500'
            >
              &#47;&#47;01
            </span>
          </Link>

          <button
            onClick={HandleToggleOptionsContactMenu}
            onMouseEnter={() => setIsMouseOnHoverMenuOption(MenuItems.Contact)}
            onMouseLeave={() => setIsMouseOnHoverMenuOption(null)}
            className='flex items-center cursor-pointer text-zinc-200 hover:text-zinc-50 relative'
          > 
            <span className='text-lg'>[ Let’s Talk ]</span>
            <AnimatedUnderLine
              active={isMouseOnHoverMenuOption === MenuItems.Contact}
            />

            <span 
              className='absolute right-[-20] bottom-0 text-xs font-bold text-red-500'
            >
              &#47;&#47;{`${contacts.length}`.padStart(2, '0')}
            </span>
          </button>
        </ul>
      )}

      { toggleOptionsProjectMenu && (
        <ul 
          ref={projectsMenuOptions}
          className='absolute top-14 left-78 z-30'
          style={{ opacity: 0, transform: 'translateY(-200%)'}}
        >
          {projects.map((project) => (
            <li
              key={project.id}
              className='w-66 hover:font-bold rounded-sm text-center'
            >
              <Link
                href={`/projects/${project.slug}`}
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      { toggleOptionsContactMenu && (
        <ul 
          ref={contactsMenuOptions}
          className='absolute top-14 right-48 z-30'
          style={{ opacity: 0, transform: 'translateY(-200%)'}}
        >
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className='w-66 hover:font-bold rounded-sm text-center'
            >
              <Link 
                href={`/contacts/${contact.slug}`}
              >
                {contact.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      </header>

      <div className='flex-1 flex flex-col overflow-y-auto px-8 z-10 pointer-events-none'>

        <div className='h-24'>
          <h2 className='text-3xl tracking-wider'>Hey...</h2>
          <p className='ml-6'>That´s a fresh start to guiding you a ease navigation on this portfolio</p>
        </div>

        <div className='flex-1 flex'>
          <div className='w-[66%] h-full shrink-0 pointer-events-auto'>

            <div className='grid grid-cols-3 grid-rows-2 h-full w-full'>

              <div className='w-full col-start-1 col-span-2 row-start-1 relative flex items-center justify-center overflow-hidden'>
                <AnimatePresence mode='wait'>
                  <motion.img
                    key={currentImageProject.slug}
                    src={currentImage}
                    alt={currentImageProject.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className='absolute object-cover'
                  />
                </AnimatePresence>
              </div>

              <div className='w-full col-start-3 row-start-1 flex flex-col items-center justify-center gap-2'>
                <div
                  ref={linkedinIconRef}
                  onMouseEnter={() => animationLinkedinRef.current?.play()}
                  onMouseLeave={() => animationLinkedinRef.current?.stop()}
                  className='w-12 h-12'
                />

                <Link
                  href='https://www.linkedin.com/in/kaiqueprado/'
                  target='_blank'
                  className='px-3 rounded-sm border border-transparent hover:bg-blue-500/30 hover:border hover:border-blue-100/30 transition-all duration-300 ease-in-out'
                >
                  LinkedIn
                </Link>

                <div
                  ref={gitHubIconRef}
                  onMouseEnter={() => animationGitHubRef.current?.play()}
                  onMouseLeave={() => animationGitHubRef.current?.pause()}
                  className='w-12 h-12'
                /> 

                <Link
                  href='https://github.com/kiqprado'
                  target='_blank'
                  className=' px-3 rounded-sm border border-transparent hover:bg-neutral-500/30 hover:border hover:border-neutral-100/30 transition-all duration-300 ease-in-out'
                >
                  GitHub
                </Link>
              </div>

              <div className='w-full col-start-1 row-start-2 flex items-center justify-center'>
                <span className='tracking-wider text-center'>Some highlights of the current projects</span>
              </div>
            
              <div className='w-full col-start-2 row-start-2 flex justify-center items-center'>
                <Link
                  href={`/projects/${projects[currentTitleIndex].slug}`}
                  className='text-2xl tracking-widest'
                >
                  <span
                    ref={titleCarouselRef}
                  >
                    {projects[currentTitleIndex].title}
                  </span>
                </Link>
              </div>
 
              <div className='w-full col-start-3 row-start-2 flex items-center justify-center'>
                <span className='tracking-wider text-center'>Find me on Socials</span>
              </div>
              
            </div>

          </div>

          <div className='px-6 flex flex-col justify-center gap-1.5 pointer-events-auto'>
            <div className='flex gap-3'>
              <div 
                className='w-fit p-1 border-2 rounded-[50%] border-zinc-700 hover:border-zinc-300 transition-all duration-500 ease-in-out'
              >
                <Link
                  href='https://www.linkedin.com/in/kaiqueprado/'
                  target='_blank'
                >
                  <Image
                    src={'https://avatars.githubusercontent.com/kiqprado'}
                    alt={`Pic profile of user`}
                    width={56}
                    height={56}
                    className='rounded-[50%]'
                  />
                </Link>    
              </div>

              <div className='flex-1 flex border-x-2 border-zinc-700 rounded-2xl transition-all duration-500 ease-in-out hover:border-zinc-300'>
                <button className='m-auto cursor-pointer'>Go in...</button>
              </div>
            </div>
         
            <div className='px-6 py-3 border-x-2 border-zinc-700 rounded-4xl transition-all duration-500 ease-in-out hover:border-zinc-300 text-justify'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem sunt vel quidem corrupti id ducimus earum laudantium laborum praesentium necessitatibus. Iusto, quos incidunt magnam sed delectus voluptate nobis quam labore!
              Exercitationem architecto odit dolore blanditiis provident ad quos vel facere suscipit consequuntur dolorem necessitatibus earum ducimus inventore, maxime mollitia! Excepturi vitae praesentium possimus, dignissimos quidem odio voluptatum vel! Ipsum?
            </div>
            
            <div className='flex gap-3'>
              <div 
                className='flex-1 flex border-x-2 border-zinc-700 rounded-2xl transition-all duration-500 ease-in-out hover:border-zinc-300'
              > 
                <button 
                  className='w-full cursor-pointer hover:text-amber-300'
                >
                  Go on...
                </button>
              </div>
                
              <LocationTimeDisplay/>
            </div>
            
          </div>
          
        </div>

      </div>

      <Footer/>
    </div>
  )
}