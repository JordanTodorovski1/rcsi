export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const arrow='<span aria-hidden="true">↗</span>';
const icons={search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',menu:'<path d="M3 7h18M3 12h18M3 17h18"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>'};
const icon=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${icons[n]}</svg>`;
export const articleUrl=a=>`/${a.type==='home'?'news':a.type}/${a.id}/`;
export const memberUrl=m=>`/all/${m.id}/`;
const links=[['/','Дома'],['/about-us/','За нас'],['/projects/','Проекти'],['/events/','Настани'],['/visits/','Посети'],['/calendar/','Календар'],['/all/','Сите членови'],['/board-members/','Членови на Бордот'],['/committees/','Комитети'],['/honorary-members/','Почесни членови'],['/president/','Претседатели'],['/donate/','Донирај'],['/contact/','Контакт']];
const memberNav=path=>`<div class="member-tabs"><div class="wrap">${links.slice(6,11).map(([h,t])=>`<a href="${h}" class="${path===h?'active':''}" ${path===h?'aria-current="page"':''}>${t}</a>`).join('')}</div></div>`;
const button=(h,t,c='')=>`<a class="button ${c}" href="${h}">${t}${arrow}</a>`;
const textlink=(h,t)=>`<a class="text-link" href="${h}">${t}${arrow}</a>`;
const header=(d,path)=>`<a class="skip" href="#main">Прескокни до содржината</a><div class="topbar"><div class="wrap"><span>Служба над сè · Service Above Self</span><div class="toplinks"><a href="mailto:contact@rcsi.mk">contact@rcsi.mk</a><span>Дистрикт 1912</span><a href="/memb/">За членови ↗</a></div></div></div><header class="site-header"><div class="wrap navrow"><a class="brand" href="/" aria-label="Ротари Скопје Интернационал — Дома"><img src="${d.logo}" alt="Rotary Club Skopje International, District 1912" width="216" height="78"></a><nav id="navigation" class="navigation" aria-label="Главна навигација">${[['/','Дома'],['/about-us/','За нас']].map(([h,t])=>`<a href="${h}" class="navlink ${path===h?'active':''}" ${path===h?'aria-current="page"':''}>${t}</a>`).join('')}<div class="navdrop"><button aria-expanded="false" aria-controls="activity-menu">Активности <span class="chevron">⌄</span></button><div class="dropdown" id="activity-menu">${links.slice(2,6).map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}<a href="/news/">Новости</a></div></div><div class="navdrop"><button aria-expanded="false" aria-controls="member-menu">Членови <span class="chevron">⌄</span></button><div class="dropdown" id="member-menu">${links.slice(6,11).map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}<a href="/become-a-member/">Стани член</a><a href="/memb/">За членови ↗</a></div></div><a class="navlink ${path==='/contact/'?'active':''}" href="/contact/">Контакт</a><button class="mobile-search search-open" type="button">Пребарај ја страницата ↗</button></nav><div class="nav-actions"><button class="icon-btn search-open" aria-label="Пребарај ја страницата">${icon('search')}</button>${button('/donate/','Донирај','small')}<button class="icon-btn menu-toggle" aria-label="Отвори мени" aria-expanded="false" aria-controls="navigation">${icon('menu')}</button></div></div></header>`;
const footer=d=>`<section class="join-section"><div class="wrap"><div><span class="eyebrow">Ротари Клуб Скопје Интернационал</span><h2>Стани член</h2><p>Зачленувањето кон Ротари значи приклучување кон светско семејство на лидери, професионалци и креатори на промени кои веруваат во правење разлика. Заедно го претвораме сочувството во акција.</p></div>${button('/become-a-member/','Стани член')}</div></section><footer class="footer"><div class="wrap"><div class="footer-grid"><div class="footer-brand"><a href="/"><img src="${d.logoWhite}" alt="Rotary Club Skopje International" width="220" height="89" loading="lazy"></a><p>Каде што интернационалните пријатели се обединуваат во служба.<br>Служба над сè · Service Above Self.</p><a href="https://www.facebook.com/RCSkopjeInternational" target="_blank" rel="noopener noreferrer">Facebook ↗</a></div><div><h4>Нашиот клуб</h4><a href="/about-us/">За нас</a><a href="/all/">Нашите членови</a><a href="/board-members/">Членови на Бордот</a><a href="/committees/">Комитети</a><a href="/president/">Претседатели</a><a href="/honorary-members/">Почесни членови</a></div><div><h4>Вклучете се</h4><a href="/projects/">Нашите проекти</a><a href="/news/">Новости и активности</a><a href="/calendar/">Календар</a><a href="/become-a-member/">Стани член</a><a href="/donate/">Донирај</a><a href="/memb/">За членови</a></div><div><h4>Се среќаваме во Скопје</h4><p>Хотел „Лимак“, 5 кат<br>Ул. Јордан Мијалков бр. 31<br>1000 Скопје, Северна Македонија</p><p style="margin-top:16px">Вторник · 20:00 — 21:00</p><a href="mailto:contact@rcsi.mk" style="margin-top:16px">contact@rcsi.mk ↗</a></div></div><div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} Ротари Клуб Скопје Интернационал. Сите права се задржани.</span><a href="/archive/">Архива на содржини</a><span>Пријателство · Интегритет · Служба</span></div></div></footer>`;
const dialogs=()=>`<dialog id="search-dialog" class="search-dialog" aria-labelledby="search-title"><div class="dialog-head"><h2 id="search-title">Пребарајте го клубот</h2><button class="icon-btn dialog-close" aria-label="Затвори">${icon('close')}</button></div><div class="dialog-body"><label for="global-search" class="eyebrow">Проекти, новости и членови</label><input id="global-search" class="search-field" type="search" placeholder="Внесете збор за пребарување…"><div id="search-results" aria-live="polite">Пребарајте низ сите содржини на клубот.</div></div></dialog><dialog id="lightbox" class="lightbox" aria-label="Фото галерија"><div class="dialog-head"><span id="lightbox-caption">Фото галерија</span><button class="icon-btn dialog-close" aria-label="Затвори галерија">${icon('close')}</button></div><img id="lightbox-image" alt=""><div class="lightbox-controls"><button id="lightbox-prev" aria-label="Претходна фотографија">← Претходна</button><span id="lightbox-count"></span><button id="lightbox-next" aria-label="Следна фотографија">Следна →</button></div></dialog><dialog id="event-dialog" aria-labelledby="event-title"><div class="dialog-head"><h2 id="event-title">Настан</h2><button class="icon-btn dialog-close" aria-label="Затвори">${icon('close')}</button></div><div id="event-body" class="dialog-body"></div></dialog>`;
const crumb=(title,parent)=>`<div class="breadcrumb"><a href="/">Дома</a><span>/</span>${parent?`<a href="${parent[0]}">${parent[1]}</a><span>/</span>`:''}<span>${esc(title)}</span></div>`;
const pagehero=(title,desc='',label='Ротари Скопје Интернационал')=>`<section class="page-hero"><div class="wrap">${crumb(title)}<span class="eyebrow">${label}</span><h1>${title}</h1>${desc?`<p>${desc}</p>`:''}</div></section>`;
const card=a=>`<article class="card filter-item" data-category="${esc(a.category)}" data-search="${esc(a.title+' '+a.category+' '+a.meta+' '+plain(a.body))}"><a href="${articleUrl(a)}" class="card-image" tabindex="-1" aria-hidden="true"><img src="${a.cover}" alt="" loading="lazy" width="600" height="405"><span class="card-label">${esc(a.category)}</span></a><div class="card-body"><div class="card-meta">${esc(a.meta||'Ротари Скопје Интернационал')}</div><h3><a href="${articleUrl(a)}">${esc(a.summaryTitle||a.title)}</a></h3><p>${esc(plain(a.body).slice(0,190))}…</p>${textlink(articleUrl(a),'Прочитај повеќе')}</div></article>`;
const memberCard=(m,role)=>`<article class="member-card filter-item" id="${m.id}" data-search="${esc(m.name+' '+m.role)}"><a href="${memberUrl(m)}" class="member-photo" tabindex="-1" aria-hidden="true"><img src="${m.image}" alt="" width="300" height="315" loading="lazy"></a><h3><a href="${memberUrl(m)}">${esc(m.name)}</a></h3><p>${esc(role||m.joined)}</p>${textlink(memberUrl(m),'Биографија')}</article>`;
function home(d){
  const projects=['20250226','20260603','20231107'].map(id=>d.articles.find(a=>a.id===id));
  const news=d.articles.filter(a=>['visits','events'].includes(a.type)).sort((a,b)=>b.id.localeCompare(a.id)).slice(0,3);
  const polio=d.articles.find(a=>a.type==='home');
  return `<section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-content reveal">
        <span class="eyebrow">Дистрикт 1912 · Основан јуни 2012</span>
        <h1>Ротари Клуб<br>Скопје Интернационал</h1>
        <p class="hero-motto">„Каде што интернационалните пријатели се обединуваат во служба“</p>
        <p class="hero-description">Нашиот Ротари клуб обединува членови од различни места, генерации и професии, кои иако карактерно различни, работат со заедничка визија за создавање трајни промени во општеството.</p>
        <div class="hero-actions">
          ${button('/projects/','Нашите проекти')}
          ${button('/about-us/','За нас','outline')}
        </div>
      </div>
      <div class="hero-media">
        <div class="hero-card">
          <img class="hero-photo" src="/assets/hero-banner-new.webp" alt="Членови на Ротари Клуб Скопје Интернационал" fetchpriority="high" width="1688" height="1125">
          <div class="hero-card-badge">
            <strong>Ротари Клуб Скопје Интернационал</strong>
            <span>Дистрикт 1912 · Прв англиски-говорен клуб во РСМ</span>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-bottom">
      <div class="wrap">
        <span>СЛУЖБА НАД СÈ · SERVICE ABOVE SELF</span>
        <span class="district">СКОПЈЕ · ДИСТРИКТ 1912 · ОД 2012</span>
        <a href="#meeting-info">Редовни состаноци <span>↓</span></a>
      </div>
    </div>
  </section>
  <div class="meeting-strip" id="meeting-info">
    <div class="wrap">
      <span class="strip-label">Клупски<br>состаноци</span>
      <div>
        <span class="strip-icon">${icon('clock')}</span>
        <strong>Секој вторник, 20:00 — 21:00</strong>
        <p>Редовни клупски состаноци</p>
      </div>
      <div>
        <span class="strip-icon">${icon('pin')}</span>
        <strong>Хотел „Лимак“, 5 кат</strong>
        <p>Ул. Јордан Мијалков бр. 31, 1000 Скопје</p>
      </div>
      ${textlink('/contact/','Контактирајте нè')}
    </div>
  </div>
  <section class="section" id="our-club">
    <div class="wrap split">
      <div class="intro-images">
        <img src="${d.aboutPhoto}" alt="Членовите на нашиот Ротари клуб" width="600" height="600" loading="lazy">
        <div class="image-caption">
          <strong>Од 2012</strong>
          <span>СЛУЖБА НАД СÈ</span>
        </div>
      </div>
      <div class="intro-copy">
        <span class="eyebrow">За нашиот клуб</span>
        <h2>Каде што интернационалните пријатели се обединуваат во служба.</h2>
        <p>Ротари Клуб Скопје – Интернационал, основан во јуни 2012 година, е првиот англиски-говорен Ротари клуб во Република Северна Македонија. Ние ги поврзуваме странците што живеат во Скопје и локалните професионалци со меѓународно искуство, создавајќи динамична заедница која делува со заедничка цел — пријателство и хуманитарна служба.</p>
        <p>Клубот е дел од глобалната мрежа на Ротари Интернационал, која ги инспирира луѓето да се обединат и да создаваат трајни позитивни промени во заедницата и во светот. Нашите активности опфаќаат општествена инклузија, образование, поддршка на ранливи групи и промоција на меѓународна соработка.</p>
        <p>Се водиме од принципот „Служба над сè“, негувајќи пријателство, интегритет и заедничка акција што остава трајно влијание.</p>
        ${textlink('/about-us/','Повеќе за нашиот клуб')}
      </div>
    </div>
  </section>
  <section class="section soft">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow">Ротари Клуб Скопје Интернационал</span>
          <h2>Проекти</h2>
        </div>
        ${textlink('/projects/','Сите проекти')}
      </div>
      <div class="cards">${projects.map(card).join('')}</div>
    </div>
  </section>
  <section class="values-band">
    <div class="wrap">
      <h3>Ротари Клуб<br>Скопје Интернационал</h3>
      <div class="value"><strong>Јуни 2012</strong><span>Година на основање</span></div>
      <div class="value"><strong>1912</strong><span>Нашиот Ротари дистрикт</span></div>
      <div class="value"><strong>Прв во РСМ</strong><span>Англиски-говорен клуб</span></div>
    </div>
  </section>
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow">Клупски активности</span>
          <h2>Новости и активности</h2>
        </div>
        ${textlink('/news/','Сите новости и активности')}
      </div>
      <div class="cards">${news.map(card).join('')}</div>
    </div>
  </section>
  <section class="section soft">
    <div class="wrap split">
      <div class="intro-copy">
        <span class="eyebrow">Светски ден за борба против детската парализа (полио)</span>
        <h2>24 Октомври – Светски ден за борба против детската парализа (полио)</h2>
        <p>Благодарение на вакцинацијата и децениските глобални напори, бројот на случаи на див полиовирус е намален за повеќе од 99% од 1988 година. „Ротари“ е дел од оваа борба уште од самиот почеток, но работата сè уште не е завршена. Сè додека детската парализа не се искорени насекаде, децата ширум светот остануваат изложени на ризик.</p>
        <p>Ние, во „Ротари клуб Скопје Интернационал“, им се придружуваме на членовите на „Ротари“ ширум светот во мисијата конечно да ставиме крај на детската парализа.</p>
        ${textlink(articleUrl(polio),'Прочитајте повеќе')}
      </div>
      <a href="${articleUrl(polio)}">
        <img src="${polio.cover}" alt="Светски ден за борба против детската парализа (полио)" loading="lazy" style="width:100%;max-height:400px;object-fit:contain">
      </a>
    </div>
  </section>`;
}
function archive(d,type){
  const title={projects:'Проекти',events:'Настани',visits:'Посети',news:'Новости и активности'}[type];
  const desc={projects:'Проекти и хуманитарни иницијативи на Ротари Клуб Скопје Интернационал.',events:'Клупски настани и средби на Ротари Клуб Скопје Интернационал.',visits:'Официјални и пријателски посети на Ротари Клуб Скопје Интернационал.',news:'Новости, настани, проекти и активности на Ротари Клуб Скопје Интернационал.'}[type];
  const items=d.articles.filter(a=>type==='news'||a.type===type);
  if(type==='news')items.sort((a,b)=>(b.type==='home'?'20261024':b.id).localeCompare(a.type==='home'?'20261024':a.id));
  const cats=[...new Set(items.map(a=>a.category))];
  return pagehero(title,desc)+`<section class="page-section"><div class="wrap"><div class="filter-row"><div class="tabs" aria-label="Филтер по категорија"><button class="tab active" data-filter="all" aria-pressed="true">Сите</button>${cats.length>1?cats.map(c=>`<button class="tab" data-filter="${esc(c)}" aria-pressed="false">${c}</button>`).join(''):''}</div><input class="search-field list-search" type="search" aria-label="Пребарај ${title}" placeholder="Пребарај во архивата…"></div><div class="cards archive-grid">${items.map(card).join('')}</div><p class="no-results" aria-live="polite" hidden>Нема резултати. Обидете се со друг збор или категорија.</p></div></section>`;
}
function article(d,a){
  return `<div class="wrap"><div class="article-head">${crumb(a.category,[`/${a.type==='home'?'news':a.type}/`,a.type==='projects'?'Проекти':a.type==='events'?'Настани':a.type==='visits'?'Посети':'Новости'])}<span class="eyebrow">${esc(a.category)}</span><h1>${esc(a.title)}</h1>${a.subtitle?`<p>${esc(a.subtitle)}</p>`:''}${a.listingText?`<p class="article-deck">${esc(a.listingText.replace(a.meta,'').trim())}</p>`:''}<div class="card-meta" style="margin-top:20px">${esc(a.meta)}</div></div><img class="article-cover" src="${a.cover}" alt="${esc(a.title)}" width="1200" height="675"><div class="article-layout"><aside class="article-aside"><span>РОТАРИ КЛУБ<br>СКОПЈЕ ИНТЕРНАЦИОНАЛ</span><button class="text-link share-button" style="background:none;border-top:0;border-left:0;border-right:0;cursor:pointer" data-title="${esc(a.title)}">Сподели ↗</button></aside><div><div class="prose">${a.popupMeta?`<p class="card-meta">${esc(a.popupMeta)}</p>`:''}${a.sourcePopupTitle?`<details><summary>Содржина на изворната објава</summary><h2>${esc(a.sourcePopupTitle)}</h2>${a.body}</details>`:a.body}</div><h2 style="font-size:28px;margin-top:45px">Моменти од ${a.type==='projects'?'проектот':'настанот'}</h2><div class="gallery">${a.gallery.map((u,i)=>`<button data-gallery="${esc(a.title)}" data-image="${u}" aria-label="Отвори фотографија ${i+1}"><img src="${u}" alt="${esc(a.title)} — фотографија ${i+1}" loading="lazy" width="500" height="350"></button>`).join('')}</div></div></div></div><section class="section soft"><div class="wrap"><div class="section-head"><h2>Поврзани содржини</h2></div><div class="cards">${d.articles.filter(x=>x.type===a.type&&x.id!==a.id).slice(0,3).map(card).join('')}</div></div></section>`;
}
const contactForm=member=>`<form class="contact-form" data-subject="${member?'Интерес за членство':'Контакт преку веб-страницата'}"><h3>${member?'Стани член':'Испратете порака'}</h3><p>Подгответе порака до contact@rcsi.mk и испратете ја преку вашата е-пошта.</p><div class="form-row"><label>Име *<input name="first" autocomplete="given-name" required maxlength="100"></label><label>Презиме<input name="last" autocomplete="family-name" maxlength="100"></label></div><label>Email Адреса *<input name="email" type="email" autocomplete="email" required maxlength="200"></label><label>${member?'Зошто сакате да станете член?':'Порака'} *<textarea name="message" rows="5" required maxlength="5000"></textarea></label><button class="button blue" type="submit">Отвори е-пошта ${arrow}</button><p class="form-status" role="status"></p></form>`;
function contact(d,member=false){
  return pagehero(member?'Стани член':'Контакти',member?'Зачленувањето кон Ротари значи приклучување кон светско семејство на лидери, професионалци и креатори на промени кои веруваат во правење разлика.':'Ротари Клуб Скопје Интернационал. Секој вторник од 20:00 до 21:00 часот, Хотел „Лимак“, 5 кат, Скопје.',member?'Членство':'Контакт')+`<section class="page-section"><div class="wrap contact-layout"><div class="contact-details">${member?`<div class="prose">${d.pages['become-a-member'].join('')}</div>`:`<h2>Ротари Клуб<br>Скопје Интернационал</h2><div class="contact-item"><strong>НАШАТА АДРЕСА</strong><p>Улица Јордан Мијалков Број 31<br>1000 Скопје, Северна Македонија<br>Хотел „Лимак“, 5 кат</p></div><div class="contact-item"><strong>КЛУПСКИ СОСТАНОЦИ</strong><p>Секој вторник<br>20:00 — 21:00 часот</p></div><div class="contact-item"><strong>Е-ПОШТА</strong><a href="mailto:contact@rcsi.mk">contact@rcsi.mk ↗</a></div>${textlink('https://www.google.com/maps/search/?api=1&query=Limak+Skopje+Luxury+Hotel','Отвори на мапа')}`}</div>${contactForm(member)}</div></section>`;
}
function donate(d){
  return pagehero('Донирај','Доколку сакате да нè поддржите со донација, слободно направете го тоа. Клубот ќе биде благодарен за вашиот гест на доверба.','Поддршка')+`<section class="page-section"><div class="wrap"><div class="contact-layout"><div class="prose"><h2 style="font-size:33px;margin-top:0">Поддржете го клубот</h2>${d.pages.donate.filter(w=>!w.includes('<img')).join('').replace('Кајрон со реченици','')}</div><div class="donation-box"><span class="eyebrow" style="color:var(--gold)">Податоци за донација</span><h3>Ротари Клуб<br>Скопје Интернационал</h3><p style="margin-top:23px">Комерцијална банка А.Д. Скопје</p><strong class="account">300000005343572</strong><p>Префрлање на средствата во Комерцијална банка А.Д. Скопје, на нашата сметка 300000005343572.</p><button class="button copy-account" data-account="300000005343572">Копирај број на сметка <span aria-hidden="true">⧉</span></button><p class="copy-status" role="status"></p></div></div><h2 style="font-size:30px;margin-top:60px">Примери на пополнети уплатници</h2><div class="payment-slips">${d.pages.donate.filter(w=>w.includes('<img')).join('')}</div></div></section>`;
}
function members(d,path){
  const board=path==='/board-members/';
  let people=board?d.board.map(n=>d.members.find(m=>m.name===n)).filter(Boolean):d.members;
  return pagehero(board?'Членови на Бордот':'Сите членови',board?'Раководство на Ротари Клуб Скопје Интернационал.':'Членови на Ротари Клуб Скопје Интернационал.',board?'Борд':'Членови')+memberNav(path)+`<section class="page-section"><div class="wrap">${!board?'<div class="filter-row"><span class="eyebrow">Членови на клубот</span><input class="search-field list-search" type="search" aria-label="Пребарај член" placeholder="Пребарај по име…"></div>':''}<div class="member-grid">${people.map((m,i)=>memberCard(m,board?['Претседателка · 2026/2027','Секретар','Благајник','Претходен претседател'][i]:null)).join('')}</div><p class="no-results" aria-live="polite" hidden>Нема член со тоа име.</p></div></section>`;
}
function bio(d,m){
  return pagehero(esc(m.name),esc(m.role),'Членови')+memberNav('/all/')+`<section class="page-section"><div class="wrap bio-layout"><aside><div class="bio-portrait"><img src="${m.image}" alt="${esc(m.name)}" width="300" height="350"></div><p class="bio-meta">${esc(m.joined)}</p>${m.term||m.badge?`<div class="member-service">${m.badge?`<img src="${m.badge}" alt="Ротари функција">`:''}<span>Ротари ангажман<br><strong>${esc(m.term)}</strong></span></div>`:''}</aside><div><div class="prose">${m.bio}</div>${m.links.filter(h=>h&&h.startsWith('http')).map(h=>textlink(esc(h),h.includes('linkedin')?'LinkedIn профил':'Повеќе информации')).join(' ')}<div style="margin-top:35px">${textlink('/all/','Сите членови')}</div></div></div></section>`;
}
function about(d){
  return pagehero('За нас','Ротари Клуб Скопје – Интернационал, основан во јуни 2012 година.','За нашиот клуб')+`<section class="page-section"><div class="wrap about-content prose">${d.pages['about-us'].map((w,i)=>`<section>${[3,7].includes(i)?w.replace(/^Ф\s*/,''):w}</section>`).join('')}</div></section>`;
}
function committees(d){
  return pagehero('Комитети','Со цел за поорганизирана, ефикасна и рамномерна работа на сите членови во клубот се формирани клубските Комитети.')+memberNav('/committees/')+`<section class="page-section"><div class="wrap"><div class="prose" style="max-width:900px;margin-bottom:40px">${d.pages.committees.join('')}</div>${d.committees.map(c=>`<section class="committee prose"><h2>${esc(c.title)}</h2>${c.body}</section>`).join('')}</div></section>`;
}
function presidents(d){
  return pagehero('Претседатели','Претседатели на Ротари Клуб Скопје Интернационал низ годините.','Историја')+memberNav('/president/')+`<section class="page-section"><div class="wrap timeline">${d.presidents.map(p=>`<div class="timeline-item"><span class="year">${esc(p.years.join(' · '))}</span><h3>${esc(p.name)}</h3><img src="${p.images[0]}" alt="Ротари претседател" loading="lazy"></div>`).join('')}</div></section>`;
}
function honorary(d){
  return pagehero('Почесни членови','Ни претставува голема чест и привилегија да им оддадеме признание на почесните членови на нашиот Ротари Клуб Скопје Интернационал. Нивната активност, вредности и доживотна посветеност на заедницата продолжуваат да нè инспирираат сите нас.')+memberNav('/honorary-members/')+`<section class="page-section"><div class="wrap honorary-grid">${d.honorary.map(m=>`<article class="honorary-card"><span class="eyebrow">Почесен член · ${esc(m.years[0])}</span><h3>${esc(m.name)}</h3><div class="honorary-badges">${m.images.filter(u=>!u.includes('Honpoz')).map((u,i)=>`<figure><img src="${u}" alt="Ротари признание" loading="lazy"><figcaption>${esc(m.years[i]||'')}</figcaption></figure>`).join('')}</div></article>`).join('')}</div></section>`;
}
function calendar(d){
  return pagehero('Календар','Состаноците на клубот се одржуваат во вторник од 20:00 до 21:00 часот, Хотел „Лимак“, 5 кат, Скопје.')+`<section class="page-section"><div class="wrap calendar-layout"><div><div class="calendar-toolbar"><h2 id="calendar-month">Календар</h2><div class="calendar-buttons"><button id="calendar-prev" aria-label="Претходен месец">←</button><button id="calendar-today">Денес</button><button id="calendar-next" aria-label="Следен месец">→</button></div></div><div id="calendar-grid" class="calendar-grid" aria-label="Месечен календар"></div></div><aside class="calendar-aside"><h3>Клупски средби</h3><p>Состаноците на клубот се одржуваат во вторник, од 20:00 до 21:00 часот.</p><p>Хотел „Лимак“, 5 кат<br>Ул. Јордан Мијалков бр. 31, Скопје</p><div style="margin:25px 0">${textlink('/contact/','Контактирајте нè')}</div><h3>Објавени настани</h3>${d.calendar.map(e=>`<div class="event-list-item"><strong>${esc(e.title)}</strong><span>${esc(e.start.replace('T',' · '))}</span><p>${esc(e.description)}</p><p>${esc(e.location)}</p></div>`).join('')}<p style="margin-top:25px;font-size:10px">За последните промени и нови настани, посетете го <a href="https://rcsi.mk/calendar/" style="text-decoration:underline">официјалниот календар ↗</a>.</p></aside></div></section>`;
}
function portal(){
  return pagehero('За членови','Интерна комуникација и содржини на Ротари Клуб Скопје Интернационал.','За членови')+`<section class="page-section"><div class="wrap about-content"><div class="prose"><p>Оваа страница е ограничена за интерна употреба од членовите на Ротари Клуб Скопје Интернационал. За да пристапите до содржината, најпрвин треба да креирате кориснички профил преку формата за регистрација. По верификација ќе добиете потврден мејл дека вашиот профил е активиран и дека можете да се најавите.</p><p>Доколку веќе имате активен профил, само најавете се и продолжете.</p></div><div style="display:flex;gap:15px;flex-wrap:wrap;margin-top:30px">${button('https://rcsi.mk/memb/','Најави се','blue')}${button('https://rcsi.mk/logmembers/','Регистрирај се')}</div></div></section>`;
}
const legacyTitles={'popapi-moi':'Архива на објави','proba2':'Архивска страница','procop':'Архива на проекти','doma':'Архивска почетна страница','%d0%b7%d0%b4%d1%80%d0%b0%d0%b2%d0%be-%d1%81%d0%b2%d0%b5%d1%82%d1%83':'Здраво Свету!'};
export function renderPage(d,path){
  path=path.replace(/\/index\.html$/,'/');
  if(!path.endsWith('/'))path+='/';
  let title='Ротари Клуб Скопје Интернационал',body;
  const seg=path.split('/').filter(Boolean);
  const a=d.articles.find(a=>articleUrl(a)===path);
  const m=d.members.find(m=>memberUrl(m)===path);
  if(a){title=a.title;body=article(d,a)}
  else if(m){title=m.name;body=bio(d,m)}
  else if(path==='/')body=home(d);
  else if(['projects','events','visits','news'].includes(seg[0])&&seg.length===1){
    title={projects:'Проекти',events:'Настани',visits:'Посети',news:'Новости'}[seg[0]];
    body=archive(d,seg[0]);
  }
  else if(path==='/about-us/'){title='За нас';body=about(d)}
  else if(path==='/contact/'||path==='/become-a-member/'){
    title=path==='/contact/'?'Контакти':'Стани член';
    body=contact(d,path==='/become-a-member/');
  }
  else if(path==='/donate/'){title='Донирај';body=donate(d)}
  else if(path==='/all/'||path==='/board-members/'){
    title=path==='/all/'?'Сите членови':'Членови на Бордот';
    body=members(d,path);
  }
  else if(path==='/committees/'){title='Комитети';body=committees(d)}
  else if(path==='/president/'){title='Претседатели';body=presidents(d)}
  else if(path==='/honorary-members/'){title='Почесни членови';body=honorary(d)}
  else if(path==='/calendar/'){title='Календар';body=calendar(d)}
  else if(['/memb/','/logmembers/'].includes(path)){title='За членови';body=portal()}
  else if(path==='/archive/'||seg[0]==='category'){
    title='Архива';
    body=pagehero('Архива на содржини','Содржини од претходните верзии на веб-страницата.')+`<section class="page-section"><div class="wrap timeline">${Object.entries(legacyTitles).map(([slug,t])=>`<div class="timeline-item"><span>Архива</span><h3><a href="/${slug}/">${t} ↗</a></h3></div>`).join('')}</div></section>`;
  }
  else if(legacyTitles[seg[0]]){
    title=legacyTitles[seg[0]];
    body=pagehero(title)+`<section class="page-section"><div class="wrap about-content prose">${d.pages[seg[0]].map(w=>`<section>${w}</section>`).join('')||'<p>Оваа архивска страница нема објавена содржина.</p>'}</div></section>`;
  }
  else{
    title='Страницата не е пронајдена';
    body=pagehero('Оваа страница не е пронајдена.','Продолжете кон почетната страница.')+`<section class="page-section"><div class="wrap">${button('/','Кон почетната страница','blue')}</div></section>`;
  }
  return {
    title,
    html:header(d,path)+`<main id="main">${body}</main>`+footer(d)+dialogs(),
    description:a?plain(a.body).slice(0,160):'Ротари Клуб Скопје Интернационал. Каде што интернационалните пријатели се обединуваат во служба. Дистрикт 1912.'
  };
}
export function allRoutes(d){
  return ['/',...links.slice(1).map(x=>x[0]),'/news/','/become-a-member/','/memb/','/logmembers/','/archive/','/category/%d0%bd%d0%b5%d0%ba%d0%b0%d1%82%d0%b5%d0%b3%d0%be%d1%80%d0%b8%d0%b7%d0%b8%d1%80%d0%b0%d0%bd%d0%be/',...Object.keys(legacyTitles).map(s=>'/'+s+'/'),...d.articles.map(articleUrl),...d.members.map(memberUrl)];
}
