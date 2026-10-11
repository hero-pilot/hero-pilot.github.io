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

  {
    slug: "the-grid-that-launched-a-thousand-layouts",
    title: "The Grid That Launched a Thousand Layouts",
    date: "2026-06-28",
    minutes: 6,
    tags: ["css", "web"],
    excerpt: "CSS Grid is not a better float. It's a coordinate system for the page — and once you internalize that, layout stops being guesswork.",
    html: `
      <p>For years I laid out pages the way you tile a bathroom: float this, clear that, pray. Flexbox helped, but it was still a negotiation. Then I spent one weekend actually reading the CSS Grid spec instead of copy-pasting recipes, and layout stopped being a fight. <strong>Grid is not a better float — it's a coordinate system for the page.</strong></p>
      <h2>Thinking in tracks</h2>
      <p>The mental shift is this: you stop describing <em>how</em> elements push each other around, and start describing <em>where</em> they live. Rows and columns are named; elements are assigned addresses. A layout that used to be forty lines of hacks becomes a few declarations that read like a floor plan.</p>
      <div class="code-window">
        <div class="cw-head"><span class="cw-dot r"></span><span class="cw-dot y"></span><span class="cw-dot g"></span><span class="cw-title">layout.css</span></div>
        <pre class="cw-body"><code><span class="tk-c">/* the whole station layout, one rule */</span>
<span class="tk-k">.station</span> {
  <span class="tk-f">display</span>: <span class="tk-n">grid</span>;
  <span class="tk-f">grid-template</span>:
    <span class="tk-s">"hero hero"    auto</span>
    <span class="tk-s">"feed  aside"</span>  <span class="tk-n">1fr</span>
    <span class="tk-s">"foot  foot"</span>  auto / <span class="tk-n">2fr</span> <span class="tk-n">1fr</span>;
  <span class="tk-f">gap</span>: <span class="tk-n">28px</span>;
  <span class="tk-f">min-height</span>: <span class="tk-n">100vh</span>;
}</code></pre>
      </div>
      <p>That one rule is an entire responsive scaffold. The named areas read like a sentence. When the design changes, you change the sentence — not the structure.</p>
      <h2>Where it shines</h2>
      <ul>
        <li><b>Asymmetry on purpose</b> — a featured card spanning two columns, the rest filling a regular rhythm. Card archives stop looking like spreadsheets.</li>
        <li><b>Source order independence</b> — the important element can be first in the markup for screen readers, yet sit visually wherever the design wants it.</li>
        <li><b>Self-documenting</b> — six months later, the template lines still explain themselves.</li>
      </ul>
      <blockquote>A layout system you can read is a layout system you can change.</blockquote>
      <p>My rule now: <code>flex</code> for the inside of a component (a toolbar, a chip row), <code>grid</code> for the relationships between components. Knowing which tool owns which problem is most of the craft. The rest is deleting code.</p>`,
  },

  {
    slug: "escape-velocity-vim",
    title: "Escape Velocity: Why I Fly With Vim",
    date: "2026-07-12",
    minutes: 5,
    tags: ["tools", "vim"],
    excerpt: "Six months after reluctantly learning Vim, I can't edit text any other way. A field report on modal editing, muscle memory, and the sunk-cost fallacy in reverse.",
    html: `
      <p>I learned Vim the way most people do: a remote server, a broken config, and no other editor installed. It was survival, not choice. Six months later I caught myself trying to <code>dd</code> a line in a Google Doc — and realized the motor reflexes had fully migrated in. <strong>Modal editing rewires how you think about text.</strong></p>
      <h2>The grammar is the point</h2>
      <p>People mock the learning curve, but the curve is the feature. Vim is a language: verbs (<code>d</code> delete, <code>y</code> yank, <code>c</code> change) combine with nouns (<code>w</code> word, <code>}</code> paragraph, <code>ip</code> inner paragraph). Once you know twenty words, you can say thousands of sentences — and your fingers say them faster than your eyes can follow.</p>
      <ul>
        <li><code>ci"</code> — change everything inside these quotes. One motion, any programming language.</li>
        <li><code>:%s/legacy/frontier/g</code> — rename across the file without touching the mouse.</li>
        <li><code>jj</code> mapped to escape — home row, no stretching for the actual Esc key.</li>
      </ul>
      <div class="code-window">
        <div class="cw-head"><span class="cw-dot r"></span><span class="cw-dot y"></span><span class="cw-dot g"></span><span class="cw-title">.vimrc — the 20% that matters</span></div>
        <pre class="cw-body"><code><span class="tk-k">set</span> number relativenumber
<span class="tk-k">set</span> mouse=a
<span class="tk-k">let</span> mapleader = <span class="tk-s">" "</span>
<span class="tk-c">" jj is my escape hatch</span>
<span class="tk-k">inoremap</span> jj <span class="tk-o">&lt;Esc&gt;</span>
<span class="tk-c">" navigate splits without reaching for ctrl-w</span>
<span class="tk-k">nnoremap</span> <span class="tk-o">&lt;leader&gt;</span>h <span class="tk-o">&lt;C-w&gt;</span>h</code></pre>
      </div>
      <h2>The honest downsides</h2>
      <p>This isn't a recruitment pitch. Vim's defaults are hostile, plugins are a part-time hobby, and for code review in a browser you'll still feel the phantom keys. But the core investment compounds: the same grammar works over SSH, in Git commit messages, in the terminal — anywhere text exists. That portability is why I stopped calling it an editor and started calling it a <strong>text operating system</strong>.</p>
      <blockquote>The best editor is the one whose commands you can execute in a server room at 3 a.m. with no mouse.</blockquote>`,
  },

  {
    slug: "shipping-containers-docker-for-humans",
    title: "Shipping Containers: Docker for Humans",
    date: "2026-07-26",
    minutes: 7,
    tags: ["devops", "docker"],
    excerpt: "An image is a sealed shipment, a container is the shipment in motion. Once I stopped memorizing commands and learned the object model, Docker got easy.",
    html: `
      <p>Docker confused me for a year because I treated it as a bag of commands. The unlock was learning its <strong>object model</strong> — there are only four objects that matter, and everything else is plumbing around them.</p>
      <h2>The mental model</h2>
      <ul>
        <li><b>Dockerfile</b> — the recipe. A build script, cached layer by layer.</li>
        <li><b>Image</b> — the sealed shipment produced by the recipe. Immutable, versioned, hash-addressed.</li>
        <li><b>Container</b> — the shipment in motion: an image with a process attached to it.</li>
        <li><b>Volume / network</b> — the dock cranes: they move data between the ship and the harbor.</li>
      </ul>
      <p>Once you see it as <em>recipe → shipment → running shipment</em>, the commands become obvious. <code>build</code> turns a recipe into a shipment; <code>run</code> puts a shipment in motion; <code>exec</code> climbs aboard a moving one.</p>
      <div class="code-window">
        <div class="cw-head"><span class="cw-dot r"></span><span class="cw-dot y"></span><span class="cw-dot g"></span><span class="cw-title">Dockerfile — this very blog's dev box</span></div>
        <pre class="cw-body"><code><span class="tk-k">FROM</span> node:22-alpine
<span class="tk-k">WORKDIR</span> /station
<span class="tk-k">COPY</span> package*.json ./
<span class="tk-k">RUN</span> npm ci
<span class="tk-k">COPY</span> . .
<span class="tk-k">EXPOSE</span> 3000
<span class="tk-k">CMD</span> [<span class="tk-s">"npm"</span>, <span class="tk-s">"start"</span>]</code></pre>
      </div>
      <h2>Layer caching is a design problem</h2>
      <p>The mistake I made early: copying all source code before installing dependencies. Every edit invalidated the dependency layer, so Docker re-downloaded the universe on each build. Order the Dockerfile from <em>stable to volatile</em> — package manifests first, source last — and builds drop from minutes to seconds.</p>
      <blockquote>A Dockerfile is not documentation. It is a cache strategy wearing a documentation costume.</blockquote>
      <p>My current rule of thumb: if a step can fail, it belongs early in the build; if it changes often, it belongs at the end. Docker stops being frustrating the day you start reading the layer list as a history of your own assumptions.</p>`,
  },

  {
    slug: "first-contact-30-days-of-rust",
    title: "First Contact: 30 Days of Rust",
    date: "2026-08-09",
    minutes: 6,
    tags: ["rust", "languages"],
    excerpt: "The borrow checker isn't your enemy — it's a very pedantic code reviewer who works for free. Notes from a month of arguing with the compiler.",
    html: `
      <p>Month one of Rust is a specific emotional experience: you write a program that looks correct, and the compiler responds with a four-paragraph essay about lifetimes. Then — around week three — something clicks. <strong>The borrow checker isn't blocking your program; it's reviewing it.</strong> It's a pedantic reviewer who works for free, never sleeps, and is always right about the rules you agreed to.</p>
      <h2>What actually clicked</h2>
      <p>Ownership stopped being abstract the day I framed it as a single question for every value: <em>who is responsible for destroying this, and when?</em> Once that question is answered, the moves, borrows and lifetimes fall out of it. The compiler isn't guessing — it's proving that exactly one owner exists at every point in time.</p>
      <div class="code-window">
        <div class="cw-head"><span class="cw-dot r"></span><span class="cw-dot y"></span><span class="cw-dot g"></span><span class="cw-title">main.rs — first contact</span></div>
        <pre class="cw-body"><code><span class="tk-k">fn</span> <span class="tk-f">main</span>() {
    <span class="tk-k">let</span> log = <span class="tk-s">"transmission received"</span>;
    <span class="tk-k">let</span> count = log.<span class="tk-f">len</span>();
    <span class="tk-f">println!</span>(<span class="tk-s">"{} // {} bytes"</span>, log, count);
}</code></pre>
      </div>
      <p>Trivial, yes. But the feeling of the language was already there: attributes read like annotations, macros end in <code>!</code>, and errors arrive as teaching moments with suggestions attached.</p>
      <h2>The honest scorecard</h2>
      <ul>
        <li><b>Won me over:</b> exhaustive <code>match</code> — the compiler checks you handled every case, including ones you forgot existed.</li>
        <li><b>Won me over:</b> cargo — building, testing, benchmarking and docs from one tool. The batteries are included and standardized.</li>
        <li><b>Still hurts:</b> lifetimes in generics. <code>Vec&lt;T&gt;</code> is friendly; <code>fn f&lt;'a&gt;(x: &amp;'a str)</code> still makes me pause.</li>
        <li><b>Verdict:</b> I'm not rewriting my blog in Rust. But for anything that must not fail silently, I now reach for it first.</li>
      </ul>
      <blockquote>Rust doesn't prevent bugs. It prevents the class of bugs you would have found in production.</blockquote>`,
  },

  {
    slug: "attention-is-all-you-need-a-field-guide",
    title: "Attention Is All You Need (A Field Guide)",
    date: "2026-08-23",
    minutes: 8,
    tags: ["ai", "ml"],
    excerpt: "Transformers explained with no math dust: every token walks into a room and asks every other token what it meant. That's most of it.",
    html: `
      <p>Most transformer explainers drown you in matrix calculus on paragraph one. Here's the version I wish I'd read: <strong>a transformer is a room where every word gets to interview every other word</strong>, and then updates itself based on the answers.</p>
      <h2>The interview process</h2>
      <p>Take the sentence <em>the pilot flew the ship into the dock</em>. The word <em>dock</em> needs to know it belongs to a ship, not a meeting. So each token emits three signals: a <b>query</b> ("what am I looking for?"), a <b>key</b> ("what do I offer?") and a <b>value</b> ("here's my content"). Every token's query is compared with every token's key; the matches become weights; the weighted sum of values is what the token takes away.</p>
      <ul>
        <li><b>Q</b> — the question a token asks.</li>
        <li><b>K</b> — the label a token wears.</li>
        <li><b>V</b> — the payload a token hands over if its label matches.</li>
      </ul>
      <p>Do this in parallel across many "rooms" (heads), let each room specialize — one tracks syntax, another tracks long-range references — and you have multi-head attention. Stack those rooms into layers, each refining the last, and the model builds up meaning like sediment: letters → words → clauses → intent.</p>
      <div class="code-window">
        <div class="cw-head"><span class="cw-dot r"></span><span class="cw-dot y"></span><span class="cw-dot g"></span><span class="cw-title">attention.py — the 12-line core</span></div>
        <pre class="cw-body"><code><span class="tk-k">def</span> <span class="tk-f">attention</span>(q, k, v):
    scores = q @ k.T           <span class="tk-c"># every token interviews every other</span>
    weights = softmax(scores)  <span class="tk-c"># turn scores into a spotlight</span>
    <span class="tk-k">return</span> weights @ v        <span class="tk-c"># blend the payloads</span></code></pre>
      </div>
      <h2>Why this ate the world</h2>
      <p>Three properties, none of them about intelligence. First: <em>parallelism</em> — every token is processed simultaneously, so GPUs stay saturated. Second: <em>context is unlimited-ish</em> — token three thousand can attend to token one. Third: <em>scale behaves</em> — add parameters and data, and capability rises predictably. Engineers built a machine that turns compute into competence, and then industry noticed.</p>
      <blockquote>The transformer didn't solve understanding. It solved the logistics of understanding.</blockquote>
      <p>Field guide summary: when a model writes you a poem, picture a very fast, very well-read committee holding thousands of simultaneous interviews per word — and voting on the next syllable.</p>`,
  },

  {
    slug: "post-mortem-my-failed-side-project",
    title: "Post-Mortem: What My Failed Side Project Taught Me",
    date: "2026-09-13",
    minutes: 5,
    tags: ["career", "lessons"],
    excerpt: "It died in month four, and the autopsy was more valuable than the product. Six lessons from a project that never shipped.",
    html: `
      <p>Last spring I started building a reading-tracker app with grand ambitions: spaced repetition, social graphs, a slick terminal aesthetic. In month four I quietly archived the repo. This entry is the autopsy — because <strong>the lessons are worth more than the product ever was</strong>.</p>
      <h2>Where it went wrong</h2>
      <ul>
        <li><b>Scope cancer.</b> Version 0.1 needed one screen. I designed the sync protocol for a version 5.0 that would never exist.</li>
        <li><b>Building for an audience of one</b> — me. I never showed it to a single potential user before writing the database layer.</li>
        <li><b>New-tech tourism.</b> I picked the stack to learn the stack, not to ship the product. The means became the end.</li>
        <li><b>No finish line.</b> "Done" was never defined, so the project couldn't be finished — only abandoned.</li>
      </ul>
      <h2>What I'd repeat</h2>
      <p>Not everything burned. The UI prototype took one weekend and still looks good — because constraints were real and visible. Writing the design doc first forced me to say no early, and that doc later became the seed of this blog's design system. Failure left usable wreckage.</p>
      <blockquote>Side projects don't fail when they stop being fun. They fail when they never define "done".</blockquote>
      <p>The revised doctrine, now pinned above my desk: <strong>cut scope, not corners</strong>; show it to someone ugly and early; define v0.1 as one screen that a stranger can use without you in the room. My next project shipped in three weeks because it had to — the deadline was a demo with a friend, not a feeling.</p>`,
  },

  {
    slug: "webassembly-and-the-next-frontier",
    title: "WebAssembly and the Next Frontier",
    date: "2026-10-04",
    minutes: 6,
    tags: ["web", "future"],
    excerpt: "WASM isn't here to replace JavaScript; it's here to replace the things JavaScript was never meant to do. The boundary is finally clean.",
    html: `
      <p>Every few years the web gets a new engine room, and the discourse predicts JavaScript's death. WebAssembly won't kill JavaScript — it will <strong>liberate it from jobs it was doing badly</strong>. The boundary is finally clean: JS owns the orchestration, WASM owns the heavy computation underneath.</p>
      <h2>What actually changes</h2>
      <p>WASM is a portable binary instruction format that browsers execute at near-native speed in a sandbox. Practically: image and video codecs, physics engines, CAD kernels, database engines and whole language runtimes now ship to the browser without a plugin and without a rewrite into JavaScript. The browser stops being a document viewer that does tricks, and becomes an application platform that happens to render documents.</p>
      <ul>
        <li><b>Language parity</b> — Rust, C, Go, Python all compile to the same target. Your algorithm's home language stops mattering at the boundary.</li>
        <li><b>Predictable speed</b> — no GC pauses in the hot path, because the hot path doesn't use the JS heap.</li>
        <li><b>Sandbox by design</b> — WASM can't touch the DOM or filesystem without explicit permission slips from the JS host.</li>
      </ul>
      <div class="code-window">
        <div class="cw-head"><span class="cw-dot r"></span><span class="cw-dot y"></span><span class="cw-dot g"></span><span class="cw-title">bridge.js — the handshake</span></div>
        <pre class="cw-body"><code><span class="tk-k">const</span> { analyze } = <span class="tk-k">await</span> WebAssembly.<span class="tk-f">instantiateStreaming</span>(
  <span class="tk-f">fetch</span>(<span class="tk-s">"/engine.wasm"</span>)
).<span class="tk-f">then</span>(m =&gt; m.instance.exports);

<span class="tk-k">const</span> report = <span class="tk-f">analyze</span>(buffer, { depth: <span class="tk-n">4</span> });</code></pre>
      </div>
      <h2>What stays the same</h2>
      <p>The host is still JavaScript, still the diplomacy layer: events, routing, UI state, all the things it's genuinely great at. That's the healthy split. WASM isn't a coup; it's a hire — a specialist brought in for the work nobody else in the building can do at speed.</p>
      <blockquote>The next frontier isn't a new language. It's the old web, finally allowed to run anything.</blockquote>`,
  },
];
