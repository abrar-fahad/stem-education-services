
const menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks'),themeBtn=document.getElementById('themeBtn'),year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();
if(menuBtn&&navLinks){menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')))}
if(localStorage.getItem('af-theme')==='dark'){document.body.classList.add('dark');if(themeBtn)themeBtn.textContent='Light'}
if(themeBtn){themeBtn.addEventListener('click',()=>{document.body.classList.toggle('dark');const dark=document.body.classList.contains('dark');localStorage.setItem('af-theme',dark?'dark':'light');themeBtn.textContent=dark?'Light':'Dark'})}
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const counters=document.querySelectorAll('[data-count]');
const countObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.count);let n=0,inc=Math.max(1,Math.ceil(target/45));const timer=setInterval(()=>{n+=inc;if(n>=target){n=target;clearInterval(timer)}el.textContent=n+'+'},24);countObserver.unobserve(el)})},{threshold:.35});
counters.forEach(c=>countObserver.observe(c));
const previewBtn=document.getElementById('previewAnswerBtn'),previewAnswer=document.getElementById('previewAnswer');
if(previewBtn&&previewAnswer){previewBtn.addEventListener('click',()=>{previewAnswer.classList.toggle('show-answer');previewBtn.textContent=previewAnswer.classList.contains('show-answer')?'Hide Answer':'Reveal Answer'})}
