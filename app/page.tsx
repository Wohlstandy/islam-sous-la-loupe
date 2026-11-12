import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { DossierCards } from '@/components/cards';
import { Button } from '@/components/ui/button';
import { dossiers } from '@/lib/dossiers';
import { basePath } from '@/lib/model';
export default function Home() {
 return <>
 <section className="hero"><div className="wrap hero-inner">
  <p className="kicker">Textes, doctrines, histoire et liberté de conscience.</p>
  <h1>Explorez les textes. Vérifiez les sources. Formez votre jugement.</h1>
  <p>Une bibliothèque critique des textes islamiques, de leurs interprétations et des débats qu’ils soulèvent.</p>
  <form className="searchform" action={basePath+'/bibliotheque/'}><label className="sr-only" htmlFor="accueil-q">Rechercher dans la bibliothèque</label><input id="accueil-q" name="q" type="search" placeholder="Verset, hadith, auteur ou thème…"/><Button type="submit"><Search size={18} aria-hidden/> Rechercher</Button></form>
  <div className="tabs">{[['2:256','Coran 2:256'],['3017','Bukhari 3017'],['Ibn Qudama','Ibn Qudama']].map(([q,label])=><Link prefetch={false} key={q} className="tag" href={'/bibliotheque/?q='+encodeURIComponent(q)}>{label}</Link>)}</div>
 </div></section>
 <section className="wrap section" aria-labelledby="dossiers"><div className="heading"><h2 id="dossiers">Dossiers à explorer</h2><Link prefetch={false} href="/dossiers/" className="inline-flex items-center gap-2">Tous les dossiers <ArrowRight size={17} aria-hidden/></Link></div><DossierCards items={dossiers}/></section>
 </>
}
