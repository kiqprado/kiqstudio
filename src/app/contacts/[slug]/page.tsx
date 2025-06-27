import { contacts } from '@/app/portfolio-data/data'
import { ContactClientModel } from './contact-client-model'

interface IContacts {
  params: {
    slug: string
  }
}

export default function Contacts({ params }: IContacts) {
  const { slug } =  params
  const contact = contacts.find((c) => c.slug === slug)

  const currentIndex = contacts.findIndex((c) => c.slug === slug)
  const prevIndex = (currentIndex - 1 + contacts.length) % contacts.length
  const nextIndex = (currentIndex + 1) % contacts.length

  const prevContact = contacts[prevIndex]
  const nextContact = contacts[nextIndex]
  return(
    <ContactClientModel
      prevContact={prevContact}
      contact={contact}
      nextContact={nextContact}
    />
  )
}