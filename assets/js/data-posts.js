/* ════════════════════════════════════════════════════════════════
   NEXUS // data-posts.js — your blog entries.
   To add a post: copy a block below, change the fields, done.
     slug     : short unique id, shows in the URL (#/read/blog/slug)
     date     : "YYYY-MM-DD"
     minutes  : estimated read time
     html     : the article body (safe HTML: h2, p, ul, ol, blockquote,
                .code-window, strong, code ...)
   ════════════════════════════════════════════════════════════════ */

const POSTS = [

  {
    slug: "hello-world",
    title: "Signal Acquired: Hello, World",
    date: "2026-06-14",
    minutes: 3,
    tags: ["meta", "writing"],
    excerpt: "Why this station exists, what the two archives are for, and a quick tour of the machinery under the hull.",
    html: `
      <p>Somewhere between my fourth abandoned notebook and a hard drive full of half-finished branches, I accepted a truth: <strong>knowledge that isn't written down evaporates</strong>. So this station is going up — a public, versioned, searchable record of everything I learn and build.</p>
      <h2>The two archives</h2>
      <p>This site runs on two channels. The <b>blog</b> is for long-form entries: essays, deep dives, post-mortems — the stuff I want to still be reading in three years. The <b>reports</b> archive is different: a weekly dossier where I log study hours, wins, struggles and next-week goals. One is the map; the other is the travel log.</p>
      <ul>
        <li><b>Blog</b> — polished entries, whenever a topic earns it.</li>
        <li><b>Reports</b> — every week, no excuses, even if the entry is boring. Consistency beats brilliance.</li>
      </ul>
      <h2>Under the hull</h2>
      <p>No frameworks were harmed in the making of this station. It is a single static page with a hand-rolled hash router, a canvas starfield, and plain data files holding the content. That's the whole trick. When I want a new entry, I edit a JavaScript file, push, and GitHub Pages does the rest.</p>
      <blockquote>If it isn't in the repo, it doesn't exist.</blockquote>
      <p>That's the philosophy. Everything I make ends up in version control eventually — this blog just makes it public and prettier.</p>`,
  },
];
