import MiniSearch from 'minisearch';
import { allDossiers } from './dossiers';
import { annulatifs } from './annulatifs';
import { sources,sourceMap } from './sources';

export const normalize=(value:string)=>value.toLowerCase().normalize('NFKD').replace(/\p{M}/gu,'').replace(/[–—]/g,'-').trim();
const topicsBySource = new Map<string,string[]>();
for (const dossier of allDossiers) {
 for (const id of dossier.sources) topicsBySource.set(id,[...(topicsBySource.get(id)??[]),dossier.id]);
}
for (const article of annulatifs) for(const id of article.refs) topicsBySource.set(id,[...new Set([...(topicsBySource.get(id)??[]),'annulatifs'])]);
export const topicsFor=(id:string)=>topicsBySource.get(id)??[];
const index=new MiniSearch({fields:['title','ref','author','body','topics'],processTerm:normalize});
index.addAll(sources.map(s=>({id:s.id,title:s.title,ref:s.ref,author:s.author,
 body:[s.reading,s.original,s.context,s.school,s.period].filter(Boolean).join(' '),
 topics:allDossiers.filter(d=>topicsFor(s.id).includes(d.id)).map(d=>d.title+' '+d.category+' '+d.short).join(' '),
})));
export type Filters={q?:string;kind?:string;period?:string;author?:string;topic?:string;status?:string};
function matchesReference(source:{ref:string;kind:string},ref:string){
 if(source.ref===ref) return true;
 if(source.kind!=='Coran') return false;
 const query=/^(\d+):(\d+)$/.exec(ref);
 const range=/^(\d+):(\d+)-(\d+)$/.exec(source.ref);
 return !!query && !!range && query[1]===range[1] && Number(query[2])>=Number(range[2]) && Number(query[2])<=Number(range[3]);
}
export function findSources(filters:Filters){
 const q=normalize(filters.q??'').replace(/\s*:\s*/g,':');
 const words=q.replace(/^(?:coran\s+|quran\s+|hadith\s+)/,'');
 const reference=/^(?:(?:sahih\s+)?(?:al[ -])?(bukhari|muslim)[ :]+)?(\d+(?::\d+(?:-\d+)?|[a-z])?)$/.exec(words);
 const results=reference ? sources.filter(s=>matchesReference(s,reference[2]) && (!reference[1]||normalize(s.author).includes(reference[1])))
   : q ? index.search(q,{prefix:true,combineWith:'AND',boost:{ref:6,title:4,author:3,topics:1.5}}).map(result=>sourceMap[String(result.id)]) : sources;
 return results.filter(s=>(!filters.kind||s.kind===filters.kind)&&(!filters.period||s.period===filters.period)
  &&(!filters.author||s.author===filters.author)&&(!filters.status||s.status===filters.status)
  &&(!filters.topic||topicsFor(s.id).includes(filters.topic)));
}
