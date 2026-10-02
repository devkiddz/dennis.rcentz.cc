import Link from 'next/link';
import { Globe2, Smartphone, ShoppingBag, Landmark, Truck, Wrench, ArrowUpRight } from 'lucide-react';
import { services } from './services';
import styles from './Services.module.css';
const icons = [Globe2, Smartphone, ShoppingBag, Landmark, Truck, Wrench];
export function ServiceCards() {
  return <div className={styles.grid}>{services.map((service, index) => {
    const Icon = icons[index];
    return <article id={`service-${index}`} key={service.number} className={styles.serviceCard} data-tone={index % 3}>
      <div className={styles.cardPattern} aria-hidden="true"><span /><span /><span /></div>
      <div className={styles.serviceCardBody}><div className={styles.cardTop}><span className={styles.serviceIcon}><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span><span className={styles.number}>{service.number}</span></div>
      <h3>{service.title}</h3><p className={styles.description}>{service.description}</p><ul className={styles.tags} aria-label={`${service.title} examples`}>{service.examples.map(example => <li key={example}>{example}</li>)}</ul>
      <Link href="/contact" className={styles.cardLink}>Discuss this service <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
    </article>;
  })}</div>;
}
