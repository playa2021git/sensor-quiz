import test from 'node:test';
import assert from 'node:assert/strict';
import {secretQuestions,secretScore,secretUnlocked,unlockSecret,resetSecretProgress,secretBest} from '../src/secret.js';
test('6つの隠し問題はそれぞれ4択で正解と解説を持つ',()=>{
 assert.equal(secretQuestions.length,6);
 assert.equal(new Set(secretQuestions.map(q=>q.id)).size,6);
 for(const q of secretQuestions){
  assert.equal(q.options.length,4);
  assert.equal(q.feedback.length,4);
  assert.ok(q.options.every(Boolean));
  assert.ok(q.feedback.every(Boolean));
  assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
  assert.ok(q.explanation&&q.takeaway&&q.situation);
 }
 assert.equal(secretScore(secretQuestions.map(q=>q.answer)),6);
 assert.equal(secretScore(secretQuestions.map(q=>(q.answer+1)%4)),0);
});
test('隠しステージは明示的に解放・リセットできる',()=>{
 resetSecretProgress();
 assert.equal(secretUnlocked(),false);
 assert.equal(secretBest(),0);
 assert.equal(unlockSecret(),true);
 assert.equal(secretUnlocked(),true);
 assert.equal(unlockSecret(),false);
 resetSecretProgress();
 assert.equal(secretUnlocked(),false);
});

