export interface HubConfig {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  featuredPosts?: string[]; // Slugs of featured posts
  categories?: {
    title: string;
    description: string;
    slugs: string[];
  }[];
  seoTitle?: string;
  seoDescription?: string;
}

export const HUBS: Record<string, HubConfig> = {
  'AI': {
    tag: 'AI',
    title: 'Acquire AI Superpowers',
    subtitle: 'Master the tools of the future, today.',
    description: 'Transform your work life from "busy" to "impactful". Our AI guides help you leverage Large Language Models (LLMs) to automate repetitive tasks, generate better content, and earn certifications that actually matter in 2026.',
    featuredPosts: [
      'best-free-ai-courses',
      'chatgpt-guide',
      'google-ai-essentials-review'
    ],
    categories: [
      {
        title: 'Beginner Basics',
        description: 'Start here if you are new to generative AI.',
        slugs: ['chatgpt-tutorial-beginners', 'prompt-engineering-afternoon']
      },
      {
        title: 'Career Advancement',
        description: 'Earn certifications and skills to get promoted.',
        slugs: ['ai-certifications-in-a-week', 'ai-skills-for-promotion']
      }
    ]
  },
  '3D Printing': {
    tag: '3D Printing',
    title: 'The 3D Printing Lab',
    subtitle: 'From digital dreams to physical reality.',
    description: '3D printing is the perfect desktop hobby for the modern office worker. Learn how to choose your first printer, master slicer settings, and create practical objects that solve real-world problems.',
    featuredPosts: [
      '3d-printing-beginners-guide',
      'best-3d-printers-under-300',
      'is-3d-printing-worth-it'
    ],
    categories: [
      {
        title: 'Hardware Guides',
        description: 'Choosing the right printer and upgrades.',
        slugs: ['best-3d-printers-under-300', 'bambu-lab-a1-mini-review']
      },
      {
        title: 'Practical Projects',
        description: 'Things you should actually print.',
        slugs: ['what-to-3d-print-first', 'practical-office-3d-prints']
      }
    ]
  },
  'Photography': {
    tag: 'Photography',
    title: 'Photography for Beginners',
    subtitle: 'Capture moments, not just snapshots.',
    description: 'Photography is about seeing the world differently. We help you navigate the gear maze—from vintage Olympus cameras to the latest mirrorless tech—and teach you the fundamentals of composition and editing.',
    featuredPosts: [
      'best-cameras-for-beginners',
      'dslr-vs-mirrorless-beginners',
      'olympus-pen-e-pm2-guide'
    ]
  },
  'Career Development': {
    tag: 'Career Development',
    title: 'The Promotion Fast-Track',
    subtitle: 'Turn "productive procrastination" into real-world raises.',
    description: 'Mastering new skills at work shouldn\'t just be for fun. We show you how to document your growth, earn industry-recognized certifications during your downtime, and position yourself for the next big step in your career.',
    featuredPosts: [
      'ai-job-interview-prep',
      'ai-skills-for-promotion',
      'ai-certifications-in-a-week'
    ],
    categories: [
      {
        title: 'AI Office Automation',
        description: 'Automate your daily grind and finish your work in half the time.',
        slugs: ['ai-office-automation-tasks', 'best-custom-gpts-productivity', 'essential-mac-apps-2026']
      },
      {
        title: 'Growth Resources',
        description: 'The best books and podcasts for professional growth.',
        slugs: ['best-motivational-podcasts-2026', 'books-for-productive-procrastination']
      }
    ]
  }
};
