import Link from 'next/link';
export default function NotFound(){return <div className="wrap section"><h1>Page introuvable</h1><p><Link prefetch={false} href="/">Retour à l’accueil</Link></p></div>}
