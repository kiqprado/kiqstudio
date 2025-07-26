export interface IProjectsData {
  id: number
  slug: string
  title: string
  description: string
  images: string[]
  images_captions: string[]
}

export interface IContactsData {
  id: number
  slug: string
  title: string
  subtitle: string
  description: string
  role: string[]
  url: string[]
}

const projects: IProjectsData[] = [
  {
    id: 0,
    slug: 'planner',
    title: 'Plann.Er',
    description: 'Imagine booking your dream trip as fast as ordering a ride. No endless scrolling. No chaotic tabs. Just a sleek, lightning-fast interface that gets you from wanderlust to departure with minimal effort. Plann.Er is the minimalist travel app designed for those who value time as much as adventure. With an ultra-responsive design, AI-powered smart planning, and a single-screen overview of your entire itinerary, you’re always one tap away from paradise.',
    images: [
      '/projects/PlannEr_1-1.png',
      '/projects/PlannEr_1-2.png',
      '/projects/PlannEr_1-3.png'
    ],
    images_captions: [
      'Travel smart, travel fast.',
      'Your next adventure? Minimal effort, maximum adventure.',
      'Tag your travel squad with just an email—no hassle, no spam, just smooth updates. They’ll get all the deets (flights, stays, even that secret sunset spot) without lifting a finger. Easy-peasy, group-trip breezy!'
    ]
  },
  {
    id: 1,
    slug: 'focus',
    title: 'Focus',
    description: ' Introducing a sophisticated app designed to enhance your study sessions by incorporating the renowned Pomodoro Technique. This intuitive tool helps you to achieve your academic goals with ease. Set customizable timers, track your progress, and enjoy a seamless study experience tailored to your needs. Elevate your learning journey with this essential productivity companion.',
    images: [
      '/projects/Focus_1-1.png',
      '/projects/Focus_1-2.png',
      '/projects/Focus_1-3.png'
    ],
    images_captions: [
      'The timer that turns ‘I’ll do it later’ into ‘Done.',
      'Sprint. Rest. Conquer. Repeat. Your secret weapon for crushing goals.',
      'Crush procrastination! This Pomodoro app = your focus weapon. Study smart, track progress, achieve more. Your future self says thanks.'
    ]
  },
  {
    id: 2,
    slug: 'habits',
    title: 'Habits',
    description: 'Thats more than an app—it’s your partner in achieving daily success. Whether it’s work deadlines, personal goals, or moments of relaxation, FlowTrack helps you organize, prioritize, and thrive. With strategic checkpoints and a user-friendly design, you’ll not only manage your time but also cultivate habits that lead to long-term growth and well-being. Transform the way you approach your day, one task at a time.',
    images: [
      '/projects/Habits_1-1.png',
      '/projects/Habits_1-2.png',
      '/projects/Habits_1-3.png'
    ],
    images_captions: [
      'Own your day. Achieve more. FlowTrack.',
      'Your flow, your way. Simple. Personal. Powerful.',
      'No rigid systems. Just intuitive design that bends to your habits, not the opposite.'
    ]
  },
  {
    id: 3,
    slug: 'neatly',
    title: 'Neatly',
    description: 'Tired of messy, chaotic shopping lists? Meet your personal grocery organizer bot. Simply send your jumbled list—via WhatsApp, Telegram, Discord, or our website—and watch it magically sort items into perfect categories: produce, dairy, pantry, and more. No effort, no stress. Just a smarter way to shop. Save time, skip the aisle-hopping frustration, and never forget an item again. Try it now—your future organized self will thank you!',
    images: [
      '/projects/Neatly_1-1.png',
      '/projects/Neatly_1-2.png',
      '/projects/Neatly_1-3.png'
    ],
    images_captions: [
      'Neatly: Tap. Sort. Live Better..',
      'Quick usage overview: Master efficient interactions with your organizer buddy in no time.',
      'Neatly is your AI-powered list organizer, designed to simplify shopping, task management, and daily planning.'
    ]
  }
]

const contacts: IContactsData[] = [
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
      'https://discord.com/users/1105146206348398642',
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
      ' ',
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
      ' ',
      'https://discord.com/users/1105146206348398642'
    ]
  }
]

export {
  projects,
  contacts
}