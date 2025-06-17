import { projects } from '@/app/portfolio-data/data'
import { ProjectClientModel } from './project-client-model'

interface IProjects {
  params: {
    slug: string
  }
}

export default function Projects({ params }: IProjects) {
  const { slug } = params
  const project = projects.find((p) => p.slug === slug)

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const nextIndex = (currentIndex + 1) % projects.length
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length

  const prevProject = projects[prevIndex]
  const nextProject = projects[nextIndex]

  return(
    <ProjectClientModel
      prevProject={prevProject}
      project={project}
      nextProject={nextProject}
    />
  )
}