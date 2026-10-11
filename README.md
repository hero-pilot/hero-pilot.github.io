# NEXUS — a sci-fi personal blog for GitHub Pages

A dark, terminal-flavored, starfield-powered blog with three sections:

- **HOME** — hero intro, social uplinks, stats, and an *infinite-scroll* transmission feed
- **BLOG** — card archive with generated cover art; click through to full entries
- **REPORTS** — a weekly "mission ledger" of learning progress (hours, wins, struggles, goals)

No build step. No dependencies. One static page + data files. Made to be dropped into a GitHub repository and served by GitHub Pages.

---

## 1. Put it on GitHub (2 minutes)

1. Create a new repository on GitHub.
   - Name it `yourusername.github.io` if you want the blog at `https://yourusername.github.io`, or anything else (e.g. `blog`) if you're fine with `https://yourusername.github.io/blog/`.
2. Upload **everything inside this folder** to the repository (keep the structure):
   - Web UI: repo page → *Add file* → *Upload files* → drag `index.html`, `assets/`, `favicon.svg`, `.nojekyll`, `README.md` → commit.
   - Or with git:
     ```bash
     git init && git add . && git commit -m " nexus online"
     git branch -M main
     git remote add origin https://github.com/<you>/<repo>.git
     git push -u origin main
     ```
3. Enable Pages: repo → **Settings → Pages** → *Build and deployment* → Source: **Deploy from a branch** → Branch: `main` / `/ (root)` → Save.
4. Wait ~1 minute. Your station is live at the URL shown on that page.

> The site uses relative paths everywhere, so it works from a repo root **or** a sub-path (`/blog/`) with zero configuration.

## 2. Make it yours (5 minutes)

Open `assets/js/data-site.js` — everything identity-related lives there:

| What you change | Where |
|---|---|
| Your name (nav, hero, footer) | `name`, `firstName`, `lastName` |
| Avatar hexagon letters | `initials` |
| Hero line under your name | `role` |
| Rotating typewriter lines | `taglines` |
| About paragraphs | `bio` |
| Skill chips | `skills` |
| Social links | `socials` (edit the `url`s; delete lines you don't use) |
| Location tag | `location` |

Social icons available out of the box: `github`, `x`, `linkedin`, `mail`, `rss` (see the `ICONS` map in `assets/js/app.js` to add more).

## 3. Write a blog post

Open `assets/js/data-posts.js`, copy any existing block and edit it:

```js
{
  slug: "my-new-post",          // shows in the URL: #/read/blog/my-new-post
  title: "My New Post",
  date: "2026-10-18",
  minutes: 4,                   // read time
  tags: ["meta", "writing"],
  excerpt: "One or two sentences shown in cards and the feed.",
  html: `
    <p>First paragraph…</p>
    <h2>A section</h2>
    <p>More text…</p>
    <ul><li>point one</li><li>point two</li></ul>
    <blockquote>A pull quote.</blockquote>
  `,
},
```

Safe tags inside `html`: `h2`, `p`, `ul`, `ol`, `li`, `strong`/`b`, `em`, `code`, `blockquote`, `hr`, and the code window:

```html
<div class="code-window">
  <div class="cw-head"><span class="cw-dot r"></span><span class="cw-dot y"></span><span class="cw-dot g"></span><span class="cw-title">file.py</span></div>
  <pre class="cw-body"><code><span class="tk-c"># comment</span> …</code></pre>
</div>
```

Syntax colors: `tk-c` comment, `tk-k` keyword, `tk-s` string, `tk-f` function, `tk-n` number, `tk-o` operator.

## 4. Add a weekly report

Open `assets/js/data-reports.js`, copy a block, bump the week number and date:

```js
{
  slug: "week-09", week: 9, date: "2026-10-05",
  title: "Capstone Build Week 1",
  focus: "Capstone · build sprint",
  hours: 23, topics: 6, tasks: "9/12",
  progress: 100, status: "COMPLETE",   // or "IN PROGRESS"
  wins: ["…", "…", "…"],
  struggles: ["…"],
  goals: ["…", "…"],
  resources: ["…"],
  excerpt: "One line for the ledger.",
  html: `<p>The full report body…</p>`,
},
```

- `progress` is your *cumulative learning-path %* — it drives the animated bars in the ledger.
- New entries appear automatically in the reports page **and** the home feed (newest first).

## 5. Tune the look

- **Colors** — edit the `:root` tokens at the top of `assets/css/base.css` (`--cyan`, `--magenta`, `--violet`, background…).
- **Effects** — top of `assets/js/effects.js`, `FX_CONFIG`: flip `starfield`, `boot`, `typewriter`, `tilt`, `cursorGlow` to `false`.
- **Cover art** — every card's art is generated from its `slug` (hue + pattern + glyph), so different slugs always look different. No images to manage.
- **Fonts** — Google Fonts link in `index.html` (Orbitron / Rajdhani / JetBrains Mono). The site still works offline; it falls back to system fonts.

## 6. File map

```
index.html            the whole app (one page, hash router)
favicon.svg           terminal hexagon icon
.nojekyll             tells GitHub Pages to serve files as-is (keep it!)
assets/
  css/base.css        tokens, atmosphere, nav/footer, buttons
  css/views.css       hero, feed, blog grid, reports ledger, reader, boot
  js/data-site.js     ← your identity (edit me)
  js/data-posts.js    ← your blog posts (edit me)
  js/data-reports.js  ← your weekly reports (edit me)
  js/effects.js       starfield, boot, typewriter, tilt…
  js/app.js           router + renderers (rarely needs touching)
```

## FAQ

- **Blank page?** Make sure `index.html` sits at the repo root and `assets/` was uploaded with it — the structure must match the file map above.
- **Why `.nojekyll`?** GitHub Pages runs Jekyll by default; this file disables it so your files are served exactly as committed.
- **Testing locally?** Just open `index.html` in a browser. Fonts load from the internet; everything else is local.
- **It works at `/` but not at `/repo-name/`?** It should work at both — all links and asset paths are relative. Hard-refresh once (Ctrl+F5) to bust the cache.
