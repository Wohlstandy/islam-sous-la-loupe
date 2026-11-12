import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sourceMap,sources } from '@/lib/sources';
import { allDossiers } from '@/lib/dossiers';
import { topicsFor } from '@/lib/search';
import { SourceDetail } from '@/components/source-detail';
import { Share } from '@/components/personal';
import { pageMeta } from '@/lib/metadata';
type Props={params:Promise<{id:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return sources.map(({id})=>({id}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const s=sourceMap[(await params).id];
 return s?pageMeta(s.title+(s.kind==='Hadith'?' '+s.ref:''),s.reading,'/sources/'+s.id+'/'):{};
}
export default async function Page({params}:Props){
 const s=sourceMap[(await params).id];
 if(!s) notFound();
 const related=allDossiers.filter(d=>topicsFor(s.id).includes(d.id));
 return <div className="wrap section"><article className="article">
 <p><Link prefetch={false} href="/bibliotheque/">Bibliothèque</Link></p><p className="kicker">{s.kind}</p><h1>{s.title} {s.kind==='Hadith'?s.ref:''}</h1>
 <div className="actions no-print"><Share/><Link prefetch={false} href={'/outils/?gauche='+s.id+'#comparateur'}>Comparer cette source</Link></div>
 <section aria-label="Fiche de la source"><SourceDetail source={s}/></section>
 {related.length>0&&<section><h2>Dossiers associés</h2><ul>{related.map(d=><li key={d.id}><Link prefetch={false} href={'/dossiers/'+d.id+'/'}>{d.short}</Link></li>)}</ul></section>}
 </article></div>;
}
