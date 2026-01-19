export interface Step {
  title: string;
  slug: string;
  description: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  steps: Step[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'ai-mastery',
    title: 'From AI Novice to Power User',
    description: 'Master the art of prompt engineering and AI automation during your work downtime.',
    steps: [
      {
        title: 'The Beginner Foundations',
        slug: 'chatgpt-tutorial-beginners',
        description: 'Learn the basics of how LLMs work and how to write your first effective prompts.'
      },
      {
        title: 'Mastering the Afternoon Prompt',
        slug: 'prompt-engineering-afternoon',
        description: 'Specific techniques to get higher quality outputs in record time.'
      },
      {
        title: 'The Stealth Learning Workflow',
        slug: 'learn-ai-while-looking-busy',
        description: 'How to integrate learning into your daily office routine without raising eyebrows.'
      },
      {
        title: 'Fast-Track Certifications',
        slug: 'ai-certifications-in-a-week',
        description: 'Get recognized for your skills with these high-ROI certifications.'
      }
    ]
  },
  {
    id: '3d-printing-startup',
    title: 'The Desktop Factory Revolution',
    description: 'Learn to design and manufacture your own products right from your desk.',
    steps: [
      {
        title: 'First Slices: The Beginner Guide',
        slug: '3d-printing-beginners-guide',
        description: 'Setting up your first printer and understanding the basics.'
      },
      {
        title: 'Choosing Your First Machine',
        slug: 'best-3d-printers-under-300',
        description: 'Finding the perfect balance between price and performance.'
      },
      {
        title: 'Mastering CAD Software',
        slug: 'cad-software-3d-printing',
        description: 'Design your own complex objects with free software.'
      },
      {
        title: 'The Side-Hustle Blueprint',
        slug: 'selling-3d-prints-online',
        description: 'How to turn your new hobby into a profitable online store.'
      }
    ]
  },
  {
    id: 'stealth-photography',
    title: 'Visual Intelligence & Documentation',
    description: 'Master the fundamentals of optical capture and digital imaging, disguised as technical documentation.',
    steps: [
      {
        title: 'Optical Sensor vs. Mobile Imaging',
        slug: 'camera-vs-smartphone',
        description: 'Understanding why dedicated hardware still outperforms integrated mobile sensors.'
      },
      {
        title: 'System Architecture: Mirrorless vs. DSLR',
        slug: 'dslr-vs-mirrorless-beginners',
        description: 'Deep dive into the mechanical and electronic differences of modern imaging systems.'
      },
      {
        title: 'Deployment: Selecting Your Hardware',
        slug: 'best-cameras-for-beginners',
        description: 'Strategic analysis of entry-level systems for various technical requirements.'
      },
      {
        title: 'System Optimization: Common User Errors',
        slug: 'beginner-photography-mistakes',
        description: 'Identifying and mitigating common pitfalls in initial system operation.'
      }
    ]
  },
  {
    id: 'stealth-cad',
    title: 'CAD Systems & Spatial Simulation',
    description: 'Master engineering design and structural simulation fundamentals, presented as industrial documentation.',
    steps: [
      {
        title: 'System Architecture: CAD Foundations',
        slug: 'cad-software-3d-printing',
        description: 'Analyzing technical requirements for modern CAD software environments.'
      },
      {
        title: 'Structural Integrity & Spatial Design',
        slug: 'what-to-3d-print-first',
        description: 'Principles of three-dimensional modeling and physical load analysis.'
      },
      {
        title: 'Prototype Validation & Error Analysis',
        slug: '3d-printing-beginner-mistakes',
        description: 'Mitigating mechanical failure modes during initial prototype deployment.'
      },
      {
        title: 'Manufacturing Integration & Logistics',
        slug: 'selling-3d-prints-online',
        description: 'Transitioning from digital simulation to low-volume industrial production.'
      }
    ]
  }
];
