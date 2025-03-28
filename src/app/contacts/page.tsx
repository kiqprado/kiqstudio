import Link from "next/link";

import { contacts } from "@/portfolio/page";

export default function Contacts() {
  return (
    <div className='h-screen flex'>
      <ul className='m-auto'>
        <span className=''>Pick One</span>
        {contacts.map((contact) => (
          <li
            key={contact.id}
          >
            <Link
              href={`/contacts/${contact.slug}`}
            >
              {contact.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}