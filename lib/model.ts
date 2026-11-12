export type SourceKind = 'Coran' | 'Hadith' | 'Traité' | 'Droit international' | 'Étude';
export type Verification = 'Source primaire vérifiée' | 'Interprétation juridique' | 'Étude vérifiée' | 'Référence à vérifier';
export type Period = 'VIIe siècle' | 'IXe siècle' | 'Moyen Âge' | 'XVIIIe siècle' | 'Époque contemporaine';
export type Source = {
  id: string; kind: SourceKind; author: string; title: string; ref: string;
  url: string; period: Period; status: Verification; checked: string | null;
  context: string; school: string; original?: string; translation?: string;
  translationCredit?: string; originalCredit?: string; originalCreditUrl?: string; translationKind?: "traduction" | "résumé"; reading: string; limitation?: string;
};
export type Paragraph = { text: string; refs: string[] };
export type Dossier = {
  id: string; title: string; short: string; category: string; question: string;
  summary: Paragraph; sources: string[]; history: Paragraph; classical: Paragraph;
  divergences: Paragraph; critique: Paragraph; modern: Paragraph; gaps: string[];
};
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const reportUrl = process.env.NEXT_PUBLIC_REPOSITORY_URL
  ? process.env.NEXT_PUBLIC_REPOSITORY_URL.replace(/\/$/, '') + '/issues/new'
  : null;
