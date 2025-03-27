export interface Iprojects {
  id: number
  slug: string
  title: string
  description: string
  images: string[]
}

export interface IContacts {
  id: number
  slug: string
  title: string
  url: string[]
}

const projects: Iprojects[] = [
  {
    id: 0,
    slug: 'planner',
    title: 'Plann.Er',
    description: 'Imagine booking your dream trip as fast as ordering a ride. No endless scrolling. No chaotic tabs. Just a sleek, lightning-fast interface that gets you from wanderlust to departure with minimal effort. Plann.Er is the minimalist travel app designed for those who value time as much as adventure. With an ultra-responsive design, AI-powered smart planning, and a single-screen overview of your entire itinerary, you’re always one tap away from paradise.',
    images: [
      '/PlannEr_1-1.png',
      '/PlannEr_1-1.png',
      '/PlannEr_1-1.png'
    ]
  },
  {
    id: 1,
    slug: 'focus',
    title: 'Focus',
    description: ' Introducing a sophisticated app designed to enhance your study sessions by incorporating the renowned Pomodoro Technique. This intuitive tool helps you to achieve your academic goals with ease. Set customizable timers, track your progress, and enjoy a seamless study experience tailored to your needs. Elevate your learning journey with this essential productivity companion.',
    images: [
      '/Focus_1-1.png',
      '/Focus_1-1.png',
      '/Focus_1-1.png'
    ]
  },
  {
    id: 2,
    slug: 'habits',
    title: 'Habits',
    description: 'Thats more than an app—it’s your partner in achieving daily success. Whether it’s work deadlines, personal goals, or moments of relaxation, FlowTrack helps you organize, prioritize, and thrive. With strategic checkpoints and a user-friendly design, you’ll not only manage your time but also cultivate habits that lead to long-term growth and well-being. Transform the way you approach your day, one task at a time.',
    images: [
      '/Habits_1-1.png',
      '/Habits_1-1.png',
      '/Habits_1-1.png'
    ]
  }
]

const contacts: IContacts[] = [
  {
    id: 0,
    slug: 'funny',
    title: 'Coffee ?',
    url: []
  },
  {
    id: 1,
    slug: 'professional',
    title: 'Contracts ?',
    url: [
      
    ]
  },
  {
    id: 2,
    slug: 'workflow',
    title: 'Collabs ?',
    url: []
  }
]

export {
  contacts,
  projects
}