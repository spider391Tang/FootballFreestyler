const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

const setHeaderState = () => header?.classList.toggle("scrolled", window.scrollY > 24);
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

const taipeiParts = new Intl.DateTimeFormat("en", {
  timeZone: "Asia/Taipei",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).formatToParts(new Date());
const taipeiValues = Object.fromEntries(taipeiParts.map(({ type, value }) => [type, value]));
const taipeiDate = `${taipeiValues.year}-${taipeiValues.month}-${taipeiValues.day}`;
const eventSection = document.querySelector("[data-event-section]");
const eventCards = eventSection?.querySelectorAll("[data-event-date]") ?? [];
eventCards.forEach((card) => {
  if (card.dataset.eventDate < taipeiDate) card.remove();
});
if (eventSection && !eventSection.querySelector("[data-event-date]")) {
  eventSection.remove();
  document.querySelector("[data-event-nav]")?.remove();
}

const competitionDialog = document.querySelector("[data-competition-dialog]");
const openCompetition = () => {
  if (!competitionDialog) return;
  if (typeof competitionDialog.showModal === "function") competitionDialog.showModal();
  else competitionDialog.setAttribute("open", "");
  document.body.classList.add("dialog-open");
};
const closeCompetition = () => {
  if (!competitionDialog) return;
  if (typeof competitionDialog.close === "function") competitionDialog.close();
  else competitionDialog.removeAttribute("open");
  document.body.classList.remove("dialog-open");
};
document.querySelector("[data-competition-open]")?.addEventListener("click", openCompetition);
document.querySelector("[data-competition-close]")?.addEventListener("click", closeCompetition);
competitionDialog?.addEventListener("close", () => document.body.classList.remove("dialog-open"));
competitionDialog?.addEventListener("click", (event) => {
  if (event.target === competitionDialog) closeCompetition();
});

const addStyles = (css) => {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
};

const aboutSection = document.querySelector("#about");
const storyFeature = aboutSection?.querySelector(".story-feature");
if (storyFeature && !aboutSection.querySelector(".brazil-story")) {
  storyFeature.insertAdjacentHTML("afterend", `<article class="brazil-story" data-reveal aria-labelledby="brazil-story-title"><div class="brazil-story-copy"><p class="eyebrow"><span></span> Brazil 2014 · Football Dream</p><p class="brazil-year" aria-hidden="true">2014</p><h3 id="brazil-story-title">和昔日隊友一起，<br />走進真正的<span>世界盃。</span></h3><p class="brazil-lead">因為真的太喜歡足球，2014 年，我和以前足球隊的朋友相約前往巴西，親眼看一場夢想中的世界盃。這不只是一趟旅行，也是我人生中很重要的一個願望。</p><p>從里約熱內盧的 FIFA Fan Fest、球場裡震動全身的歡呼聲，到基督像前穿著球衣留下的合照，我第一次如此靠近足球最盛大的舞台。那份跨越國界、語言與文化的熱情，也成為我後來持續投入花式足球、表演與教學的重要力量。</p><blockquote>足球不只是被踢動的一顆球，還能把多年不變的友情、共同的夢想，和世界各地的人連在一起。</blockquote></div><div class="brazil-gallery" aria-label="2014 巴西世界盃旅程照片"><figure class="brazil-photo brazil-photo-main"><img src="assets/photos/brazil-2014/photo-1.svg" alt="唐心磊與足球隊友在里約熱內盧基督像前合照" loading="lazy" /><figcaption>CHRIST THE REDEEMER · RIO DE JANEIRO</figcaption></figure><figure class="brazil-photo"><img src="assets/photos/brazil-2014/photo-2.svg" alt="唐心磊與隊友參加里約熱內盧 FIFA Fan Fest" loading="lazy" /><figcaption>FIFA FAN FEST · RIO 2014</figcaption></figure><figure class="brazil-photo"><img src="assets/photos/brazil-2014/photo-3.svg" alt="唐心磊與隊友在 2014 世界盃球場內合照" loading="lazy" /><figcaption>INSIDE THE WORLD CUP STADIUM</figcaption></figure></div></article>`);
  addStyles(`.brazil-story{position:relative;display:grid;grid-template-columns:minmax(280px,.78fr) minmax(0,1.22fr);gap:clamp(34px,6vw,92px);align-items:center;margin-top:clamp(80px,11vw,160px);padding:clamp(34px,5vw,72px);color:#fff;background:#090b0c;overflow:hidden}.brazil-story::before{content:"BRAZIL";position:absolute;right:-.02em;bottom:-.22em;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.08);font:800 clamp(110px,18vw,260px)/.8 var(--display);pointer-events:none}.brazil-story-copy,.brazil-gallery{position:relative;z-index:2}.brazil-year{margin:0 0 18px;color:var(--acid);font:italic 800 clamp(66px,8vw,122px)/.8 var(--display)}.brazil-story h3{margin:0 0 28px;font-size:clamp(32px,4vw,62px);line-height:1.08;letter-spacing:-.055em}.brazil-story h3 span{color:var(--acid)}.brazil-story-copy>p:not(.eyebrow):not(.brazil-year){margin:0 0 18px;color:rgba(255,255,255,.68);font-size:15px}.brazil-story-copy .brazil-lead{color:#fff!important;font-size:clamp(18px,1.8vw,24px)!important;font-weight:700;line-height:1.55}.brazil-story blockquote{margin:30px 0 0;padding:20px 0 20px 22px;border-left:3px solid var(--acid);font-weight:600}.brazil-gallery{display:grid;grid-template-columns:1.08fr .92fr;grid-template-rows:repeat(2,minmax(170px,1fr));gap:14px;min-height:610px}.brazil-photo{position:relative;margin:0;overflow:hidden;background:#171b1d}.brazil-photo-main{grid-row:1/3}.brazil-photo img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}.brazil-photo:hover img{transform:scale(1.035)}.brazil-photo figcaption{position:absolute;left:0;right:0;bottom:0;padding:28px 16px 13px;color:rgba(255,255,255,.86);background:linear-gradient(transparent,rgba(9,11,12,.82));font:700 9px/1.2 var(--sans);letter-spacing:.14em}@media(max-width:900px){.brazil-story{grid-template-columns:1fr}.brazil-gallery{min-height:560px}}@media(max-width:620px){.brazil-story{margin-left:-22px;margin-right:-22px;padding:58px 22px 24px}.brazil-gallery{grid-template-columns:1fr 1fr;grid-template-rows:minmax(360px,1.35fr) minmax(150px,.65fr);min-height:540px}.brazil-photo-main{grid-column:1/3;grid-row:1}}`);
}

const servicesSection = document.querySelector("#services");
const serviceList = servicesSection?.querySelector(".service-list");
if (serviceList && !servicesSection.querySelector("[data-lesson-plan]")) {
  serviceList.insertAdjacentHTML("afterend", `<article class="lesson-plan" data-lesson-plan data-reveal aria-labelledby="lesson-plan-title"><div class="lesson-plan-intro"><p class="eyebrow"><span></span> Freestyle Football Lesson Plan</p><p class="lesson-plan-label">PLAY · CONTROL · CREATE</p><h3 id="lesson-plan-title">從第一下控球，<br />練出自己的<span>節奏。</span></h3><p class="lesson-plan-lead">以容易成功的挑戰帶學員認識花式足球，從球感、基礎顛球到第一個花式動作，在遊戲與分組任務中建立協調、專注、自信與創意。</p><dl class="lesson-plan-facts"><div><dt>適合對象</dt><dd>兒童・青少年・成人</dd></div><div><dt>建議時間</dt><dd>60–90 分鐘</dd></div><div><dt>課程程度</dt><dd>零基礎可參加</dd></div><div><dt>課程場地</dt><dd>室內／戶外皆可</dd></div></dl><div class="lesson-plan-actions"><a class="button button-primary" href="https://www.facebook.com/share/r/1BWEJ2tgqP/?mibextid=wwXIfr" target="_blank" rel="noreferrer"><span>觀看教學示範</span><span aria-hidden="true">↗</span></a><a class="lesson-plan-contact" href="#contact">洽詢課程合作 <i aria-hidden="true">↗</i></a></div></div><div class="lesson-plan-content"><p class="lesson-plan-kicker">COURSE FLOW</p><ol class="lesson-flow"><li><span>01</span><div><strong>動態暖身與球感</strong><p>用移動、反應遊戲與腳底帶球喚醒身體，熟悉足球的重量與彈性。</p></div></li><li><span>02</span><div><strong>基礎控球</strong><p>從腳背甜蜜點、左右腳交換與低高度連續觸球，建立穩定節奏。</p></div></li><li><span>03</span><div><strong>第一個花式動作</strong><p>依程度練習 Foot Stall、Around the World 入門拆解，或基礎 Transition。</p></div></li><li><span>04</span><div><strong>闖關與分組挑戰</strong><p>把技術變成遊戲，透過個人任務、接力與團隊合作累積成功經驗。</p></div></li><li><span>05</span><div><strong>小組合與成果分享</strong><p>選擇喜歡的動作串成短組合，用自己的節奏完成最後展示。</p></div></li></ol><div class="lesson-outcomes"><p>課程帶走的不只是一個招式</p><ul><li>身體協調與左右腳控制</li><li>專注力、耐心與挫折調整</li><li>舞台自信與創意表達</li><li>團隊互動與互相鼓勵</li></ul></div></div></article>`);
  addStyles(`.lesson-plan{position:relative;display:grid;grid-template-columns:minmax(300px,.9fr) minmax(0,1.1fr);gap:clamp(38px,7vw,110px);max-width:var(--max);margin:clamp(70px,9vw,130px) auto 0;padding:clamp(34px,5vw,72px);color:#fff;background:radial-gradient(circle at 0 100%,rgba(200,255,26,.12),transparent 35%),var(--ink);overflow:hidden}.lesson-plan::before{content:"LEARN";position:absolute;right:-.03em;bottom:-.25em;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.06);font:800 clamp(120px,20vw,290px)/.8 var(--display);pointer-events:none}.lesson-plan-intro,.lesson-plan-content{position:relative;z-index:1}.lesson-plan-label{margin:0 0 18px;color:var(--acid);font:italic 800 15px/1 var(--display);letter-spacing:.18em}.lesson-plan h3{margin:0;font-size:clamp(38px,4.7vw,70px);line-height:1.12;letter-spacing:-.065em}.lesson-plan h3 span{color:var(--acid)}.lesson-plan-lead{margin:28px 0 0;color:rgba(255,255,255,.64);font-size:15px}.lesson-plan-facts{display:grid;grid-template-columns:1fr 1fr;gap:1px;margin:34px 0 0;background:rgba(255,255,255,.14)}.lesson-plan-facts div{padding:16px;background:rgba(17,21,23,.96)}.lesson-plan-facts dt{color:var(--acid);font-size:9px;font-weight:800;letter-spacing:.12em}.lesson-plan-facts dd{margin:7px 0 0;font-size:12px;font-weight:700}.lesson-plan-actions{display:flex;flex-wrap:wrap;align-items:center;gap:18px 28px;margin-top:34px}.lesson-plan-contact{padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,.34);font-size:11px;font-weight:800;letter-spacing:.08em}.lesson-plan-contact:hover{color:var(--acid)}.lesson-plan-contact i{color:var(--acid);font-style:normal}.lesson-plan-kicker{margin:0 0 18px;color:var(--acid);font:800 10px/1 var(--sans);letter-spacing:.18em}.lesson-flow{margin:0;padding:0;list-style:none;border-top:1px solid rgba(255,255,255,.16)}.lesson-flow li{display:grid;grid-template-columns:48px 1fr;gap:18px;padding:21px 0;border-bottom:1px solid rgba(255,255,255,.16)}.lesson-flow li>span{color:var(--acid);font:italic 800 24px/1 var(--display)}.lesson-flow strong{display:block;margin-bottom:5px;font-size:14px}.lesson-flow p{margin:0;color:rgba(255,255,255,.52);font-size:11px;line-height:1.65}.lesson-outcomes{margin-top:28px;padding:22px;color:var(--ink);background:var(--acid)}.lesson-outcomes>p{margin:0 0 12px;font-size:14px;font-weight:900}.lesson-outcomes ul{display:grid;grid-template-columns:1fr 1fr;gap:8px 20px;margin:0;padding:0;list-style:none}.lesson-outcomes li{font-size:10px;font-weight:700}.lesson-outcomes li::before{content:"＋";margin-right:6px}@media(max-width:900px){.lesson-plan{grid-template-columns:1fr}}@media(max-width:620px){.lesson-plan{margin-left:-22px;margin-right:-22px;padding:58px 22px 30px}.lesson-plan-facts,.lesson-outcomes ul{grid-template-columns:1fr}.lesson-flow li{grid-template-columns:38px 1fr}}`);
}

const familyVideoGrid = document.querySelector("#natsuki .short-video-grid");
if (familyVideoGrid && !familyVideoGrid.querySelector("[data-family-video-ils9]")) {
  familyVideoGrid.insertAdjacentHTML("beforeend", `<article class="short-video-card featured" data-family-video-ils9><div class="short-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/IlS9u0WfnFk" title="唐心磊與夏姬親子花式足球演出影片" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="short-video-copy"><p><span>04</span> FAMILY PERFORMANCE</p><h4>親子花式足球演出</h4><p>父女把技巧、節奏與默契帶上舞台，讓足球不只在空中舞動，也成為一家人共同完成的表演故事。</p><a href="https://youtube.com/shorts/IlS9u0WfnFk" target="_blank" rel="noreferrer">前往 YouTube 觀看 <i aria-hidden="true">↗</i></a></div></article>`);
}

const worksSection = document.querySelector("#works");
if (worksSection && !document.querySelector("#signature-moves")) {
  worksSection.insertAdjacentHTML("beforebegin", `<section id="signature-moves" class="section signature-moves" aria-labelledby="signature-title" data-signature-moves><div class="section-number" aria-hidden="true">技</div><div class="signature-shell"><div class="signature-heading" data-reveal><p class="eyebrow"><span></span> Signature Moves · 球花寶典</p><h2 id="signature-title">把擅長的招式，<br />練成自己的<span>江湖名號。</span></h2><p>這裡收藏我的代表技巧與舞台招式。從雙球控制、Lower、Upper、Sit-down 到各種 Transition，之後會持續把新的得意技加入這本「球花寶典」。</p></div><article class="signature-card" data-reveal><div class="signature-video"><iframe src="https://www.youtube-nocookie.com/embed/CFNJCOmJ7Kw" title="唐心磊二刀流，同時控制兩顆足球的花式足球招式" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="signature-copy"><p class="signature-index">第一式 · TWO-BALL CONTROL</p><h3>二刀流</h3><p class="signature-subtitle">同時踢兩顆球</p><p>左右腳各自掌握一顆球，在不同節奏中維持高度、落點與連續觸球。看起來像兩條軌道同時運行，真正的難度是讓雙腳各自獨立，卻又保持整體節奏一致。</p><dl><div><dt>招式類型</dt><dd>雙球控制</dd></div><div><dt>核心能力</dt><dd>節奏分離・左右腳協調</dd></div><div><dt>舞台特色</dt><dd>高辨識度・視覺張力</dd></div></dl><a href="https://youtube.com/shorts/CFNJCOmJ7Kw" target="_blank" rel="noreferrer">觀看完整招式 <i aria-hidden="true">↗</i></a></div></article><p class="signature-coming" data-reveal><span>COMING NEXT</span> 更多代表招式將陸續收錄</p></div></section>`);
  addStyles(`.signature-moves{position:relative;color:#fff;background:#0a0d0e;overflow:hidden}.signature-moves::before{content:"TRICKS";position:absolute;right:-.03em;top:.08em;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.055);font:800 clamp(120px,22vw,330px)/.8 var(--display);pointer-events:none}.signature-shell{position:relative;z-index:1;max-width:var(--max);margin:auto}.signature-heading{display:grid;grid-template-columns:minmax(280px,.9fr) minmax(280px,.6fr);gap:clamp(30px,8vw,120px);align-items:end;margin-bottom:clamp(45px,7vw,90px)}.signature-heading h2{margin:0;font-size:clamp(46px,7vw,100px);line-height:.98;letter-spacing:-.07em}.signature-heading h2 span{color:var(--acid)}.signature-heading>p:last-child{margin:0;color:rgba(255,255,255,.6);font-size:15px}.signature-card{display:grid;grid-template-columns:minmax(280px,1.08fr) minmax(280px,.92fr);min-height:620px;background:#15191b;border:1px solid rgba(255,255,255,.12)}.signature-video{position:relative;min-height:620px;background:#050606;overflow:hidden}.signature-video::after{content:"二刀流";position:absolute;left:24px;bottom:18px;color:rgba(255,255,255,.12);font:800 clamp(55px,8vw,115px)/.8 var(--display);pointer-events:none}.signature-video iframe{width:100%;height:100%;min-height:620px;border:0}.signature-copy{display:flex;flex-direction:column;justify-content:center;padding:clamp(34px,6vw,82px)}.signature-index{margin:0 0 20px;color:var(--acid);font:800 10px/1 var(--sans);letter-spacing:.16em}.signature-copy h3{margin:0;font-size:clamp(62px,9vw,138px);line-height:.8;letter-spacing:-.07em}.signature-subtitle{margin:22px 0 26px!important;color:#fff!important;font:italic 800 clamp(22px,3vw,40px)/1 var(--display)}.signature-copy>p:not(.signature-index):not(.signature-subtitle){margin:0;color:rgba(255,255,255,.58);font-size:14px}.signature-copy dl{display:grid;gap:0;margin:32px 0;border-top:1px solid rgba(255,255,255,.16)}.signature-copy dl div{display:grid;grid-template-columns:92px 1fr;gap:18px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.16)}.signature-copy dt{color:rgba(255,255,255,.4);font-size:9px;font-weight:800;letter-spacing:.1em}.signature-copy dd{margin:0;font-size:11px;font-weight:700}.signature-copy a{align-self:flex-start;padding-bottom:6px;color:var(--acid);border-bottom:1px solid var(--acid);font-size:11px;font-weight:800;letter-spacing:.08em}.signature-copy a i{font-style:normal}.signature-coming{display:flex;justify-content:space-between;gap:20px;margin:28px 0 0;padding-top:18px;color:rgba(255,255,255,.45);border-top:1px solid rgba(255,255,255,.12);font-size:10px;font-weight:700;letter-spacing:.1em}.signature-coming span{color:var(--acid)}@media(max-width:900px){.signature-heading,.signature-card{grid-template-columns:1fr}.signature-video{min-height:540px}.signature-video iframe{min-height:540px}}@media(max-width:620px){.signature-moves{padding-left:22px;padding-right:22px}.signature-heading{display:block}.signature-heading>p:last-child{margin-top:24px}.signature-card{margin-left:-22px;margin-right:-22px;border-left:0;border-right:0}.signature-video,.signature-video iframe{min-height:520px}.signature-copy{padding:42px 22px 48px}.signature-copy h3{font-size:80px}.signature-coming{display:block;line-height:1.8}}`);
}

const signatureShell = document.querySelector("#signature-moves .signature-shell");
const signatureComing = signatureShell?.querySelector(".signature-coming");
if (signatureComing && !signatureShell.querySelector("[data-football-rope]")) {
  signatureComing.insertAdjacentHTML("beforebegin", `<article class="signature-card signature-card-rope" data-football-rope data-reveal><div class="signature-video signature-video-rope"><iframe src="https://www.youtube-nocookie.com/embed/WzilNdCLoDQ" title="唐心磊將花式足球結合跳繩的跨界招式" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="signature-copy"><p class="signature-index">第二式 · FOOTBALL × JUMP ROPE</p><h3>繩球合一</h3><p class="signature-subtitle">足球結合跳繩</p><p>跳繩維持連續旋轉，足球同時在腳下被控制。每一次過繩、觸球與落地都必須卡在同一個拍點，把兩種截然不同的節奏疊成一套流暢又有爆發力的跨界招式。</p><dl><div><dt>招式類型</dt><dd>跨界複合技巧</dd></div><div><dt>核心能力</dt><dd>節奏同步・空間判斷</dd></div><div><dt>舞台特色</dt><dd>動態強烈・驚喜感高</dd></div></dl><a href="https://youtube.com/shorts/WzilNdCLoDQ" target="_blank" rel="noreferrer">觀看完整招式 <i aria-hidden="true">↗</i></a></div></article>`);
  addStyles(`.signature-card-rope{margin-top:28px}.signature-card-rope .signature-video{order:2}.signature-card-rope .signature-copy{order:1}.signature-video-rope::after{content:"繩球合一"}.signature-card-rope h3{font-size:clamp(52px,7vw,112px)}@media(max-width:900px){.signature-card-rope .signature-video{order:1}.signature-card-rope .signature-copy{order:2}}`);
}

const honorList = document.querySelector("#honors .honor-list");
if (honorList && !honorList.querySelector("[data-summer-circus-2026]")) {
  honorList.insertAdjacentHTML("afterbegin", `<article data-summer-circus-2026><time>2026</time><h3>臺中夏日馬戲節<br />Juggling Battle 邀請賽</h3><p>團體賽冠軍</p><a class="honor-video" href="https://www.facebook.com/share/r/19EXXkP5hy/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="觀看 2026 臺中夏日馬戲節 Juggling Battle 團體賽冠軍紀錄">觀看奪冠紀錄 ↗</a></article>`);
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("[data-reveal]");
if (reduceMotion || !("IntersectionObserver" in window)) revealItems.forEach((item) => item.classList.add("is-visible"));
else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.13, rootMargin: "0px 0px -50px" });
  revealItems.forEach((item) => observer.observe(item));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
