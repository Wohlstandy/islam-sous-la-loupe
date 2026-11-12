import Link from 'next/link';
import { sourceMap } from '@/lib/sources';
import type { Paragraph } from '@/lib/model';
export function Citations({ids}:{ids:string[]}){
 return ids.length>0&&<ul className="citation-list" aria-label="Références">{[...new Set(ids)].map(id=>{
 const s=sourceMap[id];
 return <li key={id}><Link prefetch={false} href={'/sources/'+id+'/'}>{s.title}{s.kind==='Hadith'?' '+s.ref:''}</Link></li>;
 })}</ul>;
}
export function TextSection({title,paragraph,badge}:{title:string;paragraph:Paragraph;badge?:string}){
 return <section><h2>{title}</h2>{badge&&<span className="tag">{badge}</span>}<p>{paragraph.text}</p><Citations ids={paragraph.refs}/></section>;
}
