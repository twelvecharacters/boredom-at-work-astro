export const SITE = {
  title: 'Boredom at Work',
  description: "Stuck in a meeting that could have been an email? Don't just stare at the clock. Level up your career with AI skills and certifications during your 9-to-5 downtime.",
  url: 'https://boredom-at-work.com',
  author: 'a bored human',
};

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog/' },
];

export const CATEGORIES = [
  {
    title: 'Acquire AI Superpowers',
    id: 'free-courses',
    icon: '⚡',
    description: "The best free courses to help you stop worrying about AI replacing you and start using it to do your job in half the time.",
    links: [
      { text: 'Best Free AI Courses to Take at Work', href: '/best-free-ai-courses/' },
      { text: 'Google AI Essentials Review', href: '/google-ai-essentials-review/' },
      { text: 'Best AI Courses on Coursera', href: '/best-ai-courses-coursera/' },
      { text: 'Free vs Paid AI Courses', href: '/free-vs-paid-ai-courses/' },
    ],
  },
  {
    title: "Lunch Break Tutorials",
    id: 'tutorials',
    icon: '🍕',
    description: 'Bite-sized, practical guides you can finish before your boss even notices you are "working hard".',
    links: [
      { text: 'ChatGPT Tutorial for Beginners', href: '/chatgpt-tutorial-beginners/' },
      { text: 'Learn Prompt Engineering in One Afternoon', href: '/prompt-engineering-afternoon/' },
      { text: 'How to Learn AI While Looking Busy', href: '/learn-ai-while-looking-busy/' },
    ],
  },
  {
    title: 'The Promotion Fast-Track',
    id: 'career',
    icon: '🚀',
    description: "Turn your 'productive procrastination' into real-world raises and promotions.",
    links: [
      { text: 'AI Certifications You Can Earn in a Week', href: '/ai-certifications-in-a-week/' },
      { text: 'AI Skills That Will Get You Promoted', href: '/ai-skills-for-promotion/' },
    ],
  },
];

export const FOOTER_LINKS = {
  quick: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Stop Being Bored', href: '/productive-things-bored-at-work/' },
  ],
  popular: [
    { label: 'ChatGPT Beginner Guide', href: '/chatgpt-tutorial-beginners/' },
    { label: 'Free AI Courses', href: '/best-free-ai-courses/' },
    { label: 'Fast Certifications', href: '/ai-certifications-in-a-week/' },
  ],
};
