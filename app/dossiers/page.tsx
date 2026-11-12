import type { Metadata } from 'next';
import { DossierCards } from '@/components/cards';
import { allDossiers,dossiers } from '@/lib/dossiers';
export const metadata:Metadata={title:'Dossiers documentaires',description:'Enquêtes et notices sur les textes, les doctrines et le droit.'};
export default function Page(){return <div className="wrap section"><h1>Dossiers documentaires</h1><section className="section"><h2 className="mb-5">Dossiers principaux</h2><DossierCards items={dossiers}/></section><section><h2 className="mb-5">Notices thématiques</h2><DossierCards items={allDossiers.slice(dossiers.length)}/></section></div>}
