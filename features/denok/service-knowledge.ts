import type { DenokKnowledgeEntry } from './knowledge';

function projectQuestions(names: string[]) {
  return names.flatMap(name => [name, `Can Dennis build ${name}?`, `Can you build ${name}?`, `Does Dennis build ${name}?`, `Do you build ${name}?`, `I need ${name}`, `I want ${name}`, `I am looking for ${name}`, `Tell me about ${name}`, `Can Dennis develop ${name}?`, `Can you develop ${name}?`, `Can Dennis help me with ${name}?`]);
}

const topics = [
  {
    id: 'business-websites', question: 'Can Dennis build a business website?',
    names: ['a business website', 'business websites', 'a company website', 'corporate websites', 'a corporate website', 'a portfolio website', 'a landing page', 'landing pages'],
    answer: ['Yes. Dennis offers company and business websites, portfolio websites, service pages and landing pages. The goal is to explain what the business does and give visitors a clear next step, such as sending an enquiry.', 'Pages, content, design, forms, integrations and ongoing support are agreed around your brief. Share your business, existing website if any and what you want visitors to do.'],
    followUps: ['commerce-development', 'website-maintenance', 'contact']
  },
  {
    id: 'commerce-development', question: 'Can Dennis build an online store or marketplace?',
    names: ['an online store', 'online stores', 'an ecommerce website', 'an e-commerce website', 'an e commerce website', 'a shopping website', 'a marketplace', 'a multi-vendor marketplace', 'a multivendor marketplace'],
    answer: ['Yes. Dennis offers online stores and multi-vendor marketplaces, including product catalogues, storefronts, discovery and shopping workflows. Payments, orders, delivery and vendor requirements are defined in the scope.', 'Waffi Market is an independent product example in his portfolio. It demonstrates marketplace structures and database-backed features; your project requirements and delivery terms would be agreed separately.'],
    followUps: ['project-waffi', 'business-websites', 'contact']
  },
  {
    id: 'logistics-development', question: 'Can Dennis build a courier tracking website?',
    names: ['a courier website', 'a courier tracking website', 'courier tracking', 'a logistics website', 'a shipment tracking website', 'a parcel tracking website', 'a delivery tracking system'],
    answer: ['Yes. Courier and logistics development can cover shipment tracking, parcel status, delivery updates, customer enquiries and operational dashboards.', 'Share how shipments are created, who updates tracking statuses and which delivery or carrier integrations are required. Tracking data must come from real operational records or agreed integrations.'],
    followUps: ['business-systems', 'services', 'contact']
  },
  {
    id: 'financial-development', question: 'Can Dennis build a fintech or banking interface?',
    names: ['a fintech website', 'a fintech application', 'fintech websites', 'an online banking website', 'online banking', 'a banking interface', 'a financial dashboard', 'a payment platform'],
    answer: ['Dennis offers financial product interfaces and workflows, such as account dashboards, payment journeys, transaction histories and administrative tools. His portfolio also records contributions to an existing multi-asset fintech platform.', 'For a financial or banking product, integrations, permissions, transaction rules, security and regulatory requirements need explicit planning. A website interface alone does not establish a licensed bank or payment service.'],
    followUps: ['project-fintech', 'practice', 'contact']
  },
  {
    id: 'business-systems', question: 'Can Dennis build a custom web application?',
    names: ['a web application', 'web applications', 'a web app', 'a business system', 'a customer portal', 'a dashboard', 'an admin dashboard', 'a booking website', 'a booking system', 'a custom website'],
    answer: ['Yes. Dennis works on custom web applications, business systems, customer portals, dashboards and connected workflows. His tools include React, Next.js, TypeScript, Prisma and PostgreSQL.', 'Share the people who will use the system, their roles, the data involved and the tasks they need to complete. Booking, authentication, permissions and integrations are defined for the specific project.'],
    followUps: ['project-jobrcentz', 'skills', 'contact']
  },
  {
    id: 'job-platform-development', question: 'Can Dennis build a jobs website?',
    names: ['a jobs website', 'a job website', 'a job portal', 'a recruitment website', 'a jobs platform', 'a services marketplace'],
    answer: ['Yes. Dennis can discuss job platforms and service marketplaces with employer, candidate and application workflows.', 'JobRcentz is an independent product example covering jobs, applications, candidates, interviews, invitations, notifications and dashboards. Your own roles, workflows and launch requirements would be scoped separately.'],
    followUps: ['project-jobrcentz', 'business-systems', 'contact']
  },
  {
    id: 'mobile-development', question: 'Does Dennis also build mobile apps?',
    names: ['a mobile app', 'mobile apps', 'mobile app development', 'a mobile application', 'mobile applications', 'an Android app', 'an iOS app'],
    answer: ['Mobile application development is among the services Dennis offers. The starting point is your users, required features, target platforms and how the app connects to your data or existing systems.', 'Technology, platform support, backend requirements, testing and store release arrangements need to be confirmed in the project scope. Ask Dennis directly about availability and examples relevant to your brief.'],
    followUps: ['business-systems', 'remote-development', 'contact']
  },
  {
    id: 'website-maintenance', question: 'Can Dennis improve my existing website?',
    names: ['website maintenance', 'a website redesign', 'website redesign', 'improving my website', 'fixing my website', 'website improvements'],
    answer: ['Yes. Dennis offers improvements to existing websites and applications, including responsive layouts, reusable components, new features and practical debugging.', 'Send the current website link, the problems you are seeing and the changes you want. Recommendations and a delivery estimate follow a review of the relevant code and requirements.'],
    followUps: ['practice', 'services', 'contact']
  }
] as const;

export const serviceKnowledge: DenokKnowledgeEntry[] = topics.map(topic => ({
  id: topic.id,
  category: 'skills',
  question: topic.question,
  aliases: projectQuestions([...topic.names]),
  answer: [...topic.answer],
  links: [{ label: 'Explore development services', href: '/services' }, { label: 'Discuss your project', href: '/contact' }],
  followUps: [...topic.followUps]
}));
