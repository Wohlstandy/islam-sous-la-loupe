import Link from 'next/link';
import type { Source } from '@/lib/model';
export function SourceDetail({source,compact=false}:{source:Source;compact?:boolean}){
 const s=source;
 return <div className={compact?'card':''}>
 {compact&&<h2><Link prefetch={false} href={'/sources/'+s.id+'/'}>{s.title} {s.kind==='Hadith'?s.ref:''}</Link></h2>}
 <p><span className={'tag '+(s.checked?'':'warn')}>{s.status}</span></p>
 <dl className="source-meta"><div><dt>Identifiant</dt><dd>{s.id}</dd></div><div><dt>Auteur</dt><dd>{s.author}</dd></div><div><dt>Référence</dt><dd>{s.ref}</dd></div><div><dt>Période</dt><dd>{s.period}</dd></div><div><dt>Courant ou institution</dt><dd>{s.school}</dd></div><div><dt>Vérification documentaire</dt><dd>{s.checked?<time dateTime={s.checked}>{s.checked.split('-').reverse().join('/')}</time>:'En attente'}</dd></div></dl>
 <h3>Texte original</h3>{s.original?<blockquote lang="ar" dir="rtl" className="arabic">{s.original}</blockquote>:<p>Voir le texte dans la publication liée.</p>}
 {s.originalCredit&&<p><small>Texte arabe : <a href={s.originalCreditUrl}>{s.originalCredit}</a></small></p>}<h3>{s.translationKind==='traduction'?'Traduction de travail':'Résumé en français'}</h3><p>{s.translation??'En attente de vérification.'}</p>{s.translationCredit&&<small>{s.translationCredit}</small>}
 <h3 className="mt-4">Contexte et interprétation</h3><p>{s.context}</p><p>{s.reading}</p>
 {s.limitation&&<p className="notice">{s.limitation}</p>}
 <p><a className="underline" href={s.url}>Consulter la publication d’origine</a></p>
 </div>;
}
