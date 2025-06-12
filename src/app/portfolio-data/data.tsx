export interface Iprojects {
  id: number
  slug: string
  title: string
  description: string
  images: string[]
  images_captions: string[]
}

export interface IContacts {
  id: number
  slug: string
  title: string
  subtitle: string
  description: string
  role: string[]
  url: string[]
}

const projects: Iprojects[] = [
  {
    id: 0,
    slug: 'planner',
    title: 'Plann.Er',
    description: 'Imagine booking your dream trip as fast as ordering a ride. No endless scrolling. No chaotic tabs. Just a sleek, lightning-fast interface that gets you from wanderlust to departure with minimal effort. Plann.Er is the minimalist travel app designed for those who value time as much as adventure. With an ultra-responsive design, AI-powered smart planning, and a single-screen overview of your entire itinerary, you’re always one tap away from paradise.',
    images: [
      '/projects/PlannEr_1-1.png',
      '/projects/PlannEr_1-1.png',
      '/projects/PlannEr_1-1.png'
    ],
    images_captions: [
      'This image introduces you to a very first page of the project',
      'Want to see? click it!',
      'Ayo, squad! This project was born from a minor glitch that keeps messin’ with our daily vibe. Time to level up and maximize our grind?'
    ]
  },
  {
    id: 1,
    slug: 'focus',
    title: 'Focus',
    description: ' Introducing a sophisticated app designed to enhance your study sessions by incorporating the renowned Pomodoro Technique. This intuitive tool helps you to achieve your academic goals with ease. Set customizable timers, track your progress, and enjoy a seamless study experience tailored to your needs. Elevate your learning journey with this essential productivity companion.',
    images: [
      '/projects/Focus_1-1.png',
      '/projects/Focus_1-1.png',
      '/projects/Focus_1-1.png'
    ],
    images_captions: [
      'This image introduces you to a very first page of the project',
      'Want to see? click it!',
      'Ayo, squad! This project was born from a minor glitch that keeps messin’ with our daily vibe. Time to level up and maximize our grind?'
    ]
  },
  {
    id: 2,
    slug: 'habits',
    title: 'Habits',
    description: 'Thats more than an app—it’s your partner in achieving daily success. Whether it’s work deadlines, personal goals, or moments of relaxation, FlowTrack helps you organize, prioritize, and thrive. With strategic checkpoints and a user-friendly design, you’ll not only manage your time but also cultivate habits that lead to long-term growth and well-being. Transform the way you approach your day, one task at a time.',
    images: [
      '/projects/Habits_1-1.png',
      '/projects/Habits_1-1.png',
      '/projects/Habits_1-1.png'
    ],
    images_captions: [
      'This image introduces you to a very first page of the project',
      'Want to see? click it!',
      'Ayo, squad! This project was born from a minor glitch that keeps messin’ with our daily vibe. Time to level up and maximize our grind?'
    ]
  }
]

const contacts: IContacts[] = [
  {
    id: 0,
    slug: 'funny',
    title: 'Coffee ?',
    subtitle: 'I’m Fun’ Way',
    description: 'Hey there! What’s up? First off, awesome to have you here! Let’s chat about your idea—but real quick, have you checked out my projects yet? Click here to take a peek. It’s super quick and worth it! I’ll catch you back here in a sec.',
    role: [
      'Discord',
      'Instagram'
    ],
    url: [
      '404',
      'https://www.instagram.com/kiqprado/'
    ]
  },
  {
    id: 1,
    slug: 'professional',
    title: 'Contracts ?',
    subtitle: 'Professional Way',
    description: 'Hello! Now that you’ve likely browsed through my projects section, let’s talk about your needs. If you haven’t had a chance to explore my work yet, click here to learn more. Below, you’ll find links to my professional channels.',
    role: [
      'Email',
      'LinkedIn'
    ],
    url: [
      'Send me a message',
      'https://www.linkedin.com/in/kaiqueprado/'
    ]
  },
  {
    id: 2,
    slug: 'workflow',
    title: 'Collabs ?',
    subtitle: 'Ancient Ritual',
    description: 'Hey! Let’s kick things off by talking about what brings you here. Below, you’ll find quick links to reach out—so we can start this collab on the right foot. I’m just one click away!',
    role: [
      'Email',
      'Discord'
    ],
    url: [
      'Send me a message',
      '404'
    ]
  }
]

export {
  projects,
  contacts
}