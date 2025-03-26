import Link from "next/link";

import projects from '@/portfolio/page'

import { ArrowBigRight } from 'lucide-react'

export default function Projects() {
  return (
    <div className='h-screen w-full relative flex'>
      <ul className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
        {projects.map((project) => (
          <li key={project.id}>
            <Link 
              href={`/projects/${project.slug}`}
              className='flex items-center gap-1.5'
            >
              <ArrowBigRight/>
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}