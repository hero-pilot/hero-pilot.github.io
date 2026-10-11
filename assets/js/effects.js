/* ════════════════════════════════════════════════════════════════
   NEXUS // effects.js — atmosphere engine
   starfield · boot sequence · scramble · typewriter · reveal · tilt
   ════════════════════════════════════════════════════════════════ */

/* tweak the show here — set any to false to disable */
const FX_CONFIG = {
  starfield: true,
  boot: true,
  typewriter: true,
  tilt: true,
  cursorGlow: true,
};

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;
if (REDUCED) document.documentElement.classList.add('no-anim');

/* ── starfield ─────────────────────────────────────────────────── */
const Starfield = (() => {
  let cv, ctx, w, h, dpr, stars = [], shooters = [], raf = null;
  let last = 0, nextShot = 0;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  function count() { return window.innerWidth < 720 ? 90 : 190; }

  function makeStars() {
    const n = count();
    stars = [];
    for (let i = 0; i < n; i++) {
      const depth = Math.random();               // 0 far … 1 near
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.25 + depth * 0.75,
        r: 0.35 + depth * 1.5,
        base: 0.25 + Math.random() * 0.55,
        tw: Math.random() * Math.PI * 2,          // twinkle phase
        ts: 0.4 + Math.random() * 1.6,            // twinkle speed
        hue: Math.random() < 0.08
          ? (Math.random() < 0.5 ? 300 : 185)     // few tinted stars
          : 210,
      });
    }
  }

  function spawnShooter() {
    const fromLeft = Math.random() < 0.5;
    shooters.push({
      x: fromLeft ? -80 : w * (0.3 + Math.random() * 0.7),
      y: Math.random() * h * 0.35,
      vx: (fromLeft ? 1 : -1) * (9 + Math.random() * 5),
      vy: 3 + Math.random() * 2.5,
      life: 0, max: 60 + Math.random() * 25,
    });
    nextShot = performance.now() + 6000 + Math.random() * 9000;
  }

  function frame(t) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(48, t - (last || t)); last = t;
    // ease pointer parallax
    mouse.x += (mouse.tx - mouse.x) * 0.045;
    mouse.y += (mouse.ty - mouse.y) * 0.045;

    ctx.clearRect(0, 0, w, h);
    const sec = t / 1000;

    for (const s of stars) {
      s.y += s.z * 0.022 * (dt / 16.7);           // slow drift
      if (s.y > h + 4) { s.y = -4; s.x = Math.random() * w; }
      const tw = s.base + Math.sin(sec * s.ts + s.tw) * 0.28;
      const px = s.x + mouse.x * s.z * 16;
      const py = s.y + mouse.y * s.z * 16;
      ctx.globalAlpha = Math.max(0.05, tw);
      ctx.fillStyle = `hsl(${s.hue} 90% 82%)`;
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, 6.283);
      ctx.fill();
      if (s.z > 0.85 && tw > 0.6) {               // halo on the near ones
        ctx.globalAlpha = (tw - 0.6) * 0.22;
        ctx.beginPath(); ctx.arc(px, py, s.r * 3.2, 0, 6.283); ctx.fill();
      }
    }

    if (t > nextShot) spawnShooter();
    for (let i = shooters.length - 1; i >= 0; i--) {
      const sh = shooters[i];
      sh.x += sh.vx * (dt / 16.7); sh.y += sh.vy * (dt / 16.7); sh.life++;
      const p = sh.life / sh.max;
      const a = p < 0.75 ? 1 - p : (1 - p) * 4;   // fade at the end
      const g = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 9, sh.y - sh.vy * 9);
      g.addColorStop(0, `rgba(235,255,255,${0.9 * a})`);
      g.addColorStop(1, 'rgba(0,240,255,0)');
      ctx.globalAlpha = 1;
      ctx.strokeStyle = g; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(sh.x, sh.y);
      ctx.lineTo(sh.x - sh.vx * 9, sh.y - sh.vy * 9); ctx.stroke();
      if (sh.life >= sh.max || sh.x < -120 || sh.x > w + 120) shooters.splice(i, 1);
    }
    ctx.globalAlpha = 1;
  }

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = window.innerWidth; h = window.innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeStars();
  }

  function start() {
    cv = document.getElementById('starfield');
    if (!cv) return;
    ctx = cv.getContext('2d');
    resize();
    window.addEventListener('resize', resize, { passive: true });
    if (FINE_POINTER) {
      window.addEventListener('pointermove', e => {
        mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
      }, { passive: true });
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
      else if (!raf) { last = 0; raf = requestAnimationFrame(frame); }
    });
    raf = requestAnimationFrame(frame);
  }

  function startStatic() {  // reduced-motion mode: draw once, no loop
    cv = document.getElementById('starfield');
    if (!cv) return;
    ctx = cv.getContext('2d');
    resize();
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      ctx.globalAlpha = s.base;
      ctx.fillStyle = `hsl(${s.hue} 90% 82%)`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
    }
  }

  return { start, startStatic };
})();

/* ── boot sequence ─────────────────────────────────────────────── */
function runBoot(onDone) {
  const boot = document.getElementById('boot');
  if (!boot) { onDone && onDone(); return; }
  const skipKey = 'nexus-booted';
  const skip = () => {
    boot.classList.add('is-done');
    try { sessionStorage.setItem(skipKey, '1'); } catch (e) {}
    setTimeout(() => { boot.style.display = 'none'; }, 550);
    onDone && onDone();
  };

  if (REDUCED || !FX_CONFIG.boot) { boot.style.display = 'none'; onDone && onDone(); return; }
  let seen = false;
  try { seen = sessionStorage.getItem(skipKey) === '1'; } catch (e) {}
  if (seen) { boot.style.display = 'none'; onDone && onDone(); return; }

  const lines = [
    'initializing <span class="bl-path">nexus</span> interface <b>OK</b>',
    'loading stellar charts <b>OK</b>',
    'calibrating photon arrays <b>OK</b>',
    'decrypting archives <b>OK</b>',
    'establishing uplink <b>OK</b>',
  ];
  const wrap = document.getElementById('bootLines');
  const fill = document.getElementById('bootFill');
  wrap.innerHTML = '';
  lines.forEach((txt, i) => {
    const d = document.createElement('div');
    d.innerHTML = '> ' + txt;
    wrap.appendChild(d);
    setTimeout(() => d.classList.add('is-in'), 140 + i * 170);
  });
  // progress bar races to 100 in ~1.1s
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + 4 + Math.random() * 7);
    if (fill) fill.style.width = p + '%';
    if (p >= 100) clearInterval(tick);
  }, 70);
  boot.addEventListener('click', skip, { once: true });
  setTimeout(skip, 1750);
}

/* ── scramble / decode text ────────────────────────────────────── */
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#____________';
function scrambleText(el, text, dur = 650) {
  if (!el) return;
  if (REDUCED) { el.textContent = text; return; }
  const from = el.textContent || '';
  const len = Math.max(from.length, text.length);
  const t0 = performance.now();
  function tick(t) {
    const k = Math.min(1, (t - t0) / dur);
    let out = '';
    for (let i = 0; i < len; i++) {
      if (i < text.length) {
        if (k >= (i + 1) / text.length) out += text[i];
        else if (Math.random() < 0.28) out += SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
        else out += i < from.length ? from[i] : ' ';
      } else out += '';
    }
    el.textContent = out;
    if (k < 1) requestAnimationFrame(tick);
    else el.textContent = text;
  }
  requestAnimationFrame(tick);
}

/* ── typewriter (hero taglines) ────────────────────────────────── */
function typewriter(el, phrases) {
  if (!el || !phrases || !phrases.length) return;
  const textNode = el.querySelector('.tt-text') || el;
  if (REDUCED || !FX_CONFIG.typewriter) {
    textNode.textContent = phrases[0];
    return;
  }
  let pi = 0, ci = 0, deleting = false;
  function step() {
    const cur = phrases[pi];
    ci += deleting ? -1 : 1;
    textNode.textContent = cur.slice(0, Math.max(0, ci));
    let delay = deleting ? 26 : 52;
    if (!deleting && ci >= cur.length) { deleting = true; delay = 2300; }
    else if (deleting && ci <= 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 420; }
    setTimeout(step, delay);
  }
  step();
}

/* ── reveal on scroll ──────────────────────────────────────────── */
let _revealIO = null;
function initReveals(scope) {
  const root = scope || document;
  const items = root.querySelectorAll('.reveal:not(.is-visible)');
  if (REDUCED) { items.forEach(el => el.classList.add('is-visible')); return; }
  if (!_revealIO) {
    _revealIO = new IntersectionObserver(entries => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          _revealIO.unobserve(en.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
  }
  items.forEach(el => _revealIO.observe(el));
}

/* ── 3d tilt + glare (cards) ───────────────────────────────────── */
function initTilt(scope) {
  if (REDUCED || !FINE_POINTER || !FX_CONFIG.tilt) return;
  const root = scope || document;
  root.querySelectorAll('.tilt').forEach(card => {
    if (card._tilted) return; card._tilted = true;
    const max = 5;
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', ((nx - 0.5) * max).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((0.5 - ny) * max).toFixed(2) + 'deg');
      card.style.setProperty('--mx', (nx * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (ny * 100).toFixed(1) + '%');
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

/* ── cursor glow ───────────────────────────────────────────────── */
function initCursorGlow() {
  const el = document.getElementById('cursorGlow');
  if (!el || REDUCED || !FINE_POINTER || !FX_CONFIG.cursorGlow) return;
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  window.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; el.style.opacity = '1'; }, { passive: true });
  (function loop() {
    x += (tx - x) * 0.09; y += (ty - y) * 0.09;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(loop);
  })();
}

/* ── periodic glitch bursts ────────────────────────────────────── */
function glitchLoop(el) {
  if (!el || REDUCED) return;
  const fire = () => {
    el.classList.add('is-glitching');
    setTimeout(() => el.classList.remove('is-glitching'), 900);
    setTimeout(fire, 2800 + Math.random() * 4200);
  };
  setTimeout(fire, 1800 + Math.random() * 3000);
}
