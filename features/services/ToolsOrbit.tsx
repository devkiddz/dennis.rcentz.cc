'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { stackBrands } from '@/features/skills/stack-brands';
import styles from './Services.module.css';
type Point = [number, number, number];
const names = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'MongoDB', 'Git', 'GitHub', 'shadcn/ui', 'HTML', 'CSS', 'JavaScript'];
const points: Point[] = names.map((_,index) => { const y=1-2*(index+.5)/names.length, radius=Math.sqrt(1-y*y), angle=index*Math.PI*(3-Math.sqrt(5)); return [Math.cos(angle)*radius,y,Math.sin(angle)*radius]; });
const foundationPaths: Record<string,string> = {
  HTML: 'M3 2h18l-1.6 18L12 22l-7.4-2L3 2zm4 4 .4 4.5h8.4l-.3 3.2-3.5 1-3.5-1-.2-1.7H6l.4 3.4L12 17l5.6-1.6.7-7H9.5L9.4 8h9.1l.2-2H7z',
  CSS: 'M3 2h18l-1.6 18L12 22l-7.4-2L3 2zm4 4 .2 2h9.3l-.2 2H8l.2 2h7.9l-.3 2-3.8 1-3.4-.9-.2-1.6H6l.4 3.2L12 17l5.7-1.6L18.5 6H7z'
};
export function ToolsOrbit() {
  const [paused, setPaused] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const tools = useRef<(SVGGElement | null)[]>([]);
  const rotation = useRef(.35);
  const pitch = useRef(-.18);
  const steering = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: .00034, y: 0 });
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, last = 0, visible = true;
    const draw = () => {
      const projected = points.map(([x,y,z],index) => {
        const angle=rotation.current, xx=x*Math.cos(angle)+z*Math.sin(angle), zz=z*Math.cos(angle)-x*Math.sin(angle), tilt=pitch.current;
        const yy=y*Math.cos(tilt)-zz*Math.sin(tilt), depth=y*Math.sin(tilt)+zz*Math.cos(tilt), perspective=4/(4-depth);
        return { index, x:200+xx*145*perspective, y:200+yy*145*perspective, depth, size:.48+(depth+1)*.42, opacity:.13+(depth+1)*.435 };
      });
      projected.sort((a,b)=>a.depth-b.depth).forEach(({index,x,y,size,opacity}) => {
        const node=tools.current[index];
        node?.setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${size.toFixed(3)})`);
        node?.setAttribute('opacity',opacity.toFixed(3));
        if(node) node.parentElement?.appendChild(node);
      });
    };
    const tick = (time: number) => {
      if(last) {
        const delta=Math.min(time-last,64), blend=1-Math.exp(-delta/160);
        velocity.current.x+=(.00034+steering.current.x*.001-velocity.current.x)*blend;
        velocity.current.y+=(steering.current.y*.0007-velocity.current.y)*blend;
        rotation.current+=delta*velocity.current.x;
        pitch.current+=delta*velocity.current.y;
      }
      last=time; draw(); frame=requestAnimationFrame(tick);
    };
    const start = () => { cancelAnimationFrame(frame); last=0; draw(); if(!paused && !media.matches && visible && !document.hidden) frame=requestAnimationFrame(tick); };
    const observer = new IntersectionObserver(entries => { visible=entries[0]?.isIntersecting ?? false; start(); });
    if(scene.current) observer.observe(scene.current);
    start(); media.addEventListener('change',start); document.addEventListener('visibilitychange',start);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); media.removeEventListener('change',start); document.removeEventListener('visibilitychange',start); };
  },[paused]);
  return <div ref={scene} className={styles.toolsHero} onPointerMove={event => {
    if(event.pointerType === 'touch') return;
    const bounds=event.currentTarget.getBoundingClientRect();
    steering.current={x:Math.max(-1,Math.min(1,(event.clientX-bounds.left)/bounds.width*2-1)),y:Math.max(-1,Math.min(1,(event.clientY-bounds.top)/bounds.height*2-1))};
  }} onPointerLeave={()=>{steering.current={x:0,y:0};}}>
    <svg className={styles.globe} viewBox="0 0 400 400" role="img" aria-label="A rotating three-dimensional sphere of development tool logos">
      {names.map((name,index) => <g key={name} ref={node=>{tools.current[index]=node;}} className={styles.globeTool} opacity="0"><title>{name}</title>{name === 'JavaScript' ? <><rect x="-13" y="-13" width="26" height="26" fill="currentColor" /><text x="10" y="8" textAnchor="end" className={styles.jsLetters}>JS</text></> : <svg x="-13" y="-13" width="26" height="26" viewBox="0 0 24 24"><path fillRule={name === 'HTML' || name === 'CSS' ? 'evenodd' : undefined} d={stackBrands[name]?.path ?? foundationPaths[name]} /></svg>}</g>)}
    </svg>
    <div className={styles.orbitCaption}><span>Tools behind the build</span><button type="button" onClick={()=>setPaused(value=>!value)} aria-label={paused?'Resume tool sphere rotation':'Pause tool sphere rotation'} aria-pressed={paused}>{paused?<Play size={16} aria-hidden="true" />:<Pause size={16} aria-hidden="true" />}</button></div>
  </div>;
}
