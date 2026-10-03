import Link from 'next/link';
import { ArrowUpRight, Check, Globe2, MapPin } from 'lucide-react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SectionNavigator } from '@/components/navigation/SectionNavigator';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbs, personSchema, siteUrl, websiteSchema, webPageSchema } from '@/lib/seo';
import { developmentServices, localCoverage, localQuestions, remoteMarkets, remoteQuestions } from './development-content';
import styles from './Development.module.css';

type DevelopmentLandingProps = { remote?: boolean };

export function DevelopmentLanding({ remote = false }: DevelopmentLandingProps) {
  const path = remote ? '/remote-website-development' : '/website-development';
  const title = remote ? 'Remote Website Development Services' : 'Website Development in Nigeria';
  const questions = remote ? remoteQuestions : localQuestions;
  const areaServed = remote
    ? remoteMarkets.map(market => ({ '@type': 'City', name: market.city, containedInPlace: { '@type': 'Country', name: market.country } }))
    : [{ '@type': 'Country', name: 'Nigeria' }, { '@type': 'AdministrativeArea', name: 'Delta State' }, ...['Warri', 'Lagos', 'Lekki', 'Victoria Island', 'Ikeja'].map(name => ({ '@type': 'Place', name }))];
  const steps = remote ? [
    ['01 / Share the brief', 'Tell me about your users, required pages or features, location, time zone and existing systems. We establish whether the project is a good fit.'],
    ['02 / Agree the working plan', 'Scope, milestones, review stages, meeting overlap and payment terms are agreed before development. Feedback and decisions can stay in a shared written record.'],
    ['03 / Build, review & hand over', 'We review work through previews, validate the agreed functionality and plan deployment. Repository access, handover and ongoing support are defined in the delivery scope.']
  ] : [
    ['01 / Understand your business', 'We discuss your customers, the services or products you offer and the tasks your website or application should support.'],
    ['02 / Define the scope', 'Pages, content, features, integrations, budget and timeline are discussed before development. The brief separates launch essentials from future improvements.'],
    ['03 / Review & launch', 'We review the interface and agreed workflows, plan deployment and confirm what maintenance or future support your business needs.']
  ];
  return <>
    <StructuredData data={{ '@context': 'https://schema.org', '@graph': [personSchema, websiteSchema, webPageSchema(path, title), breadcrumbs(path, title), { '@type': 'Service', '@id': `${siteUrl}${path}#service`, name: title, serviceType: remote ? 'Remote website and application development' : 'Website and application development', description: remote ? 'Remote website development for international businesses, with agreed scope, milestone reviews and delivery arrangements.' : 'Website and application development for businesses in Warri, Delta State, Lagos and across Nigeria.', provider: { '@id': personSchema['@id'] }, areaServed, url: `${siteUrl}${path}` }] }} />
    <SiteHeader />
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{remote ? 'Remote development' : 'Website development'}</span></nav>
        <section className={styles.hero} aria-labelledby="development-title">
          <header>
            <p className={styles.eyebrow}>{remote ? 'Work together / Across borders' : 'Websites & applications / Nigeria'}</p>
            <h1 id="development-title">{remote ? <>Remote website<br /><span className="gradient-text">development services.</span></> : <>Website development<br /><span className="gradient-text">for your business in Nigeria.</span></>}</h1>
            <p className={styles.lead}>{remote ? 'Work directly with Dennis Okaro Jones on your business website, web application or product interface. A clear brief, agreed milestones and practical communication keep your project moving across locations.' : 'I’m Dennis Okaro Jones, a software developer based in Warri, Delta State. I build business websites, web applications and mobile apps for clients in Lagos and across Nigeria, with remote collaboration available.'}</p>
            <div className={styles.actions}><Link href="/contact" className={styles.primary}>Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></Link><Link href="/projects" className={styles.secondary}>Explore the portfolio <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          </header>
          <aside className={styles.brief} aria-labelledby="project-fit-heading">
            <div className={styles.icon}>{remote ? <Globe2 size={24} aria-hidden="true" /> : <MapPin size={24} aria-hidden="true" />}</div>
            <p className={styles.eyebrow}>{remote ? 'Your team. Our shared brief.' : 'Your business. A useful digital presence.'}</p>
            <h2 id="project-fit-heading">Build around what<br />your users need.</h2>
            <ul>{['A professional website that explains your offer', 'Connected application features and workflows', 'Responsive interfaces and reusable components', 'A defined scope, review process and handover'].map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
            <p className={styles.note}>{remote ? 'Based in Nigeria. Available for remote project enquiries; working hours and meeting overlap are agreed together.' : 'Serving business owners, founders and teams. Bring a new idea or an existing product you want to improve.'}</p>
          </aside>
        </section>
        <section className={styles.section} aria-labelledby="build-heading"><header className={styles.sectionHeading}><p className={styles.eyebrow}>What we can build</p><h2 id="build-heading">From a business website<br /><span className="gradient-text">to the systems behind it.</span></h2><p>Choose the experience your customers and team need. Each project is scoped around its users, content and application requirements.</p></header><div className={styles.grid}>{developmentServices.map((service, index) => <article key={service.title} className={styles.card}><span className={styles.number}>0{index + 1}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></section>
        <section className={styles.section} aria-labelledby="coverage-heading"><header className={styles.sectionHeading}><p className={styles.eyebrow}>{remote ? 'International collaboration' : 'Where I work with businesses'}</p><h2 id="coverage-heading">{remote ? 'Your location. A shared way of working.' : 'Warri roots. Projects across Nigeria.'}</h2><p>{remote ? 'Remote enquiries are welcome from these markets and other locations. Each engagement starts by agreeing a realistic communication and delivery plan.' : 'Work can be discussed and reviewed remotely. Your location helps us plan communication and requirements; meeting arrangements are agreed individually.'}</p></header><div className={remote ? styles.grid : styles.coverageGrid}>{remote ? remoteMarkets.map(market => <article className={styles.card} key={market.city}><Globe2 size={20} className={styles.marker} aria-hidden="true" /><h3>{market.title}</h3><p>{market.text}</p></article>) : localCoverage.map(area => <article className={styles.card} key={area.title}><MapPin size={20} className={styles.marker} aria-hidden="true" /><h3>{area.title}</h3><p>{area.text}</p></article>)}</div></section>
        <section className={styles.section} aria-labelledby="proof-heading"><header className={styles.sectionHeading}><p className={styles.eyebrow}>Relevant development work</p><h2 id="proof-heading">Explore the work before we talk.</h2><p>These independent products show the types of interfaces, data and workflows I work on. Open the portfolio for demos, repositories and contribution details.</p></header><div className={styles.coverageGrid}>{[
          ['Waffi Market', 'Multi-vendor commerce, storefronts, product discovery and database-backed features.', '/projects#waffi'],
          ['JobRcentz', 'Job applications, dashboards, authentication and interview lifecycle workflows.', '/projects#jobrcentz'],
          ['Rcentz Digital Platform', 'Modular product and service presentation with reusable application structures.', '/projects#rcentz']
        ].map(([name, text, href]) => <Link className={`${styles.card} ${styles.project}`} key={name} href={href}><span className={styles.eyebrow}>Independent product development</span><h3>{name}</h3><p>{text}</p><span className={styles.projectLink}>View contribution details <ArrowUpRight size={16} aria-hidden="true" /></span></Link>)}</div></section>
        <section className={styles.section} aria-labelledby="working-heading"><header className={styles.sectionHeading}><p className={styles.eyebrow}>{remote ? 'Remote delivery' : 'From enquiry to delivery'}</p><h2 id="working-heading">{remote ? 'A clear process across time zones.' : 'Start with a brief. Build with a plan.'}</h2></header><ol className={styles.coverageGrid}>{steps.map(([heading, text]) => <li className={styles.card} key={heading}><h3>{heading}</h3><p>{text}</p></li>)}</ol></section>
        <section className={styles.faq} aria-labelledby="questions-heading"><div className={styles.sectionHeading}><p className={styles.eyebrow}>Before we begin</p><h2 id="questions-heading">A few useful answers.</h2></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
        <section className={styles.closing} aria-labelledby="enquiry-heading"><div><p className={styles.eyebrow}>Tell me what you need</p><h2 id="enquiry-heading">Your next website starts<br /><span className="gradient-text">with a conversation.</span></h2><p>Include your business, location or time zone, required features and preferred timeline. We’ll discuss scope and the next step.</p></div><div className={styles.actions}><Link href="/contact" className={styles.primary}>Send your project brief <ArrowUpRight size={17} aria-hidden="true" /></Link><Link href={remote ? '/website-development' : '/remote-website-development'} className={styles.secondary}>{remote ? 'Website development in Nigeria' : 'Remote website development'} <ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>
      </div>
    </main>
    <SiteFooter /><SectionNavigator showMarkers={false} />
  </>;
}
