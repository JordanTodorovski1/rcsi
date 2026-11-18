
/* === Premium UI enhancements (animations & hovers) === */
(()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header=document.querySelector('.site-header');
  const bar=document.createElement('div');bar.className='scroll-progress';bar.setAttribute('aria-hidden','true');document.body.append(bar);
  const toTop=document.createElement('button');toTop.type='button';toTop.className='to-top';toTop.setAttribute('aria-label','Назад на врвот');
  toTop.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.append(toTop);
  toTop.addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'}));
  let ticking=false;
  const onScroll=()=>{const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${max>0?Math.min(y/max,1):0})`;header&&header.classList.toggle('scrolled',y>40);toTop.classList.toggle('show',y>700);ticking=false};
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
  onScroll();
  if(reduce||!('IntersectionObserver' in window))return;
  const selector='.meeting-strip .wrap>*,.section-head,.intro-copy,.intro-images,.card,.member-card,.value,.values-band h3,.timeline-item,.honorary-card,.committee,.contact-details,.contact-form,.donation-box,.gallery button,.about-content>section,.payment-slips>*,.calendar-layout>*,.bio-layout>*,.article-cover,.article-layout,.join-section .wrap>*,.footer-grid>div,.filter-row,.member-tabs .wrap';
  const finish=el=>{el.classList.remove('rv','in');el.style.removeProperty('--d')};
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;el.classList.add('in');io.unobserve(el);const d=parseFloat(el.style.getPropertyValue('--d'))||0;setTimeout(()=>finish(el),1100+d)}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  const counters=new Map();
  document.querySelectorAll(selector).forEach(el=>{
    if(el.closest('dialog')||el.getBoundingClientRect().top<innerHeight*.9)return;
    const parent=el.parentElement,i=counters.get(parent)||0;counters.set(parent,i+1);
    el.style.setProperty('--d',`${Math.min(i%6,5)*85}ms`);
    el.classList.add('rv');io.observe(el);
  });
})();
