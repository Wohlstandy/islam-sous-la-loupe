import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Catalogue } from '@/components/catalogue';
export const metadata:Metadata={title:'Bibliothèque',description:'Rechercher et filtrer des versets, des hadiths, des traités et des études.'};
export default function Page(){return <div className="wrap section"><p className="kicker">Bibliothèque documentaire</p><h1>Explorer les sources</h1><p className="muted">Parcourez les références et leurs textes d’origine. La recherche ignore les accents et les majuscules.</p><Suspense fallback={<p>Chargement de la recherche…</p>}><Catalogue/></Suspense></div>}
