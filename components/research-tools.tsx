'use client';
import { useState,useId } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { allDossiers } from '@/lib/dossiers';
import { sources,sourceMap } from '@/lib/sources';
import { topicsFor } from '@/lib/search';
import { timeline,quiz } from '@/lib/tools-data';
import { SourceDetail } from './source-detail';
import { Citations } from './citations';
import { Button } from './ui/button';

export function Comparator(){
 const params=useSearchParams();
 const [left,setLeft]=useState(params.get('gauche')??'q2-256');
 const [right,setRight]=useState(params.get('droite')??'b3017');
 const pair=[['Source de gauche',sources.find(s=>s.id===left)??sourceMap['q2-256'],setLeft],['Source de droite',sources.find(s=>s.id===right)??sourceMap.b3017,setRight]] as const;
 return <div className="compare-grid">{pair.map(([label,source,update])=><div className="stack compare-column" key={label}>
  <label className="field">{label}<select value={source.id} onChange={event=>update(event.target.value)}>{sources.map(s=><option value={s.id} key={s.id}>{s.title} · {s.ref}</option>)}</select></label>
  <SourceDetail source={source} compact/>
 </div>)}</div>;
}
export function Timeline(){
 const [period,setPeriod]=useState('');
 return <>
 <label className="field timeline-filter">Période de la frise<select value={period} onChange={e=>setPeriod(e.target.value)}><option value="">Toutes</option>{timeline.map(t=><option key={t.when}>{t.when}</option>)}</select></label>
 <ol className="timeline">{timeline.filter(t=>!period||t.when===period).map(t=><li key={t.when}><p className="kicker">{t.when}</p><h3>{t.title}</h3><p>{t.detail}</p><Citations ids={t.refs}/></li>)}</ol>
 </>;
}
export function ConceptMap(){
 const [topic,setTopic]=useState('apostasie');
 const related=sources.filter(s=>topicsFor(s.id).includes(topic));
 const authors=[...new Set(related.map(s=>s.author))];
 const title=allDossiers.find(d=>d.id===topic)?.short;
 return <>
 <label className="field timeline-filter">Dossier à cartographier<select value={topic} onChange={e=>setTopic(e.target.value)}>{allDossiers.map(d=><option key={d.id} value={d.id}>{d.short}</option>)}</select></label>
 <div className="concept-map">
  <div className="card"><h3>Doctrine ou thème</h3><p><Link prefetch={false} href={'/dossiers/'+topic+'/'}>{title}</Link></p></div>
  <div className="card"><h3>Textes associés</h3><Citations ids={related.map(s=>s.id)}/></div>
  <div className="card"><h3>Auteurs et institutions</h3><ul className="plain-list">{authors.map(author=><li key={author}><Link prefetch={false} href={'/bibliotheque/?'+new URLSearchParams({author,topic})}>{author}</Link></li>)}</ul></div>
 </div>
 </>;
}
function Question({item,index}:{item:typeof quiz[number];index:number}){
 const name=useId();
 const [choice,setChoice]=useState<number|null>(null);
 const [submitted,setSubmitted]=useState(false);
 return <fieldset className="card quiz-card"><legend>{index+1}. {item.question}</legend>
 {item.choices.map((value,i)=><label key={value} className="quiz-option"><input name={name} type="radio" checked={choice===i} onChange={()=>{setChoice(i);setSubmitted(false);}}/>{value}</label>)}
 <Button variant="outline" disabled={choice===null} onClick={()=>setSubmitted(true)}>Vérifier la réponse</Button>
 {submitted&&<div><p role="status">{choice===item.answer?'Réponse correcte.':'Réponse attendue : '+item.choices[item.answer]+'.'} {item.why}</p><Citations ids={item.refs}/></div>}
 </fieldset>;
}
export function Quiz(){return <div className="stack">{quiz.map((item,index)=><Question key={item.question} item={item} index={index}/>)}</div>;}
