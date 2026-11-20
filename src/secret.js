export const secretProgressKey='sensor-quest-secret-v1';
export const secretQuestions=[
 {id:'s1',icon:'🚨',title:'地震を検知して警報！',situation:'加速度センサで揺れを調べ、スピーカーで音を鳴らす装置。使用する「センサ」は何個？',
  options:['2個。スピーカーもセンサ','1個。加速度センサだけがセンサ','3個。タイマーも必ずセンサ','0個。micro:bitだけで分かる'],
  answer:1,feedback:['スピーカーは音を鳴らす出力装置です。','正解！ 加速度センサが入力、スピーカーが出力です。','経過時間はプログラムでも扱えます。','揺れを知る入力情報が必要です。'],
  explanation:'揺れを調べる加速度センサが入力。プログラムが判断し、スピーカーが音を出します。センサが1つでも計測・制御する装置は作れます。',takeaway:'部品の数とセンサの数は違います。'},
 {id:'s2',icon:'📳',title:'振動センサ vs 振動モーター',situation:'「振動センサ」と「振動モーター」の役割を正しく説明しているのは？',
  options:['どちらも振動を測る入力装置','どちらも振動を起こす出力装置','振動センサが入力、振動モーターが出力','振動モーターがプログラムの判断をする'],
  answer:2,feedback:['振動モーターは振動を起こします。','振動センサは揺れを検知します。','正解！ 名前が似ていても役割は逆です。','判断はプログラムが担当します。'],
  explanation:'振動センサは揺れを検知する入力装置。振動モーターは自分から揺れを発生させる出力装置です。',takeaway:'「調べる」と「動かす」を区別しましょう。'},
 {id:'s3',icon:'🐈',title:'猫が来たら餌箱を開けよう',situation:'AIカメラで猫を認識して、餌箱のふたを動かす模型。適切な組み合わせは？',
  options:['AIカメラで認識し、重量センサでふたを動かす','サーボモーターで猫を認識し、カメラでふたを動かす','人感センサで猫だけを確実に認識し、LEDでふたを動かす','AIカメラで猫を分類し、サーボモーターでふたを動かす'],
  answer:3,feedback:['重量センサは荷重を調べる入力装置です。','役割が逆です。モーターは認識装置ではありません。','人感センサは動物と人を確実に区別できず、LEDもふたを動かせません。','正解！ 分類した結果を判断し、サーボモーターを動かします。'],
  explanation:'AI画像認識で猫と分類 → プログラムで条件を判断 → サーボモーターを指定角度に動かします。AIの誤判定に注意し、模型で確認します。',takeaway:'何を見分けるか、何を動かすかで機器を選びましょう。'},
 {id:'s4',icon:'😴',title:'まばたきでは起こさない',situation:'AIカメラで目を閉じた状態が3秒続いたら音を鳴らしたい。最適な方法は？',
  options:['AIの判定を受けて、プログラムで継続時間を計る','「3秒センサ」を必ず追加する','一瞬でも目を閉じたら警告音を鳴らす','スピーカーを増やして眠っているか判別する'],
  answer:0,feedback:['正解！ 経過時間をプログラムで判断します。','経過時間の判定に専用の物理センサは不要です。','一瞬のまばたきでも誤作動します。','スピーカーは音を鳴らす出力です。'],
  explanation:'AIで状態を分類してからプログラムで継続時間を調べます。ただし、3秒閉眼したからといって睡眠中だと断定できません。',takeaway:'「何秒続いたら」はプログラムで判断できます。'},
 {id:'s5',icon:'💡',title:'センサが2つなら自動で光る？',situation:'「暗くて、人が通ったら点灯する」ライト。人感センサと明るさセンサを用意しました。さらに必要なのは？',
  options:['2つのセンサがあれば自動で光る','人感センサをもう1つ追加するだけ','条件を判断するプログラムとLEDなどの出力','明るさセンサをスピーカーに替える'],
  answer:2,feedback:['センサ自身が照明になるわけではありません。','入力を増やしても光を出す装置は必要です。','正解！ 入力→判断→出力がそろいます。','スピーカーは光る装置ではなく、明るさを調べる機能もありません。'],
  explanation:'明るさと人の動きを取得し、「暗い AND 人を検知」をプログラムで判断し、LEDなどを点灯させます。実際の照明には適切な電源・駆動回路も必要です。',takeaway:'センサだけでは出力装置の仕事はできません。'},
 {id:'s6',icon:'🧠',title:'2つ使えば必ず正確になる？',situation:'階段ライトが、明るい昼間も人が通ると点灯してしまう。どう改善すればよい？',
  options:['センサをさらに2つ増やせば条件なしで正確になる','「暗い」かつ「人を検知」で点灯させる','「暗い」または「人を検知」で点灯させる','LEDを大きくすれば誤点灯がなくなる'],
  answer:1,feedback:['センサの数だけでは誤作動を防げません。','正解！ AND条件なら、明るいときの誤点灯を減らせます。','OR条件では明るくても人が通れば点灯します。','出力の大きさでは判断条件は変わりません。'],
  explanation:'複数のセンサを使っても、ORかANDかなど条件の設計で結果が変わります。「どの情報を、どう判断するか」が重要です。',takeaway:'センサを増やす前に、判断条件を見直しましょう。'}
];
export const secretScore=ids=>secretQuestions.reduce((n,q,i)=>n+(ids[i]===q.answer?1:0),0);
let unlocked=false,best=0;
try{
 const saved=JSON.parse(localStorage.getItem(secretProgressKey)||'{}');
 unlocked=saved.unlocked===true;
 best=Number.isInteger(saved.best)&&saved.best>=0&&saved.best<=6?saved.best:0;
}catch{}
function save(){try{localStorage.setItem(secretProgressKey,JSON.stringify({unlocked,best}));}catch{}}
export const secretUnlocked=()=>unlocked;
export const secretBest=()=>best;
export function unlockSecret(){const fresh=!unlocked;unlocked=true;save();return fresh;}
export function resetSecretProgress(){unlocked=false;best=0;try{localStorage.removeItem(secretProgressKey);}catch{}}
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function createSecretMode({app,cat,setTheme}){
 let index=0,answers=[],phase='idle';
 function frame(html,position=index){
  setTheme(2);
  app.innerHTML=`<div class="game secret-game"><header><div class="brand">センサークイズ<small>SECRET MISSION 03</small></div><div class="secret-progress" aria-label="全6問">${secretQuestions.map((_,i)=>`<i class="${i<position?'done':i===position?'current':''}"></i>`).join('')}</div><button data-action="home">⌂ タイトル</button></header>${html}</div>`;
 }
 function question(){
  phase='question';const q=secretQuestions[index];
  frame(`<main class="secret-board"><div class="secret-heading"><span>⚡ SECRET MISSION / 03</span><b>第${index+1}問 ／ 全6問</b><span>時間制限なし</span></div><div class="secret-body"><aside class="secret-situation"><div class="secret-symbol">${q.icon}</div><h1>${esc(q.title)}</h1><p>${esc(q.situation)}</p><div class="secret-mascot">${cat('think')}<span>入力？ 判断？ 出力？</span></div></aside><section class="secret-response"><h2>最も適切なのはどれ？</h2><div class="secret-options">${q.options.map((label,i)=>`<button data-secret-answer="${i}"><kbd>${'ABCD'[i]}</kbd><span>${esc(label)}</span><strong>›</strong></button>`).join('')}</div><p class="secret-hint">A〜Dキー、または選択肢をクリック</p></section></div></main>`);
  app.querySelectorAll('[data-secret-answer]').forEach(b=>b.onclick=()=>answer(Number(b.dataset.secretAnswer)));
 }
 function answer(id){
  if(phase!=='question'||![0,1,2,3].includes(id))return;
  const q=secretQuestions[index],correct=id===q.answer;
  phase='feedback';answers.push(id);
  frame(`<main class="secret-board secret-feedback ${correct?'secret-correct':'secret-incorrect'}"><div class="secret-heading"><span>⚡ SECRET MISSION / 解説</span><b>第${index+1}問 ／ 全6問</b></div><div class="secret-judgement"><span>${correct?'✦ 正解！':'ここを確認！'}</span><strong>${correct?'役割を見抜いた！':'答えを確認しよう'}</strong></div><div class="secret-feedback-grid"><div class="secret-feedback-cat">${cat(correct?'success':'explain')}<p>${correct?'その調子！':'違いを整理しよう'}</p></div><section class="secret-reasons"><h1>${esc(q.title)}</h1><p class="secret-your-answer">あなた：${esc(q.options[id])}</p><p class="secret-correct-answer">正解：${esc(q.options[q.answer])}</p><p>${esc(q.feedback[id])}</p><p class="secret-explanation">${esc(q.explanation)}</p><p class="secret-takeaway">💡 ${esc(q.takeaway)}</p></section></div><button class="gold secret-next" data-secret-next>${index===5?'最終結果を見る':'次の問題へ'} ›</button></main>`);
  app.querySelector('[data-secret-next]').onclick=()=>{if(phase!=='feedback')return;index++;if(index===6)result();else question();};
 }
 function result(){
  phase='result';const score=secretScore(answers);best=Math.max(best,score);save();
  frame(`<main class="secret-board secret-final"><p class="secret-final-tag">✦ SECRET MISSION COMPLETE ✦</p><h1>${score===6?'完全クリア！':'入力・判断・出力をマスターしよう'}</h1><div class="secret-final-main"><div class="secret-final-cat">${cat('result')}</div><div class="secret-final-score"><strong>${score}</strong><span> / 6問正解</span><small>自己ベスト：${best} / 6</small></div></div><p class="secret-final-message">「情報を取り込む」「プログラムで判断する」「装置を動かす」。<br>3つの役割を意識して、自分の再発明へ進もう！</p><div class="secret-final-actions"><button class="gold" data-secret-retry>↻ もう一度挑戦</button><button data-action="home">⌂ タイトルへ</button></div><div class="secret-review">${secretQuestions.map((q,i)=>`<details><summary>${answers[i]===q.answer?'○':'△'} 第${i+1}問 ${esc(q.title)}</summary><p>${esc(q.explanation)}</p></details>`).join('')}</div><p class="secret-final-note">得点は学習の参考です。回答の外部送信はしません。</p></main>`,6);
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

