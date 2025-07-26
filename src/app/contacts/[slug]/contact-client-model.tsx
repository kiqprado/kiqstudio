'use client'

import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'

import { IContactsData } from '@/app/portfolio-data/data'

import { useMediaRange } from '@/app/utils/breakpoints-hook'

import { ButtonLink } from '@/app/elements/button-link'
import { NavBarSectionTitle } from '@/app/elements/project-title-navbar'

import { PageNotFound } from '@/app/error/page-not-found'

import Link from 'next/link'

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { EmailBoxModal } from '@/app/components/email-box-modal'

interface IContactClientModel {
  prevContact: IContactsData
  contact?: IContactsData
  nextContact: IContactsData
}

export function ContactClientModel({ prevContact, contact, nextContact}: IContactClientModel) {
  const contactTitleRef = useRef<HTMLHeadingElement>(null)
  const descriptionContactRef = useRef<HTMLParagraphElement>(null)
  const linksContactRef = useRef<HTMLDivElement>(null)

  const [ contactEmailBoxModal, setContactEmailBoxModal ] = useState(false)

    //Query's
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')
  
  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG
  const desktopRangeFull = !mobileRangeFull && !tabletRangeFull

  function HandleContactEmailBoxModal() {
    setContactEmailBoxModal(prev => !prev)
  }

  useEffect(() => {
    const timeLine = gsap.timeline()

    if(contactTitleRef.current) {
      timeLine.fromTo(contactTitleRef.current, {
        opacity: 0,
        y: -50
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      })
    }

    if(descriptionContactRef.current) {
      timeLine.fromTo(descriptionContactRef.current, {
        opacity: 0,
        text: ' '
      }, {
        opacity: 1,
        text: { value: contact.description},
        duration: 3.5,
        ease: 'power2.inOut'
      },
        '+=0.5'
      )
    }

    if(linksContactRef.current) {
      timeLine.fromTo(linksContactRef.current, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.5,
        ease: 'power3.inOut'
      },
        '+=0.2'
      )
    }
  }, [])

  if(!contact) {
    return (
      <PageNotFound>
        Contact unavailable
      </PageNotFound>
    )
  }

  return (
    <div className='h-svh flex'>
      <div 
        className={`w-full max-w-4xl fixed ${mobileRangeFull ? 'top-3' : 'top-5'} left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-3 px-3`}>
        <ButtonLink 
          href={`/contacts/${prevContact.slug}`}
        >
          <ArrowBigLeft/>
          <span className={ mobileRangeFull ? 'hidden' : ''}>Previous</span>
        </ButtonLink>
        <NavBarSectionTitle>{contact.slug}</NavBarSectionTitle>
        <ButtonLink 
          href={`/contacts/${nextContact.slug}`}
        >
          <span className={ mobileRangeFull ? 'hidden' : ''}>Next</span>
          <ArrowBigRight/>
        </ButtonLink>
      </div>

      <div
        className={`m-auto flex flex-col items-center ${desktopRangeFull ? 'max-w-[80%]' : ''}`}
      >
        <div className={`flex flex-col items-center gap-7`}>
          <h3
            ref={contactTitleRef}
            className='text-3xl'
          >
            {contact?.subtitle}
          </h3>
          <p 
            ref={descriptionContactRef}
            className={`${desktopRangeFull ? 'px-[10%] min-h-36' : 'px-6 min-h-22'} text-justify tracking-wider`}
          >
            {contact.description}
          </p>
        </div>
        <div 
          ref={linksContactRef}
          className={`absolute bottom-36`}
        >
          {contact.url.map((url, index) =>
            contact.role[index] === 'Email' ? (
              <button
                key={index}
                onClick={HandleContactEmailBoxModal}
                className='mx-6 cursor-pointer'
              >
                {contact.role[index]}
              </button>
            ) : (
              <Link
                key={index}
                href={url}
                target='_blank'
                className='inline-block mx-6'
              >
                {contact.role[index]}
              </Link>
            )
          )}
        </div>
        {contactEmailBoxModal && (
          <EmailBoxModal
            HandleToggleEmailModalBoxContact={HandleContactEmailBoxModal}
          />
        )}
        
        <Link 
          href={'/'}
          className='absolute bottom-8 text-xl tracking-wider 
            hover:text-sky-500 hover:brightness-200 transition-colors duration-300 ease-in-out'
        >
          /Home
        </Link>
        
      </div>
    </div>
  )
}