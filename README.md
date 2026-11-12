# Islam sous la loupe

Textes, doctrines, histoire et liberté de conscience.

Bibliothèque critique en français avec dossiers sourcés, recherche et outils d’étude. L’interface s’inspire de [GodlyVerses](https://www.godlyverses.org/index.html?lang=FR&view=all) pour la navigation par thèmes, la recherche centrale et les fiches dépliables. Le code et le corpus ont été réalisés pour ce projet.

## Installation et lancement

Node.js 22 ou plus récent et npm sont nécessaires.

```sh
npm ci
npm run dev
```

Ouvrez [le site local](http://localhost:3000). Le corpus est intégré au projet. Les recherches, le thème, les notes et les favoris fonctionnent dans le navigateur sans API, compte ou base de données. La consultation des éditions externes nécessite Internet.

## Construction et tests

```sh
npm test
npm run typecheck
npm run build
npm run preview
```

L’export dans `out/` est servi à [l’adresse de prévisualisation](http://127.0.0.1:4173). Arrêtez le serveur avant de lancer les tests navigateur, qui démarrent leur propre instance.

```sh
npx playwright install chromium
npm run test:e2e
```

Les tests vérifient les références et liens internes du corpus, les requêtes, les filtres, le comparateur, la frise, le quiz, le carnet, le thème, la navigation clavier et le débordement horizontal. Les mêmes parcours sont exécutés sur des profils Chromium ordinateur et mobile, avec des contrôles axe sur les pages clés. Ces contrôles ne constituent pas un audit complet WCAG 2.2 AA.

## GitHub Pages

1. Créez ou choisissez le dépôt GitHub destiné au site. Placez le contenu de ce dossier à sa racine, y compris le dossier caché `.github/`. Poussez la branche `main`. Pour un autre nom de branche, adaptez le fichier `.github/workflows/pages.yml`.
2. Dans **Settings → Pages → Build and deployment**, sélectionnez **GitHub Actions**. Activez **Issues** dans les paramètres du dépôt pour permettre les signalements.
3. Dans **Actions → GitHub Pages**, lancez **Run workflow** si aucun déploiement n’a démarré après l’activation. L’adresse publiée figure dans le résultat du déploiement.

Le workflow installe les dépendances verrouillées, teste le corpus, produit l’export statique, exécute les parcours navigateur et publie `out/`. Il utilise le chemin et l’origine fournis par GitHub Pages. Aucun jeton à créer manuellement.

Pour un autre hébergeur, définissez avant compilation `NEXT_PUBLIC_SITE_URL` (origine, sans chemin), `NEXT_PUBLIC_BASE_PATH` (vide à la racine ou chemin du projet commençant par `/`, sans barre finale) et éventuellement `NEXT_PUBLIC_REPOSITORY_URL` (lien du dépôt). Utilisez le même chemin de base pour l’aperçu et les tests. Les métadonnées, la carte du site et les liens profonds sont générés au build.

Références techniques : [export statique Next.js](https://nextjs.org/docs/app/guides/static-exports) et [workflow GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Architecture

| Dossier | Contenu |
| --- | --- |
| `app/` | Routes App Router, pages exportées par identifiant, styles, métadonnées, sitemap et robots |
| `components/` | Navigation, catalogue, citations, fiches, comparateur, carnet et éléments UI de style shadcn/ui |
| `lib/` | Modèles TypeScript, sources, dossiers, index MiniSearch, frise, glossaire et quiz |
| `tests/` | Intégrité documentaire, recherche et parcours Playwright |
| `.github/workflows/` | Construction, tests et publication GitHub Pages |

Les styles utilisent Tailwind et des variables CSS pour les couleurs, la typographie et les états interactifs. Les composants utilisent Lucide pour les icônes et Framer Motion pour une animation discrète compatible avec la préférence de réduction des mouvements.

## Corpus et contributions

Ajoutez une fiche à `lib/sources.ts` avec un identifiant stable, une référence vérifiable et le statut adapté. Reliez-la aux dossiers dans `lib/dossiers.ts`. Identifiez la portée de la vérification, la période et le courant de l’auteur. Un passage en attente doit avoir le statut **Référence à vérifier** et une date de vérification vide. Le statut d’un hadith dans cette bibliothèque décrit sa localisation dans un recueil et ne tranche pas son historicité.

Les six dossiers principaux constituent un corpus initial. Les dix notices complémentaires présentent des points de départ. La page des annulatifs donne les dix articles arabes et la conclusion dans la transcription du domaine public de Wikisource (révision 496757), avec des traductions de travail. Le texte coranique arabe est reproduit sans modification, verset par verset, depuis le corpus ʿuthmānī v1.1 du [Tanzil Project](https://tanzil.net/). La notice de licence est incluse dans le fichier de données. Les travaux de collation et les comparaisons encore nécessaires sont signalés dans les dossiers. Les traductions des éditions externes sont accessibles via leurs liens. Les résumés et traductions de travail sont identifiés comme tels.

Le bouton **Imprimer / PDF** ouvre la boîte d’impression du navigateur. Choisissez **Enregistrer au format PDF** pour obtenir le dossier avec sa bibliographie. Les notes sont exportées séparément en JSON et restent en clair dans le stockage du navigateur. L’application ne comporte ni formulaire d’identité religieuse ni suivi analytique applicatif.

Les corrections peuvent être proposées via la page **Méthode et corrections**, reliée aux Issues lorsque le dépôt est configuré. Joignez la référence et le passage concerné.
