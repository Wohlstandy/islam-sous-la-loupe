import { reportUrl } from '@/lib/model';
import { pageMeta } from '@/lib/metadata';
export const metadata=pageMeta('Méthode et corrections','Critères de vérification, limites du corpus et signalement des erreurs.','/methode/');
export default function Page(){return <div className="wrap section"><article className="article">
 <h1>Méthode et corrections</h1>
 <section><h2>Lire les fiches</h2><ul><li><strong>Source primaire vérifiée.</strong> Référence identifiée dans un texte ou une publication consultable. Pour un hadith, l’indicateur porte sur sa présence dans le recueil et sa numérotation.</li><li><strong>Interprétation juridique.</strong> Position attribuée à un traité ou à un commentateur, à situer dans sa tradition.</li><li><strong>Étude vérifiée.</strong> Publication identifiée. Les conclusions restent attribuées à leur auteur.</li><li><strong>Référence à vérifier.</strong> Passage, édition ou correspondance à confirmer avant de citer.</li></ul></section>
 <section><h2>Principes éditoriaux</h2><p>Le site examine les doctrines, les textes et leurs usages. Il traite les croyants et les non-croyants avec la même dignité. Les résumés rédactionnels, les traductions de travail, les lectures historiques et les analyses critiques sont identifiés dans les dossiers.</p><p>Les liens d’origine donnent accès aux éditions et à leurs traductions. Le corpus reproduit seulement des extraits et fournit des résumés propres au site.</p></section>
 <section id="correction"><h2>Signaler une erreur</h2><p>Indiquez l’adresse de la fiche ou du dossier, le passage à corriger et une référence vérifiable. Les signalements GitHub d’un dépôt public sont publics. Évitez d’y joindre des informations personnelles.</p>
 {reportUrl?<a className="button button-primary" href={reportUrl}>Ouvrir un signalement sur GitHub</a>:<p className="notice">Le lien de signalement sera activé lors de la configuration du dépôt GitHub.</p>}</section>
 </article></div>}
