'use client'

import { IContacts } from '@/app/portfolio-data/data'

import { useMediaRange } from '@/app/utils/breakpoints-hook'

import { ButtonLink } from '@/app/elements/button-link'
import { NavBarSectionTitle } from '@/app/elements/project-title-navbar'

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

interface IContactClientModel {
  prevContact: IContacts
  contact?: IContacts
  nextContact: IContacts
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

  if(!contact) {
    return (
      <div className='fixed inset-0 bg-zinc-950/50 flex'>
        <div className='m-auto px-6 py-3 flex items-center justify-center'>
          <span className='font-medium text-xl'>Contact unavailable</span>
        </div>
      </div>
    )
  }

  return (
    <div>
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
    </div>
  )
}