import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allDossiers,dossierMap } from '@/lib/dossiers';
import { sourceMap } from '@/lib/sources';
import { annulatifs, epistleTranslations, epistleClosing } from '@/lib/annulatifs';
import { epistleArabic,epistleEdition } from '@/lib/nawaqid-ar';
import { TextSection,Citations } from '@/components/citations';
import { Reading } from '@/components/personal';
import { pageMeta } from '@/lib/metadata';
type Props={params:Promise<{id:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return allDossiers.map(({id})=>({id}));}
export async function generateMetadata({params}:Props){
 const d=dossierMap[(await params).id];
 return d?pageMeta(d.title,d.question,'/dossiers/'+d.id+'/'):{};
}
export default async function Page({params}:Props){
 const d=dossierMap[(await params).id];
 if(!d) notFound();
 const ids=[...new Set([...d.sources,...(d.id==='annulatifs'?annulatifs.flatMap(item=>item.refs):[])])];
 const primary=ids.map(id=>sourceMap[id]).filter(s=>s.kind==='Coran'||s.kind==='Hadith'||s.id==='nawaqid'||s.kind==='Droit international');
 return <div className="wrap section"><Reading id={d.id}>
 <p className="no-print"><Link prefetch={false} href="/dossiers/">Tous les dossiers</Link></p><p className="kicker">{d.category}</p><h1>{d.title}</h1>
 <section><h2>Question étudiée</h2><p>{d.question}</p><span className="tag warn">Sujet controversé</span></section>
 <TextSection title="Résumé factuel" paragraph={d.summary}/>
 <section><h2>Sources primaires</h2><ul>{primary.map(s=><li key={s.id}><Link prefetch={false} href={'/sources/'+s.id+'/'}>{s.title} {s.kind==='Hadith'?s.ref:''}</Link> <span className="tag">{s.status}</span></li>)}</ul>
 <p className="no-print"><Link prefetch={false} href={'/bibliotheque/?topic='+d.id}>Filtrer la bibliothèque sur ce dossier</Link></p></section>
 <section><h2>Traductions et résumés</h2><div className="stack">{primary.map(s=><div className="card" key={s.id}>
 <h3><Link prefetch={false} href={'/sources/'+s.id+'/'}>{s.title} {s.kind==='Hadith'?s.ref:''}</Link></h3>
 {s.original&&<blockquote lang="ar" dir="rtl" className="arabic">{s.original}</blockquote>}
 <p><strong>{s.translationKind==='traduction'?'Traduction de travail':'Résumé en français'}</strong></p><p>{s.translation}</p><small>{s.translationCredit}</small>{s.originalCredit&&<p><small>Texte arabe : <a href={s.originalCreditUrl}>{s.originalCredit}</a></small></p>}</div>)}</div></section>
 {d.id==='annulatifs'&&<section><h2>Les dix articles de l’épître</h2>
 <p>Texte arabe de la transcription Wikisource, révision 496757, et traductions de travail. Les versets en regard incluent des parallèles proposés par la rédaction. La ponctuation et certains mots varient selon les éditions.</p>
 <p><a href={epistleEdition}>Transcription arabe de référence</a></p><ol className="stack">{annulatifs.map(({title,refs,comment},i)=><li key={title} id={'article-'+(i+1)} className="card annulatifs">
 <h3><a href={'#article-'+(i+1)}>{i+1}. {title}</a></h3><blockquote lang="ar" dir="rtl" className="arabic">{epistleArabic[i]}</blockquote><p><strong>Traduction de travail</strong></p><p>{epistleTranslations[i]}</p><p><strong>Lecture documentaire</strong></p><p>{comment}</p>
 <Citations ids={['nawaqid',...refs]}/><p className="muted">À documenter pour cet article : hadiths spécifiques, lectures des écoles et conditions d’application à une personne.</p>
 </li>)}</ol><h3 className="mt-6">Conclusion de l’épître</h3><blockquote lang="ar" dir="rtl" className="arabic">{epistleArabic[10]}</blockquote><p>{epistleClosing}</p></section>}
 <TextSection title="Contexte historique" paragraph={d.history}/>
 <TextSection title="Interprétations classiques" paragraph={d.classical} badge="Interprétation juridique"/>
 <TextSection title="Divergences doctrinales" paragraph={d.divergences}/>
 <TextSection title="Analyse critique" paragraph={d.critique} badge="Analyse critique"/>
 <TextSection title="Lectures contemporaines" paragraph={d.modern}/>
 <section><h2>Bibliographie</h2><ol>{ids.map(id=>{const s=sourceMap[id];return <li key={id}>{s.author}, <cite>{s.title}</cite>, {s.ref}. <a href={s.url}>Publication d’origine</a> <span className="print-url">{s.url}</span>{!s.checked&&<span className="tag warn">Référence à vérifier</span>}</li>;})}</ol></section>
 <section className="notice"><h2>À vérifier ou à approfondir</h2><ul>{d.gaps.map(g=><li key={g}>{g}</li>)}</ul></section>
 <p className="no-print"><Link prefetch={false} href={'/methode/?dossier='+d.id+'#correction'}>Signaler une erreur dans ce dossier</Link></p>
 </Reading></div>;
}
