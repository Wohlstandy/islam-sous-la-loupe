import type { MetadataRoute } from 'next';
import { origin } from '@/lib/metadata';
import { basePath } from '@/lib/model';
import { sources } from '@/lib/sources';
import { allDossiers } from '@/lib/dossiers';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{
 return ['/','/dossiers/','/bibliotheque/','/outils/','/conscience/','/methode/',...allDossiers.map(d=>'/dossiers/'+d.id+'/'),...sources.map(s=>'/sources/'+s.id+'/')].map(path=>({url:origin+basePath+path}));
}
