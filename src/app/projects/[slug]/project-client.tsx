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

  

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
  
    // ANIMAÇÕES INICIAIS
    function setupInitialAnimations() {
      gsap.set(projectNavRef.current, {
        opacity: 0,
        y: -100
      })
  
      gsap.to(projectNavRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.25,
        ease: 'power3.out'
      })

      if (descriptionTextRef.current) {
        gsap.fromTo(descriptionTextRef.current, {
          text: ' '
        }, {
          text: { value: project.description },
          duration: 11,
          delay: 0.7,
          ease: 'none'
        });
      }
    }
  
    // ANIMAÇÕES DA GALERIA
    function setupGalleryAnimations() {
      const imageContainers = gsap.utils.toArray('.image-container') as HTMLElement[];
      
      imageContainers.forEach((container, index) => {
        const image = container.querySelector('img');
  
        gsap.set(container, {
          opacity: 0,
          y: 50,
          rotation: index % 2 === 0 ? -5 : 5,
          scale: 0.9
        });
        
        gsap.set(image, { 
          scale: 1.1,
          filter: 'brightness(1.2) contrast(0.8)'
        });
  
        // Timeline principal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
  
        tl.to(container, {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
          delay: index * 0.1
        })
        .to(image, {
          scale: 1,
          duration: 1.2,
          ease: 'power2.out'
        }, '-=0.5')
        .to(image, {
          filter: 'brightness(1) contrast(1)',
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.8');
  
        // Efeito parallax
        gsap.to(image, {
          y: index % 2 === 0 ? -50 : 30,
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: "bottom top",
            scrub: 1
          }
        });
  
        setupImageHoverEffects(container, image);
      });
    }
  
    // INTERAÇÕES DE HOVER
    function setupImageHoverEffects(container: HTMLElement, image: HTMLImageElement | null) {
      if (!image) return;
  
      container.addEventListener('mouseenter', () => {
        gsap.to(image, {
          scale: 1.03,
          duration: 0.3
        });
      });
      
      container.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.3
        });
      });
    }
  
    // SCROLL TRIGGERS GLOBAIS
    function setupGlobalScrollTriggers() {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, {
              scaleX: self.progress
            });
          }
        }
      });
  
      setupFooterAnimation();
    }
  
    // ANIMAÇÃO DO FOOTER
    function setupFooterAnimation() {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 3}px`,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          if (projectNavRef.current && !isTransitioning) {
            gsap.to(projectNavRef.current, {
              y: -100,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          }
        },
        onLeaveBack: () => {
          if (projectNavRef.current && !isTransitioning) {
            gsap.to(projectNavRef.current, {
              y: 0,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          }
        },
        onUpdate: (self) => {
          handleFooterProgress(self);
        }
      });
    }
  
    // CONTROLE DE PROGRESSO DO FOOTER
    function handleFooterProgress(self: ScrollTrigger) {
      if (nextProjectProgressBarRef.current && shouldUpdateBarProgress) {
        gsap.set(nextProjectProgressBarRef.current, {
          scaleX: self.progress,
        });
      }
  
      if (self.progress >= 1 && !isTransitioning) {
        setShouldUpdateBarProgress(false);
        setIsTransitioning(true);
        animateNextProjectTransition();
      }
    }
  
    // TRANSIÇÃO PARA O PRÓXIMO PROJETO
    function animateNextProjectTransition() {
      const theTimeLine = gsap.timeline();
  
      theTimeLine.set(nextProjectProgressBarRef.current, {
        scaleX: 1
      });
  
      theTimeLine.to(
        [
          footerRef.current?.querySelector("#next-project-title-footer"),
          footerRef.current?.querySelector("#next-project-progress-bar-footer")
        ],
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        }
      );
  
      theTimeLine.call(() => {
        window.location.href = `/projects/${nextProject.slug}`;
      });
    }
  
    // LIMPEZA
    function cleanupAnimations() {
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  
    setupInitialAnimations();
    setupGalleryAnimations();
    setupGlobalScrollTriggers();
  
    return cleanupAnimations();
  
  }, [nextProject.slug, isTransitioning, shouldUpdateBarProgress, project?.description]);

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
            className="image-container overflow-hidden rounded-xl will-change-transform"
          >
            <Image 
              src={image} 
              alt={`Image of ${project.title}`}
              width={1000}
              height={500}
              className="w-full h-auto object-cover rounded-lg shadow-2xl cursor-pointer"
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