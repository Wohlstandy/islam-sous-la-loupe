import type { Source, Period, SourceKind } from './model';
import { quranOriginal } from './tanzil';

const date = '2026-11-12';
const credit = 'Rédaction du site, traduction de travail si un extrait est reproduit, résumé dans les autres cas.';
const verses: [string,string,string?][] = [
 ['2:256','Le verset énonce l’absence de contrainte en religion.','Nulle contrainte en religion. La voie droite se distingue désormais de l’égarement. Quiconque rejette les fausses divinités et croit en Dieu a saisi l’anse la plus solide, qui ne se rompt pas. Dieu entend et sait.'],
 ['4:89','Le verset comporte un ordre de mise à mort dans une séquence sur des groupes hostiles. Lire également les exceptions du verset suivant.'],
 ['4:90','Le passage fait exception pour ceux qui se retirent du combat et offrent la paix.'],
 ['16:106','Le passage distingue la personne contrainte dont le cœur reste ferme de celle qui ouvre son cœur à la mécréance.'],
 ['18:29','Le verset évoque le choix de croire ou de ne pas croire, puis avertit d’un châtiment dans l’au-delà.'],
 ['65:4','Ce verset fixe notamment un délai d’attente de trois mois pour celles qui n’ont pas eu leurs règles.'],
 ['4:24','Ce verset contient une exception à l’interdiction des femmes mariées, formulée par la possession par la main droite.'],
 ['23:5-6','Le passage distingue les épouses et les personnes possédées dans un énoncé sur la chasteté.'],
 ['33:50','Ce verset adresse au Prophète une liste de catégories licites, comprenant des femmes asservies.'],
 ['70:29-30','Le passage emploie une formule parallèle à celle de Coran 23:5–6.'],
 ['24:2','Le passage prescrit cent coups pour le zinā.'],
 ['24:4','Le verset prévoit une sanction pour l’accusation portée sans quatre témoins.'],
 ['4:97-100','Le passage évoque l’émigration et excepte les personnes sans moyens et sans possibilité de trouver une voie.'],
 ['8:72','Le passage lie émigration, protection mutuelle et assistance, avec une exception liée aux pactes.'],
 ['5:72','Le verset associe le fait de donner un associé à Dieu à une conséquence dans l’au-delà.'],
 ['4:48','Le verset distingue l’association à Dieu des autres fautes en matière de pardon.'],
 ['39:3','Le verset rapporte l’argument de ceux qui disent adorer des protecteurs pour se rapprocher de Dieu.'],
 ['4:65','Le passage relie la foi à l’acceptation de l’arbitrage du Prophète.'],
 ['47:9','Le verset évoque la haine de ce que Dieu a révélé et l’annulation des œuvres.'],
 ['9:65-66','Le passage associe la moquerie de Dieu, de ses signes et de son messager à une rupture de foi.'],
 ['2:102','Le passage évoque l’apprentissage de pratiques de sorcellerie et leurs effets, notamment la séparation entre époux.'],
 ['5:51','Le passage emploie awliyāʾ à propos de juifs et de chrétiens. Le terme peut évoquer des rapports de protection ou d’alliance.'],
 ['18:65-82','Moïse suit un serviteur dont les actes reçoivent une explication dans le récit.'],
 ['32:22','Le verset condamne le détournement après le rappel des signes du Seigneur.'],
 ['4:3','Le verset évoque plusieurs épouses et une condition d’équité, dans un passage qui commence par les orphelins.'],
 ['4:11','Le verset fixe certaines parts successorales des enfants et des parents.'],
 ['2:282','Le verset porte sur la mise par écrit d’une dette à terme et la désignation de témoins.'],
 ['4:135','Le verset demande de témoigner avec justice, y compris contre soi-même ou ses proches.'],
 ['60:8-9','Le passage distingue les personnes qui ne combattent pas les croyants de celles qui les combattent ou les expulsent.'],
 ['90:13','L’affranchissement figure parmi les actes qui décrivent la voie difficile.'],
 ['9:6','Le verset prévoit la protection et la conduite en lieu sûr du polythéiste qui demande asile.'],
];
type RecordInput = [string,SourceKind,string,string,string,string,Period,string,string,string,string?,string?];
const workTranslations:Record<string,string> = {
 '4:89':'Ils voudraient que vous mécroyiez comme ils ont mécru, pour que vous soyez pareils. Ne prenez donc parmi eux aucun allié avant qu’ils n’émigrent dans la voie de Dieu. S’ils se détournent, saisissez-les et tuez-les où que vous les trouviez. Ne prenez parmi eux ni allié ni soutien.',
 '4:90':'Sauf ceux qui rejoignent des gens liés à vous par un pacte, ou qui viennent à vous le cœur serré à l’idée de vous combattre ou de combattre les leurs. Si Dieu l’avait voulu, Il leur aurait donné pouvoir sur vous et ils vous auraient combattus. S’ils se tiennent à l’écart, ne vous combattent pas et vous offrent la paix, Dieu ne vous donne aucune voie contre eux.',
 '16:106':'Quiconque renie Dieu après avoir cru, sauf celui qui y est contraint alors que son cœur demeure ferme dans la foi. Ceux qui ouvrent leur cœur à la mécréance encourent une colère de Dieu et un immense châtiment.',
 '18:29':'Dis : la vérité vient de votre Seigneur. Que celui qui le veut croie et que celui qui le veut ne croie pas. Nous avons préparé pour les injustes un feu dont l’enceinte les cerne. S’ils demandent à boire, ils seront abreuvés d’une eau pareille à du métal fondu, qui brûle les visages. Quelle mauvaise boisson et quel mauvais séjour !',
 '65:4':'Pour celles de vos femmes qui n’espèrent plus avoir de règles, si vous êtes dans le doute, leur délai est de trois mois, de même pour celles qui n’ont pas eu leurs règles. Pour les femmes enceintes, le terme est l’accouchement. À qui craint Dieu, Il facilite son affaire.',
 '23:5-6':'Ceux qui préservent leur chasteté, sauf avec leurs épouses ou celles que possèdent leurs mains droites, auquel cas ils ne sont pas blâmables.',
 '70:29-30':'Ceux qui préservent leur chasteté, sauf avec leurs épouses ou celles que possèdent leurs mains droites, auquel cas ils ne sont pas blâmables.',
 '24:2':'La femme et l’homme coupables de zinā, infligez à chacun cent coups. Que la compassion pour eux ne vous retienne pas dans la religion de Dieu, si vous croyez en Dieu et au Jour dernier. Qu’un groupe de croyants assiste à leur châtiment.',
 '24:4':'Ceux qui accusent les femmes chastes et ne produisent pas quatre témoins, infligez-leur quatre-vingts coups. N’acceptez plus jamais leur témoignage. Ce sont eux les transgresseurs.',
};
const verseUrls:Record<string,string>={'5:72':'al-maidah/72','4:90':'an-nisa/90','23:5-6':'al-muminun/5-6','70:29-30':'al-maarij/29-30','4:97-100':'an-nisa/97-100','8:72':'al-anfal/72','47:9':'muhammad/9','9:65-66':'at-tawbah/65-66','18:65-82':'al-kahf/65-82','4:11':'an-nisa/11','60:8-9':'al-mumtahanah/8-9','90:13':'al-balad/13'};
const entries: RecordInput[] = [
 ['b1','Hadith','Al-Bukhari','Sahih al-Bukhari','1','https://sunnah.com/bukhari:1','IXe siècle','Premier récit du recueil, livre du début de la révélation.','Recueil sunnite','Le récit rattache les actes aux intentions et donne l’exemple de l’émigration.'],
 ['b2766','Hadith','Al-Bukhari','Sahih al-Bukhari','2766','https://sunnah.com/bukhari:2766','IXe siècle','Livre des testaments.','Recueil sunnite','Le récit énumère sept fautes destructrices, dont l’association à Dieu et la sorcellerie.'],
 ['b6104','Hadith','Al-Bukhari','Sahih al-Bukhari','6104','https://sunnah.com/bukhari:6104','IXe siècle','Livre des bonnes manières.','Recueil sunnite','Le récit avertit que l’accusation de mécréance adressée à son frère retombe sur l’un des deux.'],
 ['b3017','Hadith','Al-Bukhari','Sahih al-Bukhari','3017','https://sunnah.com/bukhari:3017','IXe siècle','Livre du jihad. Ibn ʿAbbās réagit à une mise à mort par le feu.','Recueil sunnite','Le récit attribue au Prophète un ordre de mise à mort pour celui qui change de religion.','مَنْ بَدَّلَ دِينَهُ فَاقْتُلُوهُ','Quiconque change de religion, tuez-le.'],
 ['b5134','Hadith','Al-Bukhari','Sahih al-Bukhari','5134','https://sunnah.com/bukhari:5134','IXe siècle','Livre du mariage. Récit rapporté d’Aïcha.','Recueil sunnite','Le récit donne six ans au contrat et neuf ans à la consommation.'],
 ['m1422a','Hadith','Muslim ibn al-Hajjaj','Sahih Muslim','1422a','https://sunnah.com/muslim:1422a','IXe siècle','Livre du mariage. Récit rapporté d’Aïcha.','Recueil sunnite','Cette variante donne six ans au mariage et neuf ans à la consommation.'],
 ['b5136','Hadith','Al-Bukhari','Sahih al-Bukhari','5136','https://sunnah.com/bukhari:5136','IXe siècle','Livre du mariage.','Recueil sunnite','Le récit distingue la consultation de la femme déjà mariée de la permission de la vierge, dont le silence est décrit comme un signe de permission.'],
 ['m1690a','Hadith','Muslim ibn al-Hajjaj','Sahih Muslim','1690a','https://sunnah.com/muslim:1690a','IXe siècle','Livre des peines légales.','Recueil sunnite','Le récit distingue les peines suivant le statut matrimonial et mentionne flagellation et lapidation.'],
 ['b2783','Hadith','Al-Bukhari','Sahih al-Bukhari','2783','https://sunnah.com/bukhari:2783','IXe siècle','Livre du jihad. Le récit se réfère à la conquête.','Recueil sunnite','Le récit annonce la fin d’une émigration après la conquête et maintient la référence à l’effort et à l’intention.'],
 ['kathir65','Traité','Ibn Kathir','Commentaire de Coran 65:4','Tafsīr, 65:4','https://quran.com/65:4/tafsirs/ar-tafsir-ibn-kathir','Moyen Âge','Commentaire coranique médiéval.','Sunnisme','Ibn Kathir comprend la formule comme incluant les filles trop jeunes pour avoir eu leurs règles.'],
 ['qudama','Traité','Ibn Qudama','Al-Mughni','Livre du jihad, chapitre sur l’émigration','https://www.islamweb.net/ar/library/content/15/6623/فصل-في-الهجرة','Moyen Âge','Traité juridique hanbalite.','Hanbalisme','Il distingue trois cas selon la capacité à partir et à pratiquer sa religion sur place.'],
 ['rushd','Traité','Ibn Rushd','Bidāyat al-mujtahid','Livre de la ḥirāba, cinquième chapitre','https://www.islamweb.net/amp/ar/library/content/97/780/الباب-الخامس-بماذا-تثبت-هذه-الجناية','Moyen Âge','Traité comparatif.','Malikisme','L’auteur oppose la majorité qu’il rapporte à Abū Ḥanīfa sur la mise à mort de la femme apostate.'],
 ['hanafi','Traité','Al-Marghinani','Bidāyat al-mubtadī','Chapitre sur les apostats','https://www.islamicbook.ws/asol/hanafi/bdait-almbtdi-001.html','Moyen Âge','Manuel hanafite.','Hanafisme','Le manuel prescrit la mise à mort de l’homme qui persiste et la détention de la femme jusqu’à son retour à l’islam.'],
 ['little','Étude','Joshua Little','The Hadith of ʿĀʾišah’s Marital Age','Thèse, Université d’Oxford','https://ora.ox.ac.uk/objects/uuid:1bdb0eea-3610-498b-9dfd-cffdb54b8b9b','Époque contemporaine','Étude des chaînes et des variantes textuelles.','Recherche historique','Little propose une genèse tardive du récit. Il s’agit d’une hypothèse défendue dans sa thèse.'],
 ['onu18','Droit international','Assemblée générale de l’ONU','Déclaration universelle des droits de l’homme','Articles 4, 16, 18 et 19','https://www.un.org/fr/about-us/universal-declaration-of-human-rights','Époque contemporaine','Déclaration adoptée en 1948.','ONU','L’article 18 protège notamment la liberté de changer de religion ou de conviction.'],
 ['onu-enfant','Droit international','Assemblée générale de l’ONU','Convention relative aux droits de l’enfant','Articles 1, 3, 19 et 24','https://www.ohchr.org/sites/default/files/Documents/ProfessionalInterest/crc.pdf','Époque contemporaine','Traité de 1989.','ONU','La Convention traite notamment de l’intérêt supérieur, de la protection contre les violences et de la santé de l’enfant.'],
 ['onu-pidcp','Droit international','Assemblée générale de l’ONU','Pacte international relatif aux droits civils et politiques','Articles 7, 18, 23 et 26','https://2covenants.ohchr.org/About-ICCPR.html','Époque contemporaine','Traité de 1966.','ONU','Le Pacte interdit les traitements cruels, exige le libre et plein consentement des futurs époux et protège la conscience et l’égalité devant la loi.'],
 ['onu22','Droit international','Comité des droits de l’homme de l’ONU','Observation générale nº 22','CCPR/C/21/Rev.1/Add.4, § 5','https://docs.un.org/CCPR/C/21/Rev.1/Add.4','Époque contemporaine','Interprétation de l’article 18 du Pacte.','ONU','Le Comité inclut le droit de conserver, remplacer ou adopter une conviction et celui d’adopter des vues athées.'],
 ['onu-esclavage','Droit international','Organisation des Nations unies','Convention supplémentaire relative à l’abolition de l’esclavage','1956, articles 1 et 7','https://treaties.un.org/doc/Publication/UNTS/Volume%20266/volume-266-I-3822-English.pdf','Époque contemporaine','Instrument international d’abolition.','ONU','La convention vise notamment des pratiques analogues à l’esclavage et reprend la définition fondée sur les attributs du droit de propriété.'],
 ['qudama-ridda','Traité','Ibn Qudama','Al-Mughni','Livre de l’apostasie, chapitre sur l’invitation au repentir','https://islamweb.net/ar/library/content/15/6182/الفصل-الثالث-المرتد-لا-يقتل-حتى-يستتاب-ثلاثا','Moyen Âge','Traité hanbalite, section sur le cas de la personne adulte et douée de raison.','Hanbalisme','Ibn Qudama rapporte une discussion sur l’invitation au repentir et le délai de trois jours.'],
 ['mundhir','Traité','Ibn al-Mundhir','Al-Awsat','Livre de l’apostasie, divergence sur le délai','https://www.islamweb.net/ar/library/content/1007/3662/ذكر-اختلاف-قول-من-رأى-أن-يستتاب-المرتد','Moyen Âge','Recueil comparatif d’avis juridiques.','Droit comparé','Mālik approuve un délai de trois jours dans le propos rapporté. L’avis cité d’al-Shāfiʿī relève l’absence d’une durée déterminée dans les récits invoqués.'],
 ['qudama-mariage','Traité','Ibn Qudama','Al-Mughni','Livre du mariage, section sur le tuteur autre que le père','https://www.islamweb.net/ar/library/content/15/4502/index.php','Moyen Âge','Comparaison des pouvoirs de tutelle dans un traité hanbalite.','Hanbalisme','Ibn Qudama rapporte d’Abū Ḥanīfa qu’un autre tuteur que le père peut conclure le contrat d’une fille mineure, avec une faculté de choix à la puberté. Il discute des avis qui limitent ce pouvoir.'],
 ['rushd-zina','Traité','Ibn Rushd','Bidāyat al-mujtahid','Livre du zinā, chapitre sur les peines','https://www.islamweb.net/ar/library/content/97/760/?idfrom=&idto=&start=','Moyen Âge','Traité comparatif sur les peines de zinā.','Malikisme','Ibn Rushd oppose la position majoritaire qu’il rapporte à celle de juristes qui cumulent flagellation et lapidation.'],
 ['kathir24','Traité','Ibn Kathir','Commentaire de Coran 4:24','Tafsīr, 4:24','https://quran.com/an-nisa/24/tafsirs/ar-tafsir-ibn-kathir','Moyen Âge','Commentaire coranique médiéval.','Sunnisme','Ibn Kathir associe l’exception à des femmes capturées et rapporte un récit concernant des captives d’Awṭās.'],
 ['nawaqid','Traité','Muhammad ibn Abd al-Wahhab (attribué)','Nawâqid al-Islâm','Neuvième épître, articles 1 à 10 et conclusion','https://shamela.org/gen/311d39b916bba8945b428ae964312e23_gen.pdf','XVIIIe siècle','Épître doctrinale attribuée à l’auteur najdi.','Tradition najdie','La conclusion réserve le cas de la personne contrainte. Les articles classent des actes ou convictions selon le cadre doctrinal de l’auteur.'],
];
export const sources:Source[] = [
 ...verses.map(([ref,reading,translation]):Source=>({
   id:'q'+ref.replace(':','-'),kind:'Coran',author:'Coran',title:'Coran '+ref,ref,url:'https://quran.com/'+(verseUrls[ref]??ref),
   period:'VIIe siècle',status:'Source primaire vérifiée',checked:date,context:'Lire le passage dans sa séquence et distinguer texte et commentaire.',
   school:'Texte coranique',original:quranOriginal[ref],originalCredit:'Tanzil Project, texte ʿuthmānī v1.1',originalCreditUrl:'https://tanzil.net/',translation:translation??workTranslations[ref]??reading,translationKind:(translation||workTranslations[ref])?'traduction':'résumé',translationCredit:credit,reading,
 })),
 ...entries.map(([id,kind,author,title,ref,url,period,context,school,reading,original,translation]):Source=>({
   id,kind,author,title,ref,url,period,context,school,reading,original,translation:translation??reading,translationKind:translation?'traduction':'résumé',translationCredit:credit,
   checked:date,status:kind==='Traité'?'Interprétation juridique':kind==='Étude'?'Étude vérifiée':'Source primaire vérifiée',
 })),
 {id:'qudama-ridda-piste',kind:'Traité',author:'Ibn Qudama',title:'Al-Mughni',ref:'Livre de l’apostasie, passage à localiser',
  url:'https://www.islamweb.net/ar/library/content/15/',period:'Moyen Âge',status:'Référence à vérifier',checked:null,
  context:'Piste bibliographique. Le lien ouvre l’ouvrage.',school:'Hanbalisme',reading:'Passage et édition à vérifier avant citation.'},
];
export const sourceMap = Object.fromEntries(sources.map(source=>[source.id,source])) as Record<string,Source>;
