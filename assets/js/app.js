/* ════════════════════════════════════════════════════════════════
   NEXUS // app.js — router, renderers, infinite feed, chrome
   ════════════════════════════════════════════════════════════════ */

/* ── tiny helpers ──────────────────────────────────────────────── */
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const fmtDate = d => d.replaceAll('-', '.');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function hueFromSlug(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % 360; }
const patFromSlug = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return (h >>> 3) % 4; };

/* ── icon set (inline svg, lucide-style) ───────────────────────── */
const _svg = (paths, extra) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra || ''}>${paths}</svg>`;
const ICONS = {
  github: () => _svg('<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>'),
  x: () => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 1.2h3.7l-8.1 9.2L24 22.8h-7.5l-5.8-7.6-6.7 7.6H.3l8.7-9.9L0 1.2h7.7l5.3 7 6-7zm-1.3 19.4h2L6.3 3.3H4.2l13.4 17.3z"/></svg>`,
  linkedin: () => _svg('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'),
  mail: () => _svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
  rss: () => _svg('<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>'),
  arrowRight: () => _svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
  arrowLeft: () => _svg('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>'),
  calendar: () => _svg('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
  clock: () => _svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
  zap: () => _svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
  target: () => _svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
  trophy: () => _svg('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>'),
  alert: () => _svg('<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
  flag: () => _svg('<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>'),
  book: () => _svg('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'),
  layers: () => _svg('<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'),
  terminal: () => _svg('<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>'),
};
const icon = (n) => (ICONS[n] ? ICONS[n]() : '');

/* ── data indexes ──────────────────────────────────────────────── */
const POSTS_DESC = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
const REPORTS_DESC = [...REPORTS].sort((a, b) => b.date.localeCompare(a.date));
const FEED = [
  ...POSTS.map(p => ({ kind: 'post', date: p.date, ref: p })),
  ...REPORTS.map(r => ({ kind: 'report', date: r.date, ref: r })),
].sort((a, b) => b.date.localeCompare(a.date));

/* ── shared bits ───────────────────────────────────────────────── */
function socialsHTML(id) {
  return SITE.socials.map(s => {
    const ext = /^https?:/i.test(s.url);
    return `<a class="soc" data-label="${esc(s.label)}" href="${s.url}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''} aria-label="${esc(s.label)}">${icon(s.id)}</a>`;
  }).join('');
}
function artHTML(seedSlug, glyph) {
  const h = hueFromSlug(seedSlug), p = patFromSlug(seedSlug);
  return `<div class="art p${p}" style="--h:${h}"><span class="glyph">${esc(glyph)}</span><span class="beam"></span></div>`;
}
function sectionHead(idx, title, sub, meta) {
  return `<div class="section-head reveal">
    <div class="sh-row"><span class="section-index">${idx}</span><h2 class="section-title glitch" data-text="${esc(title)}">${esc(title)}</h2></div>
    ${sub ? `<p class="section-sub">${sub}</p>` : ''}
    ${meta ? `<div class="section-meta">${meta}</div>` : ''}
  </div>`;
}

/* ── HOME ──────────────────────────────────────────────────────── */
function renderHome(view) {
  const stats = [
    { n: String(POSTS.length), l: 'LOGS TRANSMITTED' },
    { n: String(REPORTS.length), l: 'MISSION REPORTS' },
    { n: String(REPORTS.length), l: 'WEEKS ON RECORD' },
    { n: '<i>∞</i>', l: 'CURIOSITY LEVEL' },
  ];
  view.innerHTML = `
  <section class="hero">
    <div class="hero-grid-floor" aria-hidden="true"></div>
    <div class="container hero-inner">
      <div class="hero-status"><span class="status-dot"></span>SIGNAL LOCKED · CHANNEL OPEN<span class="caret"></span></div>
      <div class="hero-kicker">// TRANSMISSION ORIGIN — <span class="magenta">${esc(SITE.location)}</span></div>
      <h1 class="hero-name">
        <span class="glitch" data-text="${esc(SITE.firstName.toUpperCase())}">${esc(SITE.firstName.toUpperCase())}</span>
        <span class="accent glitch" data-text="${esc(SITE.lastName.toUpperCase())}">${esc(SITE.lastName.toUpperCase())}</span>
      </h1>
      <div class="hero-role">${esc(SITE.role)}</div>
      <p class="hero-tag"><span class="tt-text"></span><span class="caret"></span></p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#/blog">READ THE BLOG <span class="mono">&gt;&gt;</span></a>
        <a class="btn btn-ghost" href="#/reports">MISSION REPORTS</a>
      </div>
      <div class="hero-socials-label">// UPLINK CHANNELS</div>
      <div class="socials" id="heroSocials">${socialsHTML()}</div>
      <div class="hero-stats">
        ${stats.map(s => `<div class="hero-stat"><b>${s.n}</b><span>${s.l}</span></div>`).join('')}
      </div>
    </div>
    <div class="hero-scroll" aria-hidden="true">SCROLL</div>
  </section>

  <section class="section-pad container">
    ${sectionHead('// 001 · OPERATOR', 'ABOUT THE OPERATOR',
      'Who is behind this terminal — and why the broadcasts exist.',
      `<b>${POSTS.length}</b> LOGS · <b>${REPORTS.length}</b> REPORTS`)}
    <div class="about-grid">
      <div class="about-visual reveal">
        <div class="avatar-ring" aria-hidden="true"></div>
        <div class="avatar-ring2" aria-hidden="true"></div>
        <div class="avatar"><div><span class="avatar-txt">${esc(SITE.initials)}</span><span class="avatar-sub">OPERATOR // NX-01</span></div></div>
        <div class="about-readout">STATUS: <b>ONLINE</b> · MODE: <b>LEARNING</b></div>
      </div>
      <div class="about-body reveal" style="--d:.12s">
        ${SITE.bio.map(p => `<p>${p}</p>`).join('')}
        <div class="skill-wrap">
          <div class="skill-head">// LOADOUT</div>
          <div class="skills">${SITE.skills.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>
        </div>
        <div class="about-cta">
          <a class="btn btn-primary" href="#/blog">ENTER THE ARCHIVE</a>
          <a class="btn btn-ghost" href="mailto:${SITE.email}">OPEN CHANNEL</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section-pad container feed-wrap" id="feedSection">
    ${sectionHead('// 002 · STREAM', 'LATEST TRANSMISSIONS',
      'A merged feed of blog entries and weekly dossiers — newest signals first. Keep scrolling; the archive keeps loading.',
      `<b>${FEED.length}</b> SIGNALS IN BUFFER · AUTO-LOAD`)}
    <div class="feed" id="feed" aria-live="polite"></div>
    <div id="feedSentinel" aria-hidden="true" style="height:1px"></div>
    <div class="feed-loader" id="feedLoader" role="status">
      <span class="hex-spin" aria-hidden="true"></span>
      <span class="feed-loader-text">RECEIVING TRANSMISSION<span class="dots"></span></span>
    </div>
    <div class="feed-end" id="feedEnd">
      <div class="fe-line"><span class="fe-text">— END OF TRANSMISSION ARCHIVE<b>_</b> —</span></div>
      <div class="fe-sub">You've reached the edge of the known universe. Check back after the next entry.</div>
    </div>
  </section>`;

  typewriter($('.hero-tag', view), SITE.taglines);
  glitchLoop($('.hero-name .glitch', view));
  initFeed();
}

/* infinite feed */
let feedIdx = 0, feedBusy = false, feedDone = false, feedIO = null;
const BATCH = 5;
function feedCardHTML(item) {
  const it = item.ref;
  const isPost = item.kind === 'post';
  const href = isPost ? `#/read/blog/${it.slug}` : `#/read/reports/${it.slug}`;
  return `<a class="tx-card panel frame reveal ${isPost ? '' : 'is-report'}" href="${href}">
    <span class="tx-kind">
      <span class="tx-glyph">${icon(isPost ? 'terminal' : 'target')}</span>
      <span class="tx-kind-label">${isPost ? 'LOG' : 'DOSSIER'}</span>
    </span>
    <span class="tx-main">
      <span class="tx-title">${esc(it.title)}</span>
      <span class="tx-excerpt">${esc(it.excerpt)}</span>
      <span class="tx-meta">
        ${isPost
          ? `<span class="is-hot">${fmtDate(it.date)}</span><span>${it.minutes} MIN READ</span><span>${it.tags.map(t => esc(t.toUpperCase())).join(' · ')}</span>`
          : `<span class="is-hot">WEEK ${String(it.week).padStart(2, '0')}</span><span>${fmtDate(it.date)}</span><span>${it.hours} HRS</span>`}
      </span>
    </span>
    <span class="tx-side">
      <span class="tx-date">${isPost ? 'BLOG' : 'REPORT'} · ${fmtDate(it.date)}</span>
      <span class="tx-open">OPEN ${isPost ? 'LOG' : 'DOSSIER'} ${icon('arrowRight')}</span>
    </span>
  </a>`;
}
function initFeed() {
  feedIdx = 0; feedBusy = false; feedDone = false;
  if (feedIO) { feedIO.disconnect(); feedIO = null; }
  const feedEl = $('#feed'), loader = $('#feedLoader'), endEl = $('#feedEnd'), sentinel = $('#feedSentinel');
  feedEl.innerHTML = '';
  loader.classList.remove('is-on'); endEl.classList.remove('is-on');
  // the sentinel is a real (1px) element that stays in the layout, unlike the
  // loader which is display:none between batches — so the observer keeps working.
  feedIO = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) feedLoadMore();
  }, { rootMargin: '420px 0px' });
  feedIO.observe(sentinel);
  feedLoadMore();
}
function feedLoadMore() {
  if (feedBusy || feedDone) return;
  feedBusy = true;
  const feedEl = $('#feed'), loader = $('#feedLoader'), endEl = $('#feedEnd');
  loader.classList.add('is-on');
  setTimeout(() => {
    const slice = FEED.slice(feedIdx, feedIdx + BATCH);
    if (slice.length) {
      feedEl.insertAdjacentHTML('beforeend',
        slice.map((it, i) => feedCardHTML(it).replace('class="', `style="--d:${i * 0.07}s" class="`)).join(''));
      feedIdx += slice.length;
      initReveals(feedEl);
    }
    loader.classList.remove('is-on');
    feedBusy = false;
    if (feedIdx >= FEED.length) {
      feedDone = true;
      endEl.classList.add('is-on');
      if (feedIO) feedIO.disconnect();
      return;
    }
    // short-page guard: if less than one viewport remains below the fold, keep filling
    if (document.documentElement.scrollHeight - scrollY - innerHeight < innerHeight) feedLoadMore();
  }, 460);
}

/* ── BLOG ──────────────────────────────────────────────────────── */
function postCardHTML(p, rank, featured) {
  const glyph = (p.title[0] || 'N').toUpperCase();
  return `<article class="post-card tilt frame reveal${featured ? ' is-featured' : ''}" style="--d:${Math.min(rank * 0.06, .3)}s">
    <div class="glare" aria-hidden="true"></div>
    <a class="pc-cover" href="#/read/blog/${p.slug}" aria-label="Read: ${esc(p.title)}">
      ${featured ? '<span class="badge-featured">LATEST SIGNAL</span>' : ''}
      <span class="pc-rank">LOG.${String(rank).padStart(2, '0')}</span>
      <span class="pc-art">${artHTML(p.slug, glyph)}</span>
    </a>
    <div class="pc-body">
      <div class="pc-tags">${p.tags.map(t => `<span class="chip${t === p.tags[0] ? ' is-hot' : ''}">${esc(t.toUpperCase())}</span>`).join('')}</div>
      <a class="pc-title" href="#/read/blog/${p.slug}">${esc(p.title)}</a>
      <p class="pc-excerpt">${esc(p.excerpt)}</p>
      <div class="pc-foot">
        <span class="pc-date">${fmtDate(p.date)} · ${p.minutes} MIN</span>
        <span class="pc-more">READ ENTRY ${icon('arrowRight')}</span>
      </div>
    </div>
  </article>`;
}
function renderBlog(view) {
  const last = POSTS_DESC[0] ? POSTS_DESC[0].date : '';
  view.innerHTML = `
  <section class="section-pad container">
    ${sectionHead('// 02 · ARCHIVE', 'BLOG ARCHIVE',
      'Long-form entries — deep dives, field notes and post-mortems. Newest signals first.',
      `<b>${POSTS.length}</b> ENTRIES · LAST <b>${fmtDate(last)}</b>`)}
    <div class="blog-grid">
      ${POSTS_DESC.map((p, i) => postCardHTML(p, POSTS_DESC.length - i, i === 0)).join('')}
    </div>
  </section>`;
}

/* ── REPORTS ───────────────────────────────────────────────────── */
function reportRowHTML(r, i) {
  return `<article class="rep-row frame reveal" style="--d:${Math.min(i * 0.07, .35)}s">
    <div class="rep-week">
      <span class="rw-num">${String(r.week).padStart(2, '0')}</span>
      <span class="rw-label">WEEK ${String(r.week).padStart(2, '0')}</span>
    </div>
    <div class="rep-main">
      <a class="rep-title" href="#/read/reports/${r.slug}">${esc(r.title)}</a>
      <div class="rep-focus">▸ ${esc(r.focus)}</div>
      <p class="rep-excerpt">${esc(r.excerpt)}</p>
    </div>
    <div class="rep-side">
      <div class="rep-stats">
        <div class="rep-stat"><b>${r.hours}</b><span>HOURS</span></div>
        <div class="rep-stat"><b>${r.topics}</b><span>TOPICS</span></div>
        <div class="rep-stat"><b>${r.tasks}</b><span>TASKS</span></div>
      </div>
      <div class="rep-progress">
        <div class="rp-track"><div class="rp-fill" style="--w:${r.progress}%"></div></div>
        <div class="rp-label"><span>LEARNING PATH</span><b>${r.progress}%</b></div>
      </div>
      <a class="rep-open" href="#/read/reports/${r.slug}">OPEN DOSSIER ${icon('arrowRight')}<span class="status-chip st-done">${r.status}</span></a>
    </div>
  </article>`;
}
function renderReports(view) {
  const last = REPORTS_DESC[0];
  view.innerHTML = `
  <section class="section-pad container">
    ${sectionHead('// 03 · LEDGER', 'MISSION REPORTS',
      'Weekly progress dossiers — hours logged, battles won, lessons burned in. Filed every Monday.',
      `<b>${REPORTS.length}</b> DOSSIERS · PATH <b>${last ? last.progress : 0}%</b>`)}
    <div class="rep-hero">
      <span class="rh-ico">${icon('target')}</span>
      <p><b>OPERATOR TRAINING PROGRAM — ACTIVE.</b> Every report is a public commitment device: what I studied, what I broke, what's next.</p>
      <span class="rh-right">CADENCE: WEEKLY · MONDAYS</span>
    </div>
    <div class="ledger">
      ${REPORTS_DESC.map((r, i) => reportRowHTML(r, i)).join('')}
    </div>
  </section>`;
}

/* ── READER ────────────────────────────────────────────────────── */
function renderRead(view, type, slug) {
  const arr = type === 'blog' ? POSTS_DESC : REPORTS_DESC;
  const idx = arr.findIndex(x => x.slug === slug);
  if (idx < 0) { location.hash = '#/'; return; }
  const it = arr[idx];
  const isPost = type === 'blog';
  const newer = idx > 0 ? arr[idx - 1] : null;
  const older = idx < arr.length - 1 ? arr[idx + 1] : null;
  const glyph = (it.title[0] || 'N').toUpperCase();
  const pnLabel = isPost ? 'TRANSMISSION' : 'DOSSIER';

  view.innerHTML = `
  <section class="section-pad container">
    <a class="rd-back" href="#/${isPost ? 'blog' : 'reports'}">${icon('arrowLeft')} RETURN TO ${isPost ? 'ARCHIVE' : 'LEDGER'}</a>
    <div class="rd-crumbs" id="rdCrumbs">NX://ARCHIVE/${isPost ? 'BLOG' : 'REPORTS'}/${slug.toUpperCase()}</div>
    <h1 class="rd-title">${esc(it.title)}</h1>
    <div class="rd-meta">
      <span class="rm-item">${icon('calendar')} ${fmtDate(it.date)}</span>
      ${isPost
        ? `<span class="rm-item">${icon('clock')} ${it.minutes} MIN READ</span><span class="rm-item">${icon('layers')} ${it.tags.map(t => esc(t.toUpperCase())).join(' · ')}</span>`
        : `<span class="rm-item">${icon('clock')} ${it.hours} HRS LOGGED</span><span class="rm-item">${icon('layers')} ${it.topics} TOPICS · ${it.tasks} TASKS</span><span class="rm-item">${icon('trophy')} ${it.status}</span>`}
    </div>
    <div class="rd-cover">${artHTML(it.slug, glyph)}</div>

    ${!isPost ? `
    <div class="dossier">
      <div class="dos-panel panel">
        <div class="dos-head">${icon('zap')} VITALS — WEEK ${String(it.week).padStart(2, '0')}</div>
        <div class="dos-stats">
          <div class="dos-stat"><b>${it.hours}</b><span>HOURS</span></div>
          <div class="dos-stat"><b>${it.topics}</b><span>TOPICS</span></div>
          <div class="dos-stat"><b>${it.progress}%</b><span>PATH</span></div>
          <div class="dos-stat"><b>${it.tasks.split('/')[0]}</b><span>TASKS DONE</span></div>
        </div>
      </div>
      <div class="dos-panel panel"><div class="dos-head">${icon('trophy')} WINS</div><ul class="dos-list is-win">${it.wins.map(w => `<li>${esc(w)}</li>`).join('')}</ul></div>
      <div class="dos-panel panel"><div class="dos-head">${icon('alert')} STRUGGLES</div><ul class="dos-list is-struggle">${it.struggles.map(w => `<li>${esc(w)}</li>`).join('')}</ul></div>
      <div class="dos-panel panel"><div class="dos-head">${icon('flag')} NEXT WEEK GOALS</div><ul class="dos-list is-goal">${it.goals.map(w => `<li>${esc(w)}</li>`).join('')}</ul></div>
      <div class="dos-panel panel"><div class="dos-head">${icon('book')} RESOURCES</div><div class="skills">${it.resources.map(r => `<span class="chip">${esc(r)}</span>`).join('')}</div></div>
    </div>` : ''}

    <div class="rd-content">${it.html}</div>

    <nav class="pn-nav" aria-label="Post navigation">
      ${newer
        ? `<a class="pn-card panel frame" href="#/read/${type}/${newer.slug}"><span class="pn-label">${icon('arrowLeft')} PREV ${pnLabel}</span><span class="pn-title">${esc(newer.title)}</span></a>`
        : `<div class="pn-empty panel">NO NEWER RECORDS IN THIS SECTOR</div>`}
      ${older
        ? `<a class="pn-card panel frame is-next" href="#/read/${type}/${older.slug}"><span class="pn-label">NEXT ${pnLabel} ${icon('arrowRight')}</span><span class="pn-title">${esc(older.title)}</span></a>`
        : `<div class="pn-empty panel">NO OLDER RECORDS IN THIS SECTOR</div>`}
    </nav>
  </section>`;

  scrambleText($('#rdCrumbs', view), $('#rdCrumbs', view).textContent, 700);
  document.title = `${it.title} // NEXUS`;
}

/* ── router ────────────────────────────────────────────────────── */
const VIEWS = { home: $('#view-home'), blog: $('#view-blog'), reports: $('#view-reports'), read: $('#view-read') };
function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const parts = h.split('/').filter(Boolean).map(s => { try { return decodeURIComponent(s); } catch (e) { return s; } });
  if (parts[0] === 'read' && parts[1] && parts[2]) return { view: 'read', type: parts[1], slug: parts[2] };
  if (parts[0] === 'blog') return { view: 'blog' };
  if (parts[0] === 'reports') return { view: 'reports' };
  return { view: 'home' };
}
function setNavActive(route) {
  $$('.nav-links a, .mm-link').forEach(a => a.classList.toggle('is-active', a.dataset.route === route));
}
function onRoute() {
  const r = parseHash();
  document.body.classList.remove('menu-open');
  const navT = $('#navToggle'); if (navT) { navT.setAttribute('aria-expanded', 'false'); $('.mobile-menu').setAttribute('aria-hidden', 'true'); }
  $$('.view').forEach(v => v.classList.remove('active'));
  const view = VIEWS[r.view];
  if (r.view === 'read') {
    renderRead(view, r.type === 'reports' ? 'reports' : 'blog', r.slug);
    setNavActive(r.type === 'reports' ? 'reports' : 'blog');
  } else {
    if (!view._rendered) {
      if (r.view === 'home') renderHome(view);
      if (r.view === 'blog') renderBlog(view);
      if (r.view === 'reports') renderReports(view);
      view._rendered = true;
    }
    if (r.view === 'home') { document.title = `NEXUS // ${SITE.name} — Personal Terminal`; }
    if (r.view === 'blog') document.title = 'Blog Archive // NEXUS';
    if (r.view === 'reports') document.title = 'Mission Reports // NEXUS';
    setNavActive(r.view);
  }
  view.classList.add('active');
  initReveals(view); initTilt(view);
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  html.style.scrollBehavior = prev;
  // reading progress bar only in reader
  $('#progressBar').classList.toggle('is-on', r.view === 'read');
}

/* ── reading progress + nav chrome ─────────────────────────────── */
function initChrome() {
  const bar = $('#progressBar');
  window.addEventListener('scroll', () => {
    const nav = $('#nav');
    nav.classList.toggle('is-scrolled', scrollY > 8);
    if (bar.classList.contains('is-on')) {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    }
  }, { passive: true });

  // clock
  const clock = $('#navClock');
  const tick = () => {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    if (clock) clock.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  };
  tick(); setInterval(tick, 1000);

  // mobile menu
  const t = $('#navToggle'), mm = $('#mobileMenu');
  t.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    t.setAttribute('aria-expanded', String(open));
    mm.setAttribute('aria-hidden', String(!open));
  });
  $$('.mm-link').forEach(a => a.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    t.setAttribute('aria-expanded', 'false'); mm.setAttribute('aria-hidden', 'true');
  }));
  $('#mmSocials').innerHTML = socialsHTML();

  // footer identity bits
  $('#year').textContent = new Date().getFullYear();
  const ft = $('#fTopLink'); ft.textContent = 'Return to base';
  ft.addEventListener('click', e => {
    e.preventDefault();
    if (location.hash !== '#/' && location.hash !== '') location.hash = '#/';
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── boot ──────────────────────────────────────────────────────── */
function fillIdentity() {
  // nav brand: alex.carter
  const brand = $('.brand-name');
  if (brand) {
    $('[data-name]', brand).textContent = SITE.firstName;
    $('[data-handle]', brand).textContent = SITE.lastName;
  }
  // footer brand: first name upper
  const fb = $('.f-brand [data-name]');
  if (fb) fb.textContent = SITE.firstName.toUpperCase();
  // footer legal line: full name upper
  const legal = $('.fb-inner [data-name]');
  if (legal) legal.textContent = SITE.name.toUpperCase();
  // station tag
  $$('[data-location]').forEach(el => { el.textContent = SITE.location; });
  $('#footerSocials').innerHTML = socialsHTML();
}

document.addEventListener('DOMContentLoaded', () => {
  fillIdentity();
  initChrome();
  if (FX_CONFIG.starfield) { REDUCED ? Starfield.startStatic() : Starfield.start(); }
  initCursorGlow();
  window.addEventListener('hashchange', onRoute);
  onRoute();
  runBoot();
});
