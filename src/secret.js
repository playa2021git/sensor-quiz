export const secretProgressKey='sensor-quest-secret-v1';
export const secretQuestions=[
 {id:'s1',icon:'🚨',title:"揺れたら音で知らせよう",situation:"机が揺れたら、音で知らせる装置を作ります。使う部品は加速度センサとスピーカーです。",prompt:"このうち、揺れを調べるセンサはどれ？",
  options:["スピーカーだけ","加速度センサだけ","両方ともセンサ","どちらもセンサではない"],
  answer:1,feedback:["スピーカーは音を出す部品です。","加速度センサで揺れを調べます。","揺れを調べるのは加速度センサだけです。","加速度センサは揺れを調べる部品です。"],
  explanation:'揺れを調べる加速度センサが入力。プログラムが判断し、スピーカーが音を出します。センサが1つでも計測・制御する装置は作れます。',takeaway:'部品の数とセンサの数は違います。'},
 {id:'s2',icon:'📳',title:"スマホがブルッと震える",situation:"スマホがブルッと震えると、着信に気づけます。「振動」は、ものが細かく揺れることです。",prompt:"揺れを調べる部品と、揺らす部品の組み合わせは？",
  options:["どちらも揺れを調べる","どちらも揺れを起こす","振動センサが調べ、振動モーターが揺らす","振動モーターが調べ、振動センサが揺らす"],
  answer:2,feedback:["振動モーターは揺れを起こします。","振動センサは揺れを調べます。","揺れを調べるのと、揺らすのは別の役割です。","揺れを調べるのは振動センサです。"],
  explanation:'振動センサは揺れを検知する入力装置。振動モーターは自分から揺れを発生させる出力装置です。',takeaway:'「調べる」と「動かす」を区別しましょう。'},
 {id:'s3',icon:'🐻',title:'通ったのは人？ クマ？',situation:'山道で何かが動くと、人感センサが反応します。通ったのが人かクマかも調べたいです。',prompt:'どの方法なら、見た目を手がかりにできる？',
  options:['人感センサが反応したら、人だと決める','人感センサが反応したときの気温で決める','人感センサでカメラを起動し、AIが画像から見分ける','人感センサが反応した回数で決める'],
  answer:2,feedback:['クマが動いても反応することがあります。','同じ気温の山道を、人もクマも通れます。','画像には、体の形や姿が写ります。','反応した回数からは、体の形は分かりません。'],
  explanation:'人感センサは撮影を始めるきっかけになります。人とクマの画像を学習したAIは、写った姿からどちらかを予想します。暗い場所や体の一部しか写らないときは、見まちがえることもあります。',takeaway:'動きに気づく役と、姿を見分ける役を分けよう。'},
 {id:'s4',icon:'😴',title:"まばたきで音を鳴らさない",situation:"AIカメラで目が閉じているかを調べます。目を閉じたまま3秒たったときだけ、音を鳴らしたいです。",prompt:"どうすれば、短いまばたきと区別できる？",
  options:["目を閉じている時間をプログラムで計る","カメラが目を捉えてからの時間を計る","目を閉じた瞬間に音を鳴らす","スピーカーを増やす"],
  answer:0,feedback:["プログラムで目を閉じている時間を計れます。","カメラに映った時点では、まだ目を閉じていないかもしれません。","短いまばたきでも音が鳴ってしまいます。","スピーカーは音を出す部品です。"],
  explanation:'目を閉じたら数え始め、目を開けたら、数えた時間を0秒に戻します。閉じたまま3秒たつと音が鳴ります。目を閉じていることから、眠っているかまでは分かりません。',takeaway:'「何秒続いたら」はプログラムで判断できます。'},
 {id:'s5',icon:'🍚',title:'給食のおかわりは何人分？',situation:'給食台には、おかわりを取りに来る人も、食器を返しに来る人もいます。',prompt:'おかわりを食べたい人は何人？ どう数えよう？',
  options:['給食台の前で人感センサが反応した回数を数える','食べたい人に、1人1回ボタンを押してもらう','給食台に残ったごはんの重さを量る','給食台の前に人がいた時間を計る'],
  answer:1,feedback:['食器を返しに来た人にも反応します。','1回押すと、1人分の希望が伝わります。','重さから分かるのは、ごはんがどのくらい残っているかです。','同じ時間そこにいても、来た理由は人によって違います。'],
  explanation:'人感センサは人の動きに反応します。おかわりがほしいかは、本人にボタンで知らせてもらうと数えられます。',takeaway:'希望を知りたいときは、本人が伝えられる仕組みにしよう。'}
];
const total=secretQuestions.length;
export const secretScore=ids=>secretQuestions.reduce((n,q,i)=>n+(ids[i]===q.answer?1:0),0);
let unlocked=false,best=0;
try{
 const saved=JSON.parse(localStorage.getItem(secretProgressKey)||'{}');
 unlocked=saved.unlocked===true;
 best=saved.quizVersion===2&&Number.isInteger(saved.best)&&saved.best>=0&&saved.best<=total?saved.best:0;
}catch{}
function save(){try{localStorage.setItem(secretProgressKey,JSON.stringify({unlocked,best,quizVersion:2}));}catch{}}
export const secretUnlocked=()=>unlocked;
export const secretBest=()=>best;
export function unlockSecret(){const fresh=!unlocked;unlocked=true;save();return fresh;}
export function resetSecretProgress(){unlocked=false;best=0;try{localStorage.removeItem(secretProgressKey);}catch{}}
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function createSecretMode({app,cat,setTheme}){
 let index=0,answers=[],phase='idle';
 function frame(html,position=index){
  setTheme(2);
  app.innerHTML=`<div class="game secret-game"><header><div class="brand">センサークイズ<small>SECRET MISSION 03</small></div><div class="secret-progress" aria-label="全${total}問">${secretQuestions.map((_,i)=>`<i class="${i<position?'done':i===position?'current':''}"></i>`).join('')}</div><button data-action="home">⌂ タイトル</button></header>${html}</div>`;
 }
 function question(){
  phase='question';const q=secretQuestions[index];
  frame(`<main class="secret-board"><div class="secret-heading"><span>⚡ SECRET MISSION / 03</span><b>第${index+1}問 ／ 全${total}問</b><span>時間制限なし</span></div><div class="secret-body"><aside class="secret-situation"><div class="secret-symbol">${q.icon}</div><h1>${esc(q.title)}</h1><p>${esc(q.situation)}</p><div class="secret-mascot">${cat('think')}<span>何を調べて、どう動かす？</span></div></aside><section class="secret-response"><h2>${esc(q.prompt)}</h2><div class="secret-options">${q.options.map((label,i)=>`<button data-secret-answer="${i}"><kbd>${'ABCD'[i]}</kbd><span>${esc(label)}</span><strong>›</strong></button>`).join('')}</div><p class="secret-hint">A〜Dキー、または選択肢をクリック</p></section></div></main>`);
  app.querySelectorAll('[data-secret-answer]').forEach(b=>b.onclick=()=>answer(Number(b.dataset.secretAnswer)));
 }
 function answer(id){
  if(phase!=='question'||![0,1,2,3].includes(id))return;
  const q=secretQuestions[index],correct=id===q.answer;
  phase='feedback';answers.push(id);
  frame(`<main class="secret-board secret-feedback ${correct?'secret-correct':'secret-incorrect'}"><div class="secret-heading"><span>⚡ SECRET MISSION / 解説</span><b>第${index+1}問 ／ 全${total}問</b></div><div class="secret-judgement"><span>${correct?'✦ 正解！':'ここを確認！'}</span><strong>${correct?'役割を見抜いた！':'答えを確認しよう'}</strong></div><div class="secret-feedback-grid"><div class="secret-feedback-cat">${cat(correct?'success':'explain')}<p>${correct?'その調子！':'違いを整理しよう'}</p></div><section class="secret-reasons"><h1>${esc(q.title)}</h1><p class="secret-your-answer">あなた：${esc(q.options[id])}</p><p class="secret-correct-answer">正解：${esc(q.options[q.answer])}</p><p>${esc(q.feedback[id])}</p><p class="secret-explanation">${esc(q.explanation)}</p><p class="secret-takeaway">💡 ${esc(q.takeaway)}</p></section></div><button class="gold secret-next" data-secret-next>${index===total-1?'最終結果を見る':'次の問題へ'} ›</button></main>`);
  app.querySelector('[data-secret-next]').onclick=()=>{if(phase!=='feedback')return;index++;if(index===total)result();else question();};
 }
 function result(){
  phase='result';const score=secretScore(answers);best=Math.max(best,score);save();
  frame(`<main class="secret-board secret-final"><p class="secret-final-tag">✦ SECRET MISSION COMPLETE ✦</p><h1>${score===total?'完全クリア！':'入力・判断・出力をマスターしよう'}</h1><div class="secret-final-main"><div class="secret-final-cat">${cat('result')}</div><div class="secret-final-score"><strong>${score}</strong><span> / ${total}問正解</span><small>自己ベスト：${best} / ${total}</small></div></div><p class="secret-final-message">「情報を取り込む」「プログラムで判断する」「装置を動かす」。<br>3つの役割を意識して、自分の再発明へ進もう！</p><div class="secret-final-actions"><button class="gold" data-secret-retry>↻ もう一度挑戦</button><button data-action="home">⌂ タイトルへ</button></div><div class="secret-review">${secretQuestions.map((q,i)=>`<details><summary>${answers[i]===q.answer?'○':'△'} 第${i+1}問 ${esc(q.title)}</summary><p>${esc(q.explanation)}</p></details>`).join('')}</div><p class="secret-final-note">得点は学習の参考です。回答の外部送信はしません。</p></main>`,total);
  app.querySelector('[data-secret-retry]').onclick=start;
 }
 function start(){if(!secretUnlocked())return;index=0;answers=[];question();}
 document.addEventListener('keydown',e=>{
  if(phase!=='question'||!app.querySelector('.secret-game')||document.querySelector('dialog[open]')||e.repeat||e.ctrlKey||e.altKey||e.metaKey)return;
  const idx='ABCD'.indexOf(e.key.toUpperCase());
  if(idx>=0){e.preventDefault();answer(idx);}
 });
 return {start};
}

