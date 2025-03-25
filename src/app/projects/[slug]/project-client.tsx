import Link from "next/link"
import Image from "next/image"

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

import { Iprojects } from '@/portfolio/page'

interface IProjectClient {
  prevProject: Iprojects
  project?: Iprojects
  nextProject: Iprojects
}

export default function ProjectClient({ prevProject, project, nextProject}: IProjectClient) {

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
    <div className='flex flex-col items-center'>
      <div className='flex items-center gap-6'>
          <Link 
            href={`/projects/${prevProject.slug}`}
            className='w-fit flex items-center gap-1.5 border rounded-xl border-zinc-300 hover:border-zinc-200 hover:text-zinc-200 px-3 py-1.5'
          >
            <ArrowBigLeft className='size-5'/>
            Previous
          </Link>

        <div>
          <p className='font-medium text-lg'>{project.title}</p>
          <div></div>
        </div>

          <Link 
            href={`/projects/${nextProject.slug}`}
            className='w-fit flex items-center gap-1.5 border rounded-xl border-zinc-300 hover:border-zinc-200 hover:text-zinc-200 px-3 py-1.5'
          >
            <ArrowBigRight className='size-5'/>
            Next
          </Link>
      </div>

      <div className='flex flex-col gap-6 items-center'>
        <h1>{project.title}</h1>
        <p className='text-justify'>{project.description}</p>
      </div>

      <div className='flex flex-col gap-8'>
        {project.images && project.images.map((image, index) => (
          <div
            key={index}
          >
            <Image 
              src={image} 
              alt={`Image of ${project.title}`}
              width={1000}
              height={500}
            />
          </div>
        ))}
      </div>

      <div>
        <h2>{nextProject.title}</h2>
        <div>
          <p>Next Project</p>
        </div>

        <div>
          <div></div>
        </div>
      </div>
    </div>
  )
}