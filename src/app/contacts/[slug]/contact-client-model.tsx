'use client'

import { IContactsData } from '@/app/portfolio-data/data'

import { useMediaRange } from '@/app/utils/breakpoints-hook'

import { ButtonLink } from '@/app/elements/button-link'
import { NavBarSectionTitle } from '@/app/elements/project-title-navbar'

import { PageNotFound } from '@/app/error/page-not-found'

import Link from 'next/link'

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

interface IContactClientModel {
  prevContact: IContactsData
  contact?: IContactsData
  nextContact: IContactsData
}

export function ContactClientModel({ prevContact, contact, nextContact}: IContactClientModel) {

    //Query's
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')
  
  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG
  const desktopRangeFull = !mobileRangeFull && !tabletRangeFull

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
            className='text-3xl'
          >
            {contact.subtitle}
          </h3>
          <p className={`${desktopRangeFull ? 'px-[10%]' : 'px-6'} text-justify tracking-wider`}>{contact.description}</p>
        </div>
        <div className='absolute bottom-22'>
          {contact.url.map((url, index) => (
            <Link
              key={index}
              href={url}
              target='_blank'
              className='inline-block mx-6'
            >
              {contact.role[index]}
            </Link>
          ))}
        </div>
        
          <Link 
            href={'/'}
            className='absolute bottom-8 text-xl tracking-wider hover:text-sky-500 hover:brightness-200 transition-colors duration-300 ease-in-out'
          >
            /Home
          </Link>
        
      </div>
    </div>
  )
}