export const SITE = {
  title: 'Boredom at Work',
  description: "Transform your 9-to-5 downtime into personal growth. From mastering AI skills to starting a 3D printing hobby or finding the perfect camera gear — we help you make every boring minute count.",
  url: 'https://boredom-at-work.com',
  author: 'a bored human',
};

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Learning Paths', href: '/learning-paths/' },
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
    viewAllHref: '/tags/ai-courses/',
  },
  {
    title: 'The 3D Printing Lab',
    id: '3d-printing',
    icon: '🖨️',
    description: "Turn your desk into a miniature factory. Learn how to choose a printer and start creating physical objects during work downtime.",
    links: [
      { text: '3D Printing for Beginners Guide', href: '/3d-printing-beginners-guide/' },
      { text: 'Best 3D Printers Under $300', href: '/best-3d-printers-under-300/' },
      { text: 'Is 3D Printing Actually Worth It?', href: '/is-3d-printing-worth-it/' },
      { text: 'What Should You 3D Print First?', href: '/what-to-3d-print-first/' },
    ],
    viewAllHref: '/tags/3d-printing/',
  },
  {
    title: 'Import Treasures from Japan',
    id: 'japan-shopping',
    icon: '🇯🇵',
    description: "Discover how to buy unique products from Japan — vintage cameras, stationery, snacks, and more — shipped right to your door.",
    links: [
      { text: 'Buyee vs Sendico: Which Proxy to Use?', href: '/buyee-vs-sendico-japan-proxy/' },
      { text: 'How to Buy from Japan: Beginner Guide', href: '/how-to-buy-from-japan-beginners-guide/' },
      { text: '15 Best Japanese Products to Import', href: '/best-japanese-products-to-import/' },
    ],
    viewAllHref: '/tags/japan-shopping/',
  },
  {
    title: 'Photography 101',
    id: 'photography',
    icon: '📸',
    description: "Stop taking boring snapshots. Learn the fundamentals of photography and find the perfect beginner camera gear.",
    links: [
      { text: 'Best Cameras for Beginners', href: '/best-cameras-for-beginners/' },
      { text: 'DSLR vs Mirrorless: Which is Best?', href: '/dslr-vs-mirrorless-beginners/' },
      { text: 'Camera vs Smartphone for Travel', href: '/camera-vs-smartphone/' },
      { text: 'Olympus PEN E-PM2 User Guide', href: '/olympus-pen-e-pm2-guide/' },
    ],
    viewAllHref: '/tags/photography/',
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
    viewAllHref: '/tags/tutorial/',
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
    viewAllHref: '/tags/career-development/',
  },
  {
    title: 'Tech & Gadgets Worth Your Money',
    id: 'tech-gadgets',
    icon: '🎧',
    description: "Research the tech you've been eyeing. E-readers, earbuds, keyboards, and gadgets that actually improve your life.",
    links: [
      { text: 'Is a Kindle Worth It in 2026?', href: '/is-kindle-worth-it/' },
      { text: 'Kindle vs Kobo: Which E-Reader?', href: '/kindle-vs-kobo/' },
      { text: 'Best Mechanical Keyboards for Beginners', href: '/best-mechanical-keyboards-beginners/' },
      { text: 'AirPods vs Galaxy Buds vs Sony', href: '/airpods-vs-galaxy-buds-vs-sony/' },
    ],
    viewAllHref: '/tags/tech-gadgets/',
  },
];

export const FOOTER_LINKS = {
  quick: [
    { label: 'Home', href: '/' },
    { label: 'Learning Paths', href: '/learning-paths/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Stop Being Bored', href: '/productive-things-bored-at-work/' },
    { label: 'Contact', href: '/contact/' },
  ],
  popular: [
    { label: 'ChatGPT Beginner Guide', href: '/chatgpt-tutorial-beginners/' },
    { label: 'Free AI Courses', href: '/best-free-ai-courses/' },
    { label: 'Fast Certifications', href: '/ai-certifications-in-a-week/' },
  ],
};
