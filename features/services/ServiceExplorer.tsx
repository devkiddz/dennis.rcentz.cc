'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Globe2, Smartphone, ShoppingBag, Landmark, Truck, Wrench } from 'lucide-react';
import { services } from './services';
import styles from './Services.module.css';
const icons = [Globe2, Smartphone, ShoppingBag, Landmark, Truck, Wrench];
const summaries = ['A clear online presence for your business.', 'Connected experiences for customers and teams.', 'Stores, vendors and shopping workflows.', 'Financial interfaces and transaction workflows.', 'Shipment visibility and delivery operations.', 'New features and stronger existing products.'];
export function ServiceExplorer() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return <div className={styles.explorer}>
    <div role="tablist" aria-label="Explore development services" className={styles.summaryCards}>
      {services.map((item, index) => { const Icon = icons[index]; return <button key={item.number} ref={node => { buttons.current[index] = node; }} type="button" role="tab" id={`service-tab-${index}`} aria-controls={`service-panel-${index}`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} className={styles.summaryCard} onClick={() => setSelected(index)} onKeyDown={event => {
        let next: number | undefined;
        if (event.key === 'ArrowRight') next = (index + 1) % services.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + services.length) % services.length;
        if (event.key === 'ArrowDown') next = (index + 2) % services.length;
        if (event.key === 'ArrowUp') next = (index - 2 + services.length) % services.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = services.length - 1;
        if (next !== undefined) { event.preventDefault(); setSelected(next); buttons.current[next]?.focus(); }
      }}><span className={styles.summaryPattern} aria-hidden="true" /><span className={styles.summaryTitle}><Icon size={18} aria-hidden="true" /><span>{item.title}</span></span><span className={styles.summaryText}>{summaries[index]}</span></button>; })}
    </div>
    {services.map((item, index) => <div key={item.number} role="tabpanel" id={`service-panel-${index}`} aria-labelledby={`service-tab-${index}`} hidden={selected !== index} tabIndex={0} className={styles.servicePanel}>
      <p className={styles.eyebrow}>Service {item.number} / Built around your business</p><h3>{item.title}</h3><p className={styles.description}>{item.description}</p><ul className={styles.tags} aria-label="Example projects">{item.examples.map(example => <li key={example}>{example}</li>)}</ul><p className={styles.panelNote}>We start with your goals, users and required workflows, then agree the features and integrations that fit your project.</p><div className={styles.actions}><Link href="/contact" className={styles.button}>Discuss your project <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
    </div>)}
  </div>;
}
