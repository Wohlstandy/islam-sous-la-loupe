import Link from 'next/link';
import { ArrowUpRight, BookOpenText, Scale, Compass, ScrollText, Landmark, LibraryBig } from 'lucide-react';
import { Enter } from './motion';
import type { Dossier } from '@/lib/model';

const icons = [ScrollText, Scale, BookOpenText, Landmark, LibraryBig, Compass];
export function DossierCards({items}:{items:Dossier[]}) {
 return <div className="grid-cards">{items.map((d,i)=>{
  const Icon=icons[i%icons.length];
  return <Enter key={d.id}><Link prefetch={false} className="card dossier-card" href={'/dossiers/'+d.id+'/'}>
   <div className="card-top"><Icon size={22} aria-hidden/><span className="tag">{d.category}</span></div>
   <h3>{d.short}</h3><p className="muted">{d.question}</p><ArrowUpRight className="arrow" size={19} aria-hidden/>
  </Link></Enter>;
 })}</div>;
}
