'use client';
import { useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ArrowUpRight } from 'lucide-react';
import { sources } from '@/lib/sources';
import { allDossiers } from '@/lib/dossiers';
import { findSources,type Filters } from '@/lib/search';
import { Button } from './ui/button';

const distinct=(key:'kind'|'period'|'author'|'status')=>[...new Set(sources.map(s=>s[key]))].sort((a,b)=>a.localeCompare(b,'fr')).map(value=>[value,value]);
const controls = [
 ['kind','Type de source',distinct('kind')],
 ['topic','Dossier',allDossiers.map(d=>[d.id,d.short])],
 ['author','Auteur',distinct('author')],
 ['period','Période',distinct('period')],
 ['status','Vérification',distinct('status')],
] as const;
export function Catalogue(){
 const url=useSearchParams();
 return <Results key={url.toString()} initial={Object.fromEntries(url)}/>;
}
function Results({initial}:{initial:Filters}){
 const [filters,setFilters]=useState(initial);
 const [q,setQ]=useState(initial.q??'');
 const [opened,setOpened]=useState<string[]>([]);
 const results=findSources(filters);
 function change(next:Filters){
  setFilters(next);
  const params=new URLSearchParams(Object.entries(next).filter(([,v])=>v));
  window.history.replaceState(window.history.state,'',window.location.pathname+(params.size?'?'+params:''));
 }
 function submit(event:FormEvent){event.preventDefault();change({...filters,q:q.trim()});}
 return <>
 <form role="search" onSubmit={submit} className="catalogue-search">
  <div className="searchform"><label className="sr-only" htmlFor="catalogue-q">Rechercher un texte</label><input id="catalogue-q" type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Ex. 2:256, Bukhari 3017, apostasie…"/><Button type="submit"><Search size={17} aria-hidden/> Rechercher</Button></div>
  <div className="filters">{controls.map(([key,label,options])=><label className="field" key={key}>{label}<select value={filters[key]??''} onChange={e=>change({...filters,q:q.trim(),[key]:e.target.value})}><option value="">Tout</option>{options.map(([value,name])=><option value={value} key={value}>{name}</option>)}</select></label>)}</div>
 </form>
 <div className="heading result-row"><p role="status">{results.length} {results.length===1?'source':'sources'}</p><div className="actions">
 {opened.length>0&&<Button variant="outline" onClick={()=>setOpened([])}>Tout replier</Button>}
 <Button variant="outline" onClick={()=>{setQ('');setOpened([]);change({});}}>Réinitialiser</Button>
 </div></div>
 {!results.length&&<p className="notice">Aucun résultat. Essayez un autre terme ou retirez un filtre.</p>}
 <div className="source-list">{results.map(s=><details className="source-result" key={s.id} open={opened.includes(s.id)} onToggle={event=>{
 const open=event.currentTarget.open;
 setOpened(previous=>open?(previous.includes(s.id)?previous:[...previous,s.id]):previous.filter(id=>id!==s.id));
 }}><summary><span><span className="tag">{s.kind}</span> <strong>{s.title}{s.kind==='Hadith'?' '+s.ref:''}</strong><small>{s.author} · {s.period}</small></span><ChevronDown size={19} aria-hidden/></summary>
 <div className="result-content"><span className={'tag '+(s.checked?'':'warn')}>{s.status}</span><p>{s.reading}</p><div className="actions"><Link prefetch={false} href={'/sources/'+s.id+'/'}>Fiche documentaire</Link><a href={s.url} className="inline-flex items-center gap-1">Édition ou publication <ArrowUpRight size={15} aria-hidden/></a></div></div>
 </details>)}</div>
 </>;
}
