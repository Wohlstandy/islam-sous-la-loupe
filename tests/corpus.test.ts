import assert from 'node:assert/strict';
import { test } from 'node:test';
import { findSources } from '../lib/search';
import { allDossiers } from '../lib/dossiers';
import { sources,sourceMap } from '../lib/sources';
import { annulatifs } from '../lib/annulatifs';
import { glossary,quiz,timeline } from '../lib/tools-data';

test('Références précises et recherche insensible aux accents',()=>{
 assert.deepEqual(findSources({q:'Coran 2 : 256'}).map(s=>s.id),['q2-256']);
 assert.deepEqual(findSources({q:'Sahih al-Bukhari 3017'}).map(s=>s.id),['b3017']);
 assert.deepEqual(findSources({q:'4:99'}).map(s=>s.id),['q4-97-100']);
 assert.deepEqual(findSources({q:'Muslim 1422a'}).map(s=>s.id),['m1422a']);
 assert.deepEqual(findSources({q:'AÏCHA'}),findSources({q:'aicha'}));
 assert.ok(findSources({q:'ibn qudama'}).some(s=>s.id==='qudama'));
 assert.deepEqual(findSources({topic:'apostasie',kind:'Hadith',period:'IXe siècle'}).map(s=>s.id),['b3017']);
 assert.deepEqual(findSources({status:'Référence à vérifier'}).map(s=>s.id),['qudama-ridda-piste']);
 assert.equal(findSources({q:'zzz introuvable'}).length,0);
});

test('Intégrité du corpus, des citations et des états de vérification',()=>{
 assert.equal(new Set(sources.map(s=>s.id)).size,sources.length);
 assert.equal(new Set(allDossiers.map(d=>d.id)).size,allDossiers.length);
 assert.equal(annulatifs.length,10);
 for(const s of sources){
  assert.equal(new URL(s.url).protocol,'https:');
  assert.equal(s.checked===null,s.status==='Référence à vérifier');
  if(s.original) assert.ok(s.translation && s.translationCredit);
 }
 const refs=[...allDossiers.flatMap(d=>[...d.sources,...d.summary.refs,...d.history.refs,...d.classical.refs,...d.divergences.refs,...d.critique.refs,...d.modern.refs]),
 ...annulatifs.flatMap(a=>a.refs),...glossary.flatMap(g=>g[2]),...quiz.flatMap(q=>q.refs),...timeline.flatMap(t=>t.refs)];
 for(const ref of refs) assert.ok(sourceMap[ref],ref);
 for(const q of quiz) assert.ok(q.answer>=0&&q.answer<q.choices.length,q.question);
});
