/* Biraj Pokharel — Cybersecurity Portfolio */
const cursor=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
if(cursor&&ring){
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx-6+'px';cursor.style.top=my-6+'px'});
  (function loop(){rx+=(mx-rx-18)*.12;ry+=(my-ry-18)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();
  document.querySelectorAll('a,button,.card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cursor.style.transform='scale(2)';ring.style.borderColor='var(--accent2)'});
    el.addEventListener('mouseleave',()=>{cursor.style.transform='scale(1)';ring.style.borderColor='var(--accent)'});
  });
}
const PAGES=['about','skills','experience','projects','education','certifications','tryhackme','contact'];
function showPage(id){
  if(!PAGES.includes(id))id='about';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.getElementById('nav-'+id).classList.add('active');
  window.scrollTo({top:0,behavior:'instant'});
  if(location.hash!=='#'+id)history.replaceState(null,'','#'+id);
  setTimeout(triggerReveal,60);
}
window.showPage=showPage;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
function triggerReveal(){document.querySelectorAll('.page.active .reveal').forEach(el=>io.observe(el))}
document.addEventListener('keydown',e=>{
  if(e.ctrlKey||e.metaKey||e.altKey||/input|textarea/i.test(e.target.tagName))return;
  const i=parseInt(e.key,10);if(i>=1&&i<=PAGES.length)showPage(PAGES[i-1]);
});
showPage(location.hash.slice(1)||'about');
