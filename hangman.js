
const words=[
{word:'ROBOTICS',hint:'Building and coding machines that interact with the physical world.'},
{word:'PYTHON',hint:'A beginner-friendly programming language used in AI, data, and automation.'},
{word:'ALGORITHM',hint:'A step-by-step process for solving a problem.'},
{word:'SENSOR',hint:'A device that helps robots detect the world around them.'},
{word:'DATASET',hint:'A collection of data used for analysis or machine learning.'},
{word:'DEBUG',hint:'Finding and fixing errors in code.'},
{word:'CURRICULUM',hint:'A structured learning plan for students.'},
{word:'VARIABLE',hint:'A named storage location in programming.'}
];
const wordDisplay=document.getElementById('wordDisplay'),letterGrid=document.getElementById('letterGrid'),hint=document.getElementById('hint'),attemptsText=document.getElementById('attemptsText'),gameMessage=document.getElementById('gameMessage'),newWordBtn=document.getElementById('newWordBtn');
let current,guessed,attempts;
function start(){if(!wordDisplay)return;current=words[Math.floor(Math.random()*words.length)];guessed=new Set();attempts=6;hint.textContent='Hint: '+current.hint;gameMessage.textContent='';drawWord();drawLetters();update()}
function drawWord(){wordDisplay.innerHTML=current.word.split('').map(l=>`<span>${guessed.has(l)?l:'_'}</span>`).join('');if(current.word.split('').every(l=>guessed.has(l))){gameMessage.textContent='You got it. The machine overlords are mildly impressed.';disable()}}
function drawLetters(){const abc='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');letterGrid.innerHTML=abc.map(l=>`<button type="button" data-letter="${l}">${l}</button>`).join('');letterGrid.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>guess(btn.dataset.letter,btn)))}
function guess(letter,btn){if(guessed.has(letter)||attempts<=0)return;guessed.add(letter);btn.disabled=true;if(!current.word.includes(letter))attempts--;drawWord();update();if(attempts<=0){gameMessage.textContent='Game over. The word was '+current.word+'. A tragic but educational event.';disable()}}
function update(){attemptsText.textContent='Attempts left: '+attempts}
function disable(){letterGrid.querySelectorAll('button').forEach(btn=>btn.disabled=true)}
if(newWordBtn)newWordBtn.addEventListener('click',start);start();
