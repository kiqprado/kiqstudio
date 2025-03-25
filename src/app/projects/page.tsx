import Link from "next/link";

import projects from '@/portfolio/page'

import { ArrowBigRight } from 'lucide-react'

export default function Projects() {
  return (
    <ul>
      {projects.map((project) => (
        <li
          key={project.id}
        >
          <div className=''>
            <Link 
              href={`/projects/${project.slug}`}
              className='flex items-center gap-1.5'
            >
              <ArrowBigRight/>
              {project.title}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}