import { contacts } from "@/portfolio/page"
import ContactClient from "./contact-client"

interface IContactPage {
  params: {
    slug: string
  }
}

export default function ContactPage({ params } : IContactPage) {
  const { slug } = params
  const contact = contacts.find((c) => c.slug === slug)

  const currentIndex = contacts.findIndex((c) => c.slug === slug)
  const prevIndex = (currentIndex - 1 + contacts.length) % contacts.length
  const nextIndex = (currentIndex + 1) % contacts.length

  const prevContact = contacts[prevIndex]
  const nextContact = contacts[nextIndex]

  return(
    <ContactClient
      prevContact={prevContact}
      contact={contact}
      nextContact={nextContact}
    />
  )
}