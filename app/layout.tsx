import './globals.css';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { Theme } from '@/components/theme';
import { basePath } from '@/lib/model';
const title='Islam sous la loupe';
const description='Textes, doctrines, histoire et liberté de conscience.';
export const metadata:Metadata={
 metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'),
 title:{default:title,template:'%s | '+title},description,
 openGraph:{title,description,locale:'fr_FR',type:'website',url:basePath+'/'},
};
export default function Layout({children}:{children:React.ReactNode}) {
 return <html lang="fr" suppressHydrationWarning><body>
 <a href="#contenu" className="skip">Aller au contenu</a>
 <header className="site-header"><div className="wrap header-row">
 <Link prefetch={false} className="wordmark" href="/"><BookOpen size={22} aria-hidden/> Islam sous la loupe</Link>
 <nav aria-label="Navigation principale"><Link prefetch={false} href="/dossiers/">Dossiers</Link><Link prefetch={false} href="/bibliotheque/">Bibliothèque</Link><Link prefetch={false} href="/outils/">Outils</Link><Link prefetch={false} href="/conscience/">Liberté de conscience</Link></nav>
 <Theme/></div></header>
 <main id="contenu" tabIndex={-1}>{children}</main>
 <footer className="foot"><div className="wrap header-row"><span>Islam sous la loupe</span><nav aria-label="Liens éditoriaux"><Link prefetch={false} href="/methode/">Méthode et corrections</Link><Link prefetch={false} href="/outils/#carnet">Carnet privé</Link></nav></div></footer>
 </body></html>;
}
