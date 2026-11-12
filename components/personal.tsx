'use client';
import { useEffect,useState,type ReactNode } from 'react';
import { Bookmark, BookOpen, Link2, Printer } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

type Note={id:string;text:string};
type Personal={favorites:string[];notes:Note[]};
const key='loupe:carnet:v1';
const empty:Personal={favorites:[],notes:[]};
function load():Personal{
 const raw=localStorage.getItem(key);
 if(!raw) return empty;
 try{
  const data=JSON.parse(raw) as Partial<Personal>|null;
  return {favorites:Array.isArray(data?.favorites)?data.favorites.filter(id=>typeof id==='string'):[],
   notes:Array.isArray(data?.notes)?data.notes.filter(note=>note&&typeof note.id==='string'&&typeof note.text==='string'):[]};
 }catch{return empty;}
}
function useCarnet(){
 const [data,setData]=useState(empty);
 const [error,setError]=useState('');
 useEffect(()=>{
  function sync(){try{setData(load());}catch{setError('Le stockage local est indisponible.');}}
  sync();window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);
 },[]);
 function save(update:(current:Personal)=>Personal){
  try{const value=update(load());localStorage.setItem(key,JSON.stringify(value));setData(value);setError('');return true;}
  catch{setError('La sauvegarde locale a échoué.');return false;}
 }
 return {data,save,error};
}
export function Share(){
 const [message,setMessage]=useState('');
 const [fallback,setFallback]=useState('');
 async function copy(){
  try{await navigator.clipboard.writeText(location.href);setMessage('Lien copié.');setFallback('');}
  catch{setFallback(location.href);setMessage('Copiez le lien ci-dessous.');}
 }
 return <><Button variant="outline" onClick={copy}><Link2 size={17} aria-hidden/> Copier le lien</Button><span role="status">{message}</span>
 {fallback&&<label className="field">Lien direct<input readOnly value={fallback} onFocus={e=>e.currentTarget.select()}/></label>}</>;
}
export function Reading({id,children}:{id:string;children:ReactNode}){
 const [reading,setReading]=useState(false);
 const {data,save,error}=useCarnet();
 const [draft,setDraft]=useState<string|null>(null);
 const [message,setMessage]=useState('');
 const favored=data.favorites.includes(id);
 const note=data.notes.find(n=>n.id===id)?.text??'';
 return <div className="reading-area" data-reading={reading}><article className="article" data-reading={reading}>
 <div className="actions no-print mb-4">
  <Button variant="outline" aria-pressed={reading} onClick={()=>setReading(!reading)}><BookOpen size={17} aria-hidden/> Mode lecture</Button>
  <Button variant="outline" aria-pressed={favored} onClick={()=>save(state=>({...state,favorites:state.favorites.includes(id)?state.favorites.filter(f=>f!==id):[...state.favorites,id]}))}><Bookmark size={17} aria-hidden/> Favori</Button>
  <Button variant="outline" onClick={()=>window.print()}><Printer size={17} aria-hidden/> Imprimer / PDF</Button>
  <Share/>
 </div>{children}
 <section className="tools-interactive" aria-labelledby="note-titre"><h2 id="note-titre">Note personnelle</h2>
 <p>Enregistrée dans ce navigateur. Une personne qui utilise le même profil peut y accéder.</p>
 <label className="field">Votre note<textarea rows={4} value={draft??note} onChange={event=>{setDraft(event.target.value);setMessage('');}}/></label>
 <div className="actions mt-3"><Button onClick={()=>{
  const text=(draft??note).trim();
  if(save(state=>({...state,notes:[...state.notes.filter(n=>n.id!==id),...(text?[{id,text}]:[])]}))){
   setDraft(null);setMessage(text?'Note enregistrée.':'Note effacée.');
  }
 }}>Enregistrer la note</Button><Link prefetch={false} href="/outils/#carnet">Ouvrir le carnet</Link></div><p role="status">{message}</p>
 </section>{error&&<p role="alert" className="no-print">{error}</p>}</article></div>;
}
export function Carnet({titles}:{titles:Record<string,string>}){
 const {data,save,error}=useCarnet();
 function exportNotes(){
  const blob=new Blob([JSON.stringify(data.notes.map(note=>({dossier:note.id,titre:titles[note.id]??note.id,note:note.text})),null,2)],{type:'application/json;charset=utf-8'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='notes-islam-sous-la-loupe.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 return <>
 <p className="muted">Les favoris et les notes sont stockés dans ce navigateur. Vous pouvez les retirer ou télécharger vos notes.</p>
 <h3>Favoris</h3>{data.favorites.length?<ul className="plain-list">{data.favorites.filter(id=>titles[id]).map(id=><li key={id}><Link prefetch={false} href={'/dossiers/'+id+'/'}>{titles[id]}</Link> <Button variant="outline" aria-label={'Retirer '+titles[id]+' des favoris'} onClick={()=>save(s=>({...s,favorites:s.favorites.filter(f=>f!==id)}))}>Retirer</Button></li>)}</ul>:<p>Aucun favori.</p>}
 <h3 className="mt-5">Notes</h3>{data.notes.length?<div className="stack">{data.notes.map(n=><article className="card" key={n.id}><Link prefetch={false} href={'/dossiers/'+n.id+'/'}>{titles[n.id]??n.id}</Link><p className="whitespace-pre-wrap">{n.text}</p><Button variant="outline" aria-label={'Supprimer la note de '+(titles[n.id]??n.id)} onClick={()=>save(s=>({...s,notes:s.notes.filter(note=>note.id!==n.id)}))}>Supprimer</Button></article>)}</div>:<p>Aucune note.</p>}
 <Button variant="outline" className="mt-3" disabled={!data.notes.length} onClick={exportNotes}>Exporter les notes (JSON)</Button>
 {error&&<p role="alert">{error}</p>}
 </>;
}
