import { test,expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Recherche, filtres, dépliage et lien vers la source',async({page})=>{
 const failed:string[]=[];
 page.on('response',response=>{
  if(new URL(response.url()).hostname==='127.0.0.1'&&response.status()>=400) failed.push(response.url());
 });
 await page.goto('./');
 await expect(page.getByRole('heading',{level:1})).toContainText('Explorez les textes');
 await page.getByRole('searchbox').fill('Bukhari 3017');
 await page.getByRole('button',{name:'Rechercher'}).click();
 await expect(page.getByRole('status')).toHaveText('1 source');
 await page.locator('summary').filter({hasText:'3017'}).click();
 await expect(page.getByRole('link',{name:'Fiche documentaire'})).toBeVisible();
 await page.getByRole('link',{name:'Fiche documentaire'}).click();
 await expect(page.locator('[lang=ar][dir=rtl]')).toBeVisible();
 await page.goto('bibliotheque/?topic=apostasie');
 await page.getByLabel('Type de source').selectOption('Hadith');
 await expect(page.getByRole('status')).toHaveText('1 source');
 await expect(page).toHaveURL(/kind=Hadith/);
 await page.reload();
 await expect(page.getByRole('status')).toHaveText('1 source');
 await page.getByRole('button',{name:'Réinitialiser'}).click();
 await expect(page.getByRole('status')).not.toHaveText('1 source');
 expect(failed).toEqual([]);
});

test('Carnet, lecture, export et dix articles',async({page})=>{
 await page.goto('dossiers/annulatifs/');
 await expect(page.locator('.annulatifs')).toHaveCount(10);
 await page.getByRole('button',{name:'Mode lecture'}).click();
 await expect(page.getByRole('textbox',{name:'Votre note'})).toBeHidden();
 await page.getByRole('button',{name:'Mode lecture'}).click();
 await page.getByRole('button',{name:'Favori',exact:true}).click();
 await page.getByRole('textbox',{name:'Votre note'}).fill('Note documentaire de test');
 await page.getByRole('button',{name:'Enregistrer la note'}).click();
 await expect(page.getByText('Note enregistrée.')).toBeVisible();
 await page.goto('outils/#carnet');
 const carnet=page.locator('#carnet');
 await expect(carnet.getByRole('link',{name:'Les dix annulatifs de l’islam'}).first()).toBeVisible();
 await expect(carnet.getByText('Note documentaire de test')).toBeVisible();
 const download=page.waitForEvent('download');
 await carnet.getByRole('button',{name:'Exporter les notes (JSON)'}).click();
 expect((await download).suggestedFilename()).toBe('notes-islam-sous-la-loupe.json');
 await carnet.getByRole('button',{name:/Supprimer la note/}).click();
 await expect(carnet.getByText('Aucune note.')).toBeVisible();
});

test('Comparateur, frise, carte et quiz',async({page})=>{
 await page.goto('outils/?gauche=m1422a');
 await expect(page.getByLabel('Source de gauche')).toHaveValue('m1422a');
 await page.getByLabel('Source de droite').selectOption('q2-256');
 await expect(page.locator('#comparateur [lang=ar][dir=rtl]')).toHaveCount(1);
 await page.getByLabel('Période de la frise').selectOption('1948');
 await expect(page.locator('.timeline > li')).toHaveCount(1);
 await page.getByLabel('Dossier à cartographier').selectOption('hijra');
 await expect(page.locator('#carte').getByRole('link',{name:'Ibn Qudama'})).toBeVisible();
 const quiz=page.locator('#quiz fieldset').first();
 await quiz.getByRole('radio',{name:'Coran 2:256'}).check();
 await quiz.getByRole('button',{name:'Vérifier la réponse'}).click();
 await expect(quiz.getByRole('status')).toContainText('Réponse correcte');
});

test('Clavier, contraste automatisé et absence de débordement',async({page})=>{
 for(const url of ['./','bibliotheque/','dossiers/annulatifs/','outils/']){
  await page.goto(url);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Aller au contenu'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
  expect(result.violations.map(v=>({rule:v.id,targets:v.nodes.map(n=>n.target)})),url).toEqual([]);
 }
 await page.getByRole('button',{name:'Mode sombre'}).click();
 await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 await page.reload();
 await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 const dark=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
 expect(dark.violations.map(v=>({rule:v.id,targets:v.nodes.map(n=>n.target)}))).toEqual([]);
});

test('Lien direct et dossier imprimable avec bibliographie',async({page})=>{
 await page.goto('dossiers/apostasie/');
 await page.getByRole('button',{name:'Copier le lien'}).click();
 await expect(page.getByRole('status').filter({hasText:/Lien copié|Copiez le lien/})).toBeVisible();
 await page.evaluate(()=>{window.print=()=>{document.documentElement.dataset.printRequested='yes';};});
 await page.getByRole('button',{name:'Imprimer / PDF'}).click();
 await expect(page.locator('html')).toHaveAttribute('data-print-requested','yes');
 await page.emulateMedia({media:'print'});
 await expect(page.getByRole('heading',{name:'Bibliographie'})).toBeVisible();
 await expect(page.locator('.print-url').first()).toBeVisible();
 await expect(page.getByRole('heading',{name:'Note personnelle'})).toBeHidden();
});