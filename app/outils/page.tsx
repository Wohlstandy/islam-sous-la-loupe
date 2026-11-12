import { Suspense } from 'react';
import { Comparator,Timeline,ConceptMap,Quiz } from '@/components/research-tools';
import { Carnet } from '@/components/personal';
import { Citations } from '@/components/citations';
import { allDossiers } from '@/lib/dossiers';
import { glossary } from '@/lib/tools-data';
import { pageMeta } from '@/lib/metadata';
export const metadata=pageMeta('Outils de recherche','Comparateur, frise, carte conceptuelle, quiz, glossaire et carnet privé.','/outils/');
const sections=[['comparateur','Comparateur'],['frise','Frise'],['carte','Carte conceptuelle'],['quiz','Quiz'],['glossaire','Glossaire'],['carnet','Carnet privé']];
export default function Page(){return <div className="wrap section">
 <h1>Outils de recherche</h1><nav className="tabs" aria-label="Outils sur cette page">{sections.map(([id,label])=><a key={id} className="button button-outline" href={'#'+id}>{label}</a>)}</nav>
 <section className="tool-section" id="comparateur"><h2>Comparateur de sources</h2><p>Choisissez deux textes ou lectures et examinez leur contexte côte à côte.</p><Suspense fallback={<p>Chargement du comparateur…</p>}><Comparator/></Suspense></section>
 <section className="tool-section" id="frise"><h2>Frise chronologique</h2><Timeline/></section>
 <section className="tool-section" id="carte"><h2>Cartographie conceptuelle</h2><ConceptMap/></section>
 <section className="tool-section" id="quiz"><h2>Quiz documentaire</h2><Quiz/></section>
 <section className="tool-section" id="glossaire"><h2>Glossaire</h2><dl className="grid-cards">{glossary.map(([term,definition,refs])=><div className="card" key={term}><dt className="font-bold">{term}</dt><dd>{definition}<Citations ids={[...refs]}/></dd></div>)}</dl></section>
 <section className="tool-section" id="carnet"><h2>Carnet privé</h2><Carnet titles={Object.fromEntries(allDossiers.map(d=>[d.id,d.title]))}/></section>
 </div>}
