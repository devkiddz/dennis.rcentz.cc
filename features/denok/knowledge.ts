import { projects } from '@/features/portfolio/projects';
import { serviceKnowledge } from './service-knowledge';

export type DenokKnowledgeEntry = {
  id: string;
  category: 'overview' | 'identity' | 'qualifications' | 'skills' | 'experience' | 'projects' | 'contact';
  question: string;
  aliases: string[];
  answer: string[];
  links?: { label: string; href: string }[];
  followUps: string[];
};

export const denokKnowledge: DenokKnowledgeEntry[] = [
  {
    id: 'services', category: 'skills', question: 'What services does Dennis offer?',
    aliases: ['services', 'what services do you offer', 'what services does Dennis offer', 'what can you build', 'what can Dennis build', 'what does Dennis build', 'what websites does Dennis build', 'what website does Dennis build', 'what types of website does Dennis build', 'what types of websites does Dennis build', 'what type of website does Dennis build', 'what kind of websites does Dennis build', 'what kinds of websites does Dennis build', 'what kind of website does Dennis build', 'which websites does Dennis build', 'what websites can Dennis build', 'what types of websites can Dennis build', 'what websites do you build', 'what types of websites do you build', 'what kind of websites do you build', 'what type of website can you build', 'what websites can you build', 'does Dennis build websites', 'do you build websites', 'can Dennis build websites', 'website development services', 'website types', 'types of websites', 'what apps does Dennis build', 'what are Dennis services', 'what are his services', 'what services does he provide', 'what services are available', 'what can he develop', 'what sort of websites can he make', 'what can Dennis do for my business'],
    answer: ['Dennis builds business and corporate websites, portfolio sites and landing pages, online stores and multi-vendor marketplaces, job platforms, customer portals and custom web applications.', 'His services also cover mobile apps, fintech and banking interfaces, courier and shipment tracking systems, and improvements to existing websites.', 'Choose a project type below or share your brief. Scope, integrations, availability, delivery and pricing are confirmed directly with Dennis.'],
    links: [{ label: 'Explore services', href: '/services' }, { label: 'Discuss your project', href: '/contact' }], followUps: ['business-websites', 'commerce-development', 'contact']
  },
  ...serviceKnowledge,
  {
    id: 'overview', category: 'overview', question: 'Give me a recruiter overview',
    aliases: ['recruiter overview', 'summarise the website', 'summarize the portfolio', 'walk me through the portfolio', 'why consider Dennis', 'give me an overview'],
    answer: [
      'Dennis Okaro Jones is a Software Developer working across frontend and product engineering. His portfolio describes 2+ years of combined web development experience, including responsive interfaces, database-backed products and application workflows.',
      'His main tools include React, Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma and PostgreSQL. His work spans Waffi Market, JobRcentz, the Rcentz Digital Platform and NovaShad, alongside contributions to an existing multi-asset fintech platform.',
      'The homepage introduces his background, capabilities and professional experience. The full portfolio explains his responsibilities and provides live project and GitHub links. His earlier work also includes web development instruction, graphics and imagery, and technical supervision.',
      'For a role discussion, current availability or further evidence of a qualification, contact Dennis directly. This overview reflects the information he has supplied for this portfolio.'
    ],
    links: [{ label: 'Explore the full portfolio', href: '/projects' }, { label: 'Read his experience', href: '/#experience' }],
    followUps: ['skills', 'projects', 'qualifications', 'contact']
  },
  {
    id: 'identity', category: 'identity', question: 'Who is Dennis?',
    aliases: ['who is Dennis Okaro Jones', 'who is Dennis O Jones', 'tell me about Dennis', 'Dennis', 'about Dennis', 'what does Dennis do', 'what is Dennis job', 'what does he do', 'what do you do', 'what is his profession', 'what is Dennis occupation'],
    answer: ['Dennis Okaro Jones, also presented as Dennis O. Jones, is a Software Developer building web applications, business systems, marketplaces, job platforms and database-driven products.', 'He works across frontend and backend features, connecting responsive interfaces to application workflows. His approach is practical: build something useful, understand how it works, and keep improving reliability, maintainability and security.'],
    links: [{ label: 'About Dennis', href: '/#bio' }], followUps: ['overview', 'skills', 'experience']
  },
  {
    id: 'denok', category: 'identity', question: 'What is Denok?',
    aliases: ['who is Denok', 'what can Denok do', 'what are you', 'are you Dennis', 'are you an AI', 'how does Denok work', 'Denok'],
    answer: ['Denok is Dennis’s portfolio guide. It helps visitors explore his background, skills, professional development and project contributions.', 'This first version uses a curated knowledge array and question matching. It is not Dennis speaking live, and it does not use a generative model. If a question is outside the available information, it offers topics to explore or a way to contact Dennis.'],
    followUps: ['overview', 'identity', 'projects']
  },
  {
    id: 'qualifications', category: 'qualifications', question: 'What are his qualifications?',
    aliases: ['Dennis qualifications', 'what are Dennis qualifications', 'what qualifications does he have', 'education', 'certifications', 'certificates', 'training', 'professional development', 'what did Dennis study'],
    answer: ['Dennis has supplied these completed courses and certificates: Front-End Development Certificate — Udemy (2025); Web & JavaScript Foundations — freeCodeCamp (August 2025); JavaScript Engineering — Code with Mosh (October–December 2025); React Development — Scrimba / Bob Ziroll (May 2026).', 'Next.js Full-Stack Development — Advanced Track is listed as in progress. His practical development work is presented separately through project contributions and professional experience.', 'For certificate copies, detailed course coverage or further academic information, contact Dennis directly.'],
    links: [{ label: 'Review practical project work', href: '/projects' }], followUps: ['skills', 'experience', 'contact']
  },
  {
    id: 'skills', category: 'skills', question: 'Which technologies does he use?',
    aliases: ['skills', 'tech stack', 'technologies', 'what skills does Dennis have', 'what technologies does Dennis use', 'frontend skills', 'React', 'Next.js', 'TypeScript', 'backend skills'],
    answer: ['Frontend: React, Next.js, TypeScript, Tailwind CSS, shadcn/ui and responsive interface development.', 'Backend and data: Node.js, Express, Prisma, PostgreSQL, MongoDB and API design. JobRcentz also includes authenticated workflows using Better Auth.', 'His portfolio groups capabilities into Frontend Engineering, Backend & Data, Product Systems and Engineering Practice. These describe his tools and responsibilities, rather than claiming the same depth of experience in every technology.'],
    links: [{ label: 'Explore capabilities', href: '/#skills' }], followUps: ['projects', 'practice', 'experience']
  },
  {
    id: 'experience', category: 'experience', question: 'Tell me about his experience',
    aliases: ['work experience', 'professional experience', 'employment history', 'career history', 'how much experience does Dennis have', 'where has Dennis worked'],
    answer: ['Software Developer — Independent Product Development, December 2025–present: web applications and digital products across marketplaces, job platforms, business systems and financial technology.', 'Graphics Designer & Imagery — Rc Enterprize, June 2015–present; Graphics Designer & Imagery — 5d Imagery / Proart, August 2018–June 2019.', 'Web Development Instructor — HIIT, June 2016–December 2017; Technicians Supervisor — Xpression, January 2010–August 2012.', 'The 2+ years of combined web development experience in his bio is separate from the start date of his current independent product development role.'],
    links: [{ label: 'Read the experience timeline', href: '/#experience' }], followUps: ['projects', 'teaching', 'design', 'qualifications']
  },
  {
    id: 'projects', category: 'projects', question: 'Show me his projects',
    aliases: ['portfolio', 'projects', 'what has Dennis built', 'show me his work', 'project links', 'GitHub projects', 'live projects'],
    answer: ['The portfolio includes Waffi Market, JobRcentz, the Rcentz Digital Platform, NovaShad, AJ Logik and contributions to a multi-asset fintech platform.', 'Each project card describes Dennis’s contribution and links to the available live project and GitHub repository. AJ Logik is earlier commerce work in a development journey that continued through Shelsea and Waffi.'],
    links: [{ label: 'View full portfolio', href: '/projects' }], followUps: ['project-waffi', 'project-jobrcentz', 'project-rcentz', 'project-fintech']
  },
  ...projects.map((project): DenokKnowledgeEntry => ({
    id: `project-${project.slug}`, category: 'projects', question: `Tell me about ${project.name}`,
    aliases: [project.name, project.slug, `what is ${project.name}`, `Dennis contribution to ${project.name}`, ...(project.slug === 'fintech' ? ['fintech', 'Axaus', 'Netcap', 'financial technology'] : [])],
    answer: [project.description, `Dennis’s role: ${project.type}.`, ...project.contributions, ...(project.slug === 'fintech' ? ['This is a contribution to an existing platform. Dennis does not present it as a product he independently owns or as a PHP-specialist position.'] : [])],
    links: [...(project.live ? [{ label: `Open ${project.name}`, href: project.live }] : []), { label: 'View GitHub repository', href: project.github }],
    followUps: ['projects', 'skills', 'practice', 'contact']
  })),
  {
    id: 'practice', category: 'skills', question: 'How does he approach development?',
    aliases: ['engineering practice', 'development approach', 'security', 'debugging', 'deployment', 'how does Dennis build products', 'maintainability'],
    answer: ['Dennis’s stated principles are Build · Harden · Improve. He focuses on improving chosen products through reusable components, clear data and application boundaries, debugging and careful validation.', 'His development responsibilities include authentication, authorization, CRUD operations, server-side functionality, Git and GitHub workflows, and Vercel deployment. A security-minded approach is a development priority, not a claim that any product is risk-free.'],
    links: [{ label: 'Engineering capabilities', href: '/#skills' }], followUps: ['project-jobrcentz', 'project-fintech', 'contact']
  },
  {
    id: 'teaching', category: 'experience', question: 'Has he taught web development?',
    aliases: ['teaching', 'instructor', 'HIIT', 'teaching experience', 'web development instructor'],
    answer: ['Dennis worked as a Web Development Instructor at HIIT, Lagos, from June 2016 to December 2017.', 'He taught HTML, CSS, JavaScript and PHP fundamentals, introduced WordPress, SEO and digital marketing, and supported learners through practical web development exercises.'],
    followUps: ['experience', 'qualifications', 'contact']
  },
  {
    id: 'design', category: 'experience', question: 'What about his design background?',
    aliases: ['graphics', 'graphic design', 'imagery', 'design background', 'Rc Enterprize', 'Proart'],
    answer: ['His graphics and imagery work includes Rc Enterprize (June 2015–present) and 5d Imagery / Proart (August 2018–June 2019).', 'The responsibilities include branded promotional materials, commercial imagery, digital and print graphics, retouching and preparing images for production.'],
    followUps: ['experience', 'identity', 'contact']
  },
  {
    id: 'remote-development', category: 'contact', question: 'Can Dennis build my website remotely?',
    aliases: ['remote website development', 'remote website development services', 'international clients', 'website developer in Nigeria', 'website developer in Warri', 'website developer in Lagos', 'website development in Lekki', 'website development in Victoria Island', 'website development in Ikeja'],
    answer: ['Dennis is based in Warri, Delta State, and welcomes business website and application enquiries from Lagos and across Nigeria, as well as remote enquiries from international teams.', 'Remote collaboration starts with an agreed scope, milestone reviews, communication arrangements and delivery requirements. Availability, pricing and meeting times are confirmed directly with Dennis.'],
    links: [{ label: 'Website development in Nigeria', href: '/website-development' }, { label: 'Remote website development', href: '/remote-website-development' }, { label: 'Discuss your project', href: '/contact' }],
    followUps: ['services', 'projects', 'contact']
  },
  {
    id: 'contact', category: 'contact', question: 'How can I contact him?',
    aliases: ['contact', 'email', 'contact Dennis', 'hire Dennis', 'availability', 'available for work', 'salary', 'pricing', 'rates', 'remote work', 'CV', 'resume', 'interview'],
    answer: ['Email Dennis at denngodfirst@gmail.com to discuss a role, a project, his current availability or a copy of his CV.', 'Denok does not confirm availability, salary expectations, rates or interview arrangements on his behalf. Those details should be agreed directly with Dennis.'],
    links: [{ label: 'Email Dennis', href: 'mailto:denngodfirst@gmail.com' }, { label: 'Dennis on GitHub', href: 'https://github.com/devkiddz' }],
    followUps: ['overview', 'projects', 'experience']
  }
];

export const openingSuggestions = ['overview', 'identity', 'denok', 'qualifications', 'projects', 'contact'];
export const getKnowledgeEntry = (id: string) => denokKnowledge.find(entry => entry.id === id);
