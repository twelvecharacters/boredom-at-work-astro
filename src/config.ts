export const SITE = {
  title: 'Boredom at Work',
  description: "Transform your 9-to-5 downtime into personal growth. From mastering AI skills to starting a 3D printing hobby or finding the perfect camera gear, we help you make every boring minute count.",
  url: 'https://boredom-at-work.com',
  author: 'Mehdi',
};

export const AUTHOR = {
  name: 'Mehdi',
  jobTitle: 'Director of Affiliates',
  url: 'https://boredom-at-work.com/about/',
  photo: '/images/mehdi.webp',
  bio: "Director of Affiliates with 9+ years in sales and leadership. I started Boredom at Work to turn workplace downtime into real skills, beginning with AI tools and expanding into the topics my brother and I are genuinely curious about: 3D printing, e-readers, photography, home office gear, and AI travel planning. Every article on this site comes from real use.",
  credentials: [
    { icon: '💼', text: '9+ years sales & leadership' },
    { icon: '📚', text: 'Self taught in AI since 2024' },
    { icon: '🛠️', text: 'Personal use on every review' },
  ],
  social: {
    linkedin: 'https://www.linkedin.com/in/mehdi-vazirian/',
    companyLinkedin: 'https://www.linkedin.com/company/boredom-at-work',
    reddit: 'https://www.reddit.com/r/boredom_at_work/',
    youtube: 'https://www.youtube.com/@boredom-at-work',
    tumblr: 'https://www.tumblr.com/boredomatworksposts',
    email: 'twelvecharacters@proton.me',
  },
};

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog/' },
];

export const CATEGORIES = [
  {
    title: 'Acquire AI Superpowers',
    id: 'ai-mastery',
    icon: '⚡',
    description: "The best free courses to help you stop worrying about AI replacing you and start using it to do your job in half the time.",
    links: [
      { text: 'Best Free AI Courses to Take at Work', href: '/best-free-ai-courses/' },
      { text: 'Google AI Essentials Review', href: '/google-ai-essentials-review/' },
      { text: 'Best AI Courses on Coursera', href: '/best-ai-courses-coursera/' },
      { text: 'Free vs Paid AI Courses', href: '/free-vs-paid-ai-courses/' },
    ],
    viewAllHref: '/tags/ai/',
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
    description: "Discover how to buy unique products from Japan, vintage cameras, stationery, snacks, and more, shipped right to your door.",
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
      { text: 'RapidRAW: Free Lightroom Alternative', href: '/rapid-raw-image-editor-guide/' },
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
  {
    title: 'Home Office Upgrades',
    id: 'home-office',
    icon: '🪑',
    description: "Build the home office that makes you actually want to work. Standing desks, ergonomic chairs, monitors, and everything in between.",
    links: [
      { text: 'Desk Upgrade Guide (Hub)', href: '/desk-upgrade-guide/' },
      { text: 'Best Standing Desks Under $600', href: '/best-standing-desks/' },
      { text: 'Best Office Chairs for Long Hours', href: '/best-office-chairs/' },
      { text: 'Best Monitor Arms', href: '/best-monitor-arms/' },
    ],
    viewAllHref: '/tags/home-office/',
  },
  {
    title: 'Investing & Finance Tools',
    id: 'finance',
    icon: '📈',
    description: "Learn investing during work downtime. Paper trading, stock screeners, courses, and tools, no financial advice, just education.",
    links: [
      { text: 'Investing Tools Guide (Hub)', href: '/investing-tools-guide/' },
      { text: 'Best Paper Trading Apps', href: '/best-paper-trading-apps/' },
      { text: 'Best Free Investing Courses', href: '/best-free-investing-courses/' },
      { text: 'Best Investing Apps for Beginners', href: '/best-investing-apps-beginners/' },
    ],
    viewAllHref: '/tags/investing/',
  },
  {
    title: 'AI Travel Planning',
    id: 'ai-travel',
    icon: '✈️',
    description: "Plan your next trip with ChatGPT, Claude, and Perplexity. Real trip reports, prompts that work, and destination guides.",
    links: [
      { text: 'AI Travel Planning Hub', href: '/ai-travel-planning/' },
      { text: 'ChatGPT Trip Planning Tutorial', href: '/chatgpt-trip-planning-tutorial/' },
      { text: 'Best AI Trip Planners 2026', href: '/best-ai-trip-planners/' },
      { text: 'AI Trip Planning: Japan', href: '/ai-trip-planning-japan/' },
    ],
    viewAllHref: '/tags/ai-travel/',
  },
];

export const FOOTER_LINKS = {
  quick: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
  popular: [
    { label: 'AI Tools Guide', href: '/ai-tools-guide/' },
    { label: 'ChatGPT Mastery Guide', href: '/chatgpt-guide/' },
    { label: '3D Printing Guide', href: '/3d-printing-guide/' },
    { label: 'Photography Guide', href: '/photography-guide/' },
    { label: 'Desk Upgrade Guide', href: '/desk-upgrade-guide/' },
    { label: 'Investing Tools Guide', href: '/investing-tools-guide/' },
  ],
};
