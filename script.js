const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

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

const taipeiDateParts = new Intl.DateTimeFormat("en", {
  timeZone: "Asia/Taipei",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).formatToParts(new Date());
const taipeiDateValues = Object.fromEntries(
  taipeiDateParts.map(({ type, value }) => [type, value]),
);
const taipeiDate = `${taipeiDateValues.year}-${taipeiDateValues.month}-${taipeiDateValues.day}`;

const eventSection = document.querySelector("[data-event-section]");
const eventCards = eventSection?.querySelectorAll("[data-event-date]") ?? [];

eventCards.forEach((eventCard) => {
  if (eventCard.dataset.eventDate < taipeiDate) eventCard.remove();
});

if (eventSection && !eventSection.querySelector("[data-event-date]")) {
  eventSection.remove();
  document.querySelector("[data-event-nav]")?.remove();
}

const competitionDialog = document.querySelector("[data-competition-dialog]");
const competitionOpenButton = document.querySelector("[data-competition-open]");
const competitionCloseButton = document.querySelector("[data-competition-close]");

const openCompetitionDialog = () => {
  if (!competitionDialog) return;
  if (typeof competitionDialog.showModal === "function") {
    competitionDialog.showModal();
  } else {
    competitionDialog.setAttribute("open", "");
  }
  document.body.classList.add("dialog-open");
};

const closeCompetitionDialog = () => {
  if (!competitionDialog) return;
  if (typeof competitionDialog.close === "function") {
    competitionDialog.close();
  } else {
    competitionDialog.removeAttribute("open");
  }
  document.body.classList.remove("dialog-open");
};

competitionOpenButton?.addEventListener("click", openCompetitionDialog);
competitionCloseButton?.addEventListener("click", closeCompetitionDialog);
competitionDialog?.addEventListener("close", () => document.body.classList.remove("dialog-open"));
competitionDialog?.addEventListener("click", (event) => {
  if (event.target === competitionDialog) closeCompetitionDialog();
});

const aboutSection = document.querySelector("#about");
const storyFeature = aboutSection?.querySelector(".story-feature");

if (storyFeature && !aboutSection.querySelector(".brazil-story")) {
  storyFeature.insertAdjacentHTML(
    "afterend",
    `
      <article class="brazil-story" data-reveal aria-labelledby="brazil-story-title">
        <div class="brazil-story-copy">
          <p class="eyebrow"><span></span> Brazil 2014 · Football Dream</p>
          <p class="brazil-year" aria-hidden="true">2014</p>
          <h3 id="brazil-story-title">和昔日隊友一起，<br />走進真正的<span>世界盃。</span></h3>
          <p class="brazil-lead">
            因為真的太喜歡足球，2014 年，我和以前足球隊的朋友相約前往巴西，
            親眼看一場夢想中的世界盃。這不只是一趟旅行，也是我人生中很重要的一個願望。
          </p>
          <p>
            從里約熱內盧的 FIFA Fan Fest、球場裡震動全身的歡呼聲，
            到基督像前穿著球衣留下的合照，我第一次如此靠近足球最盛大的舞台。
            那份跨越國界、語言與文化的熱情，也成為我後來持續投入花式足球、表演與教學的重要力量。
          </p>
          <blockquote>
            足球不只是被踢動的一顆球，還能把多年不變的友情、共同的夢想，
            和世界各地的人連在一起。
          </blockquote>
        </div>

        <div class="brazil-gallery" aria-label="2014 巴西世界盃旅程照片">
          <figure class="brazil-photo brazil-photo-main">
            <img src="assets/photos/brazil-2014/photo-1.svg" alt="唐心磊與足球隊友在里約熱內盧基督像前合照" loading="lazy" />
            <figcaption>CHRIST THE REDEEMER · RIO DE JANEIRO</figcaption>
          </figure>
          <figure class="brazil-photo brazil-photo-fan-fest">
            <img src="assets/photos/brazil-2014/photo-2.svg" alt="唐心磊與隊友參加里約熱內盧 FIFA Fan Fest" loading="lazy" />
            <figcaption>FIFA FAN FEST · RIO 2014</figcaption>
          </figure>
          <figure class="brazil-photo brazil-photo-stadium">
            <img src="assets/photos/brazil-2014/photo-3.svg" alt="唐心磊與隊友在 2014 世界盃球場內合照" loading="lazy" />
            <figcaption>INSIDE THE WORLD CUP STADIUM</figcaption>
          </figure>
        </div>
      </article>
    `,
  );

  const brazilStyles = document.createElement("style");
  brazilStyles.textContent = `
    .brazil-story {
      position: relative;
      display: grid;
      grid-template-columns: minmax(280px, .78fr) minmax(0, 1.22fr);
      gap: clamp(34px, 6vw, 92px);
      align-items: center;
      margin-top: clamp(80px, 11vw, 160px);
      padding: clamp(34px, 5vw, 72px);
      color: #fff;
      background: #090b0c;
      overflow: hidden;
    }

    .brazil-story::before {
      content: "BRAZIL";
      position: absolute;
      right: -.02em;
      bottom: -.22em;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255,255,255,.08);
      font: 800 clamp(110px, 18vw, 260px)/.8 var(--display);
      letter-spacing: -.04em;
      pointer-events: none;
    }

    .brazil-story-copy { position: relative; z-index: 2; }
    .brazil-story-copy .eyebrow { margin-bottom: 18px; }
    .brazil-year {
      margin: 0 0 18px;
      color: var(--acid);
      font: italic 800 clamp(66px, 8vw, 122px)/.8 var(--display);
      letter-spacing: -.04em;
    }

    .brazil-story h3 {
      margin: 0 0 28px;
      font-size: clamp(32px, 4vw, 62px);
      line-height: 1.08;
      letter-spacing: -.055em;
    }

    .brazil-story h3 span { color: var(--acid); }
    .brazil-story-copy > p:not(.eyebrow):not(.brazil-year) {
      margin: 0 0 18px;
      color: rgba(255,255,255,.68);
      font-size: 15px;
    }

    .brazil-story-copy .brazil-lead {
      color: #fff !important;
      font-size: clamp(18px, 1.8vw, 24px) !important;
      font-weight: 700;
      line-height: 1.55;
    }

    .brazil-story blockquote {
      margin: 30px 0 0;
      padding: 20px 0 20px 22px;
      color: rgba(255,255,255,.9);
      border-left: 3px solid var(--acid);
      font-weight: 600;
    }

    .brazil-gallery {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1.08fr .92fr;
      grid-template-rows: repeat(2, minmax(170px, 1fr));
      gap: 14px;
      min-height: 610px;
    }

    .brazil-photo {
      position: relative;
      margin: 0;
      overflow: hidden;
      background: #171b1d;
    }

    .brazil-photo-main { grid-row: 1 / 3; }
    .brazil-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 500ms ease;
    }
    .brazil-photo:hover img { transform: scale(1.035); }
    .brazil-photo-main img { object-position: 50% 50%; }

    .brazil-photo figcaption {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 28px 16px 13px;
      color: rgba(255,255,255,.86);
      background: linear-gradient(transparent, rgba(9,11,12,.82));
      font: 700 9px/1.2 var(--sans);
      letter-spacing: .14em;
    }

    @media (max-width: 900px) {
      .brazil-story { grid-template-columns: 1fr; }
      .brazil-gallery { min-height: 560px; }
    }

    @media (max-width: 620px) {
      .brazil-story {
        margin-left: -22px;
        margin-right: -22px;
        padding: 58px 22px 24px;
      }
      .brazil-gallery {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: minmax(360px, 1.35fr) minmax(150px, .65fr);
        min-height: 540px;
      }
      .brazil-photo-main { grid-column: 1 / 3; grid-row: 1; }
      .brazil-photo-fan-fest { grid-column: 1; grid-row: 2; }
      .brazil-photo-stadium { grid-column: 2; grid-row: 2; }
      .brazil-photo figcaption { font-size: 7px; letter-spacing: .09em; }
    }
  `;
  document.head.appendChild(brazilStyles);
}

const honorList = document.querySelector("#honors .honor-list");

if (honorList && !honorList.querySelector("[data-summer-circus-2026]")) {
  honorList.insertAdjacentHTML(
    "afterbegin",
    `
      <article data-summer-circus-2026>
        <time>2026</time>
        <h3>臺中夏日馬戲節<br />Juggling Battle 邀請賽</h3>
        <p>團體賽冠軍</p>
        <a class="honor-video" href="https://www.facebook.com/share/r/19EXXkP5hy/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="觀看 2026 臺中夏日馬戲節 Juggling Battle 團體賽冠軍紀錄">觀看奪冠紀錄 ↗</a>
      </article>
    `,
  );
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("[data-reveal]");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.13, rootMargin: "0px 0px -50px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
