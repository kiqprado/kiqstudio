import { projects } from '@/portfolio/page'

import ProjectClient from './project-client'

interface IProjectPage {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params } : IProjectPage) {
  const { slug } = params
  const project = projects.find((p) => p.slug === slug)

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const nextIndex = ( currentIndex + 1) % projects.length
  const prevIndex = ( currentIndex - 1 + projects.length) % projects.length

  const prevProject = projects[prevIndex]
  const nextProject = projects[nextIndex]

  return (
    <ProjectClient
      prevProject={prevProject}
      project={project}
      nextProject={nextProject}
    />
  )
}