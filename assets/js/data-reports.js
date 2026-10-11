/* ════════════════════════════════════════════════════════════════
   NEXUS // data-reports.js — your weekly progress dossiers.
   To add a week: copy a block, bump the week number and date.
     week    : integer, week number
     progress: cumulative course completion % (drives the ledger bars)
     status  : "COMPLETE" or "IN PROGRESS"
     wins / struggles / goals : short strings, 2-4 each
   ════════════════════════════════════════════════════════════════ */

const REPORTS = [

  {
    slug: "week-01", week: 1, date: "2026-07-06",
    title: "Boot Sequence Complete",
    focus: "Onboarding · dev environment · Git · this blog",
    hours: 22.5, topics: 5, tasks: "12/12", progress: 12, status: "COMPLETE",
    wins: [
      "Full dev environment running: editor, terminal, SSH keys, dotfiles in a repo",
      "Learned Git well enough to stop treating branches as dangerous",
      "Deployed this very station to GitHub Pages",
    ],
    struggles: [
      "CSS layout felt like guesswork — resolved next week with grid drills",
      "Broke the blog twice by editing the wrong template variable",
    ],
    goals: [
      "Complete Python syntax fundamentals",
      "Write 20 small scripts without looking things up",
      "Keep the blog build under an hour per tweak",
    ],
    resources: ["MDN Web Docs", "Pro Git (book)", "The Odin Project community"],
    excerpt: "Environment installed, Git tamed, blog deployed. The station is live and the mission clock is running.",
    html: `
      <p>Week one was pure infrastructure: get the machine, the tools and the publishing pipeline into a state I never have to think about again. That last part matters more than people admit — <strong>friction you remove today is momentum you keep for months</strong>.</p>
      <h2>What I learned</h2>
      <p>The biggest surprise was Git. I'd used it before the way you use a light switch — blindly. This week I actually learned what a branch is (a movable label, not a copy), why rebase exists, and how <code>reflog</code> means almost nothing is ever truly lost. I rewired my fear of "breaking the repo" into a routine.</p>
      <p>I also learned just enough HTML and CSS to ship this blog: one page, a hash router, and a starfield I'm unreasonably proud of. Deploying it took fifteen minutes once the repo was clean.</p>
      <h2>Reflections</h2>
      <p>The temptation in week one is to over-plan — to design a perfect system for a future self who doesn't exist yet. I caught myself drafting a four-week curriculum and deleted it. This week's only real goal was: <em>make next week easier to start</em>. Environment, version control, publishing. Done.</p>
      <p>Numbers: 22.5 hours, 12 of 12 tasks, 5 topics touched. Next week the real coursework begins — Python fundamentals, 20 tiny scripts, no peeking.</p>`,
  },

  {
    slug: "week-02", week: 2, date: "2026-07-13",
    title: "Foundations: Python Fundamentals",
    focus: "Python · syntax · control flow · functions",
    hours: 18, topics: 6, tasks: "10/10", progress: 25, status: "COMPLETE",
    wins: [
      "Wrote 20 small scripts — 6 without any reference lookups",
      "Functions and comprehensions finally feel natural, not clever",
      "Set up a lint + format-on-save loop, so sloppy code hurts my eyes immediately",
    ],
    struggles: [
      "Mutable default arguments bit me exactly once (as the textbooks promised)",
      "List vs tuple choice still feels arbitrary — need a rule of thumb",
    ],
    goals: [
      "Finish data structures: lists, dicts, sets, tuples",
      "Solve 15 exercises on Big-O notation",
      "Start a spaced-repetition deck for syntax I keep forgetting",
    ],
    resources: ["Automate the Boring Stuff", "Python official tutorial", "Real Python"],
    excerpt: "Syntax week: 20 scripts, one classic mutable-default bug, and the first taste of writing code that reads like a sentence.",
    html: `
      <p>This was syntax week — the unglamorous kind of studying where you write twenty throwaway scripts until the language stops fighting you. The goal wasn't cleverness. It was getting to the point where <strong>Python reads like a sentence and I stop translating in my head</strong>.</p>
      <h2>What I learned</h2>
      <p>Functions clicked as contracts: inputs, outputs, and one job. Comprehensions clicked as loops you can read aloud. And the famous mutable-default trap finally made sense — defaults are evaluated once, at definition time, so a shared list quietly accumulates state between calls. It bit me in script #14. I'll never forget it now, which is cheaper than remembering it from a book.</p>
      <h2>The system, not the heroics</h2>
      <p>The best decision this week was tooling: format-on-save, lint warnings inline, and a terminal alias to run any exercise in one keystroke. The environment now catches my bad habits at the moment I write them, which is when feedback is cheapest.</p>
      <p>Numbers: 18 hours, 10/10 tasks, 6 topics. The gap I still feel is data-structure intuition — when to reach for a dict versus a set, and why. That's exactly what week three attacks.</p>`,
  },

  {
    slug: "week-03", week: 3, date: "2026-07-20",
    title: "Data & Algorithms I",
    focus: "Lists · dicts · sets · Big-O · searching",
    hours: 20, topics: 7, tasks: "14/16", progress: 37, status: "COMPLETE",
    wins: [
      "Big-O finally intuitive: it's about growth, not stopwatch time",
      "Rewrote a slow lookup script from O(n²) to O(n) — felt like a cheat code",
      "Can now reason about hash tables instead of just using them",
    ],
    struggles: [
      "Recursion still makes me draw stack diagrams on paper",
      "Two tasks slipped: I underestimated how long the exercises take",
    ],
    goals: [
      "Ship the CLI project: a task manager with JSON storage",
      "Learn argparse and file I/O properly",
      "Do a personal code review pass on weeks 1-2 scripts",
    ],
    resources: ["Grokking Algorithms", "NeetCode roadmap", "Python docs: collections"],
    excerpt: "Big-O became intuitive, an O(n²) script became O(n), and recursion still requires paper. Honest week.",
    html: `
      <p>Week three was about developing <strong>performance intuition</strong> — knowing, before running anything, roughly how a piece of code will behave as data grows. Big-O stopped being exam trivia the moment I connected it to a real slowdown I could feel.</p>
      <h2>What I learned</h2>
      <p>My week-2 task-tracker script checked every task against every other task — fine at 20 tasks, glacial at 2,000. Refactoring it from O(n²) to a dict-keyed O(n) lookup took ten minutes and made it instant. That single before/after taught me more than a dozen worked examples: the cost of the wrong structure is invisible until it isn't.</p>
      <p>I also built a tiny mental model for hash tables: trade memory for speed, pay in unpredictable ordering. And I can finally explain why searching a sorted list with binary search beats scanning it — and by how much, at what input sizes.</p>
      <h2>Where I'm behind</h2>
      <p>Recursion is still paper-and-pencil work for me; I trust it, but I don't yet <em>see</em> it. Two exercises slipped to next week because I budgeted like a reader, not like a solver — exercises take twice as long as reading the chapter. Adjusting the calendar instead of the ambition.</p>`,
  },

  {
    slug: "week-04", week: 4, date: "2026-07-27",
    title: "Project: CLI Task Orbiter",
    focus: "Project week · argparse · JSON storage · code review",
    hours: 24, topics: 4, tasks: "8/8", progress: 50, status: "COMPLETE",
    wins: [
      "Shipped a working CLI task manager: add, list, done, stats — all persisted",
      "First time designing before coding: wrote the interface on paper first",
      "Code review pass found 6 real bugs across my old scripts",
    ],
    struggles: [
      "Data migration when the JSON schema changed — I skipped versioning and paid for it",
      "Scope creep on 'just one more feature' almost ate the weekend",
    ],
    goals: [
      "Databases: SQLite from Python, schema design",
      "Learn JOINs and indexes by measuring, not memorizing",
      "Keep the Orbiter repo as a living reference project",
    ],
    resources: ["argparse docs", "The Pragmatic Programmer (ch. 2)", "sqlite3 tutorial"],
    excerpt: "Project week: shipped a CLI task manager, learned that interfaces should be designed before code, and fixed 6 of my own past bugs.",
    html: `
      <p>Week four was project week: turn everything from weeks 1-3 into one real artifact — <strong>Task Orbiter</strong>, a command-line task manager with JSON persistence. The point wasn't the product; it was feeling the difference between exercises and engineering.</p>
      <h2>What I learned</h2>
      <p>The big lesson was design order. I wrote the command interface on paper first — the exact sentences a user types and the exact output they get back. Coding after that was almost mechanical. Every previous project where I "coded first", I ended up redesigning mid-flight, twice.</p>
      <p>The second lesson was schema versioning. Mid-week I added a priority field and broke every existing save file. I lost an hour writing a migration function by hand — for what should have been a non-event. Version your data formats from day one, even in a toy project.</p>
      <h2>Reviewing my own past</h2>
      <p>The most uncomfortable, most valuable task: code review on my weeks 1-2 scripts. Six real bugs, mostly error handling around files that might not exist and inputs I never tested. My older code was honest with me. It's a strange feeling — being reviewed by your past self and losing the argument.</p>`,
  },

  {
    slug: "week-05", week: 5, date: "2026-08-03",
    title: "Databases & SQL",
    focus: "SQLite · schema design · JOINs · indexes",
    hours: 16.5, topics: 5, tasks: "12/12", progress: 62, status: "COMPLETE",
    wins: [
      "Normalized a messy spreadsheet into 3 tables and a working schema",
      "JOINs finally make sense — they're lookups, not magic",
      "Proved index value with a measurable before/after query test",
    ],
    struggles: [
      "NULL logic in SQL behaves unlike anything in Python — tripped on it twice",
      "Over-normalized one table and made queries worse, not better",
    ],
    goals: [
      "Understand HTTP: requests, responses, status codes",
      "DOM manipulation and events in vanilla JS",
      "Rebuild the Orbiter's storage on SQLite as an exercise",
    ],
    resources: ["SQLBolt", "Use The Index, Luke", "sqlite3 in stdlib"],
    excerpt: "Spreadsheets became schemas, JOINs became lookups, and an index turned a 900ms query into 4ms. Measurable week.",
    html: `
      <p>Week five: databases. The framing that unlocked SQL for me was this — <strong>a relational database is a set of spreadsheets with rules, and queries are scheduled lookups between them</strong>. JOIN stopped being an incantation the day I started reading it as "for each row here, find matching rows there."</p>
      <h2>What I learned</h2>
      <p>I took a 400-row spreadsheet from a side project and normalized it into three tables: tasks, tags, and a join table between them. The interesting part wasn't the syntax — it was deciding what belongs to what. Getting the boundaries right made every later query simpler; getting one wrong made everything awkward.</p>
      <p>The index lesson was the week's highlight. A report query over 100k generated rows took ~900ms. One <code>CREATE INDEX</code> later: 4ms. Reading about indexes is forgettable; <em>measuring</em> one is permanent. I also over-normalized a table and had to walk it back — there is such a thing as too much structure, and it costs you in query complexity.</p>
      <h2>The NULL trap</h2>
      <p>My recurring bug: <code>WHERE status != 'done'</code> silently drops rows where status is NULL — because NULL comparisons aren't true or false, they're unknown. SQL has its own logic here, and Python instincts are actively wrong. Two bugs in one week taught me that lesson for good.</p>`,
  },

  {
    slug: "week-06", week: 6, date: "2026-08-10",
    title: "The Web Unveiled",
    focus: "HTTP · DOM · events · async JS",
    hours: 21, topics: 6, tasks: "10/12", progress: 74, status: "COMPLETE",
    wins: [
      "Built a live search filter in vanilla JS — no framework, no copy-paste",
      "The event loop finally made sense after visualizing the callback queue",
      "Understood what a SPA actually is: one page, many states",
    ],
    struggles: [
      "Async/await error handling — one unhandled promise, one red console",
      "This blog's starfield cost me an evening of perf tuning",
    ],
    goals: [
      "React fundamentals: components, state, props",
      "Convert a vanilla page into a component tree on paper",
      "Sleep properly before weekend sessions",
    ],
    resources: ["MDN Learn: JS", "JavaScript.info", "web.dev performance"],
    excerpt: "How the web actually works: requests, the DOM, and the event loop. Built live search in vanilla JS and learned the price of a 60fps canvas.",
    html: `
      <p>Week six pulled back the curtain on the platform I've been shipping to blindly: <strong>what actually happens between a click and a pixel</strong>. HTTP, the DOM, the event loop — the machinery under every page I've ever visited.</p>
      <h2>What I learned</h2>
      <p>The event loop clicked when I stopped anthropomorphizing it. There's one thread; timers and promises don't run in parallel — they queue callbacks for the gaps. Once I could trace execution order on paper, the classic interview question stopped being scary and started being arithmetic.</p>
      <p>The project was a live search filter in vanilla JS: input event, debounce, filtered render — no framework. The moment it worked, frameworks stopped looking like magic and started looking like conveniences. That's the correct order to learn them in: <em>problem first, solution second</em>.</p>
      <h2>The perf rabbit hole</h2>
      <p>My fun trap this week: the starfield on this very blog. First draft dropped frames on mobile. I learned to prefer <code>transform</code>/<code>opacity</code> animations, cap device pixel ratio, and pause the loop when the tab is hidden. One canvas, one evening, ~40% less CPU. Worth it.</p>`,
  },

  {
    slug: "week-07", week: 7, date: "2026-08-17",
    title: "React Fundamentals",
    focus: "Components · state · props · hooks",
    hours: 19.5, topics: 5, tasks: "9/12", progress: 87, status: "COMPLETE",
    wins: [
      "Rebuilt the live-search project as a component tree — less code, clearer structure",
      "useEffect dependency arrays finally make sense (and their absence scares me)",
      "Lifted state correctly on the first try instead of the third",
    ],
    struggles: [
      "Stale closures in event handlers — classic, bit me anyway",
      "3 tasks slipped; adjusting week 8 to absorb them",
    ],
    goals: [
      "Capstone: scope, design, and build one real project in two weeks",
      "Apply the blog's design system to the capstone UI",
      "Write the capstone's README like it will be read (because it will)",
    ],
    resources: ["react.dev (new docs)", "Thinking in React", "useHooks reference"],
    excerpt: "Components as functions, state as memory, props as arguments. React clicked once I stopped fighting re-renders and started designing for them.",
    html: `
      <p>Week seven: React, finally. My main takeaway after years of hearing about it: <strong>React is a function contract</strong> — data in, UI out, and the framework's job is re-running your function when the data changes. Fighting re-renders is the beginner's mistake; designing so re-renders are cheap is the actual skill.</p>
      <h2>What I learned</h2>
      <p>Rebuilding week 6's live-search as a component tree was the exercise that made it real. State moved up to where it was needed; child components became stupid and predictable; the code got shorter and the structure got clearer. Props are arguments, state is private memory, and <code>useEffect</code> is an escape hatch — used exactly as often as escape hatches should be used.</p>
      <p>The stale-closure bug was this week's tuition: an event handler captured an old counter value because it closed over the render it was born in. Reading about it is one thing; debugging it for 40 minutes is the version you remember.</p>
      <h2>Where the week fell short</h2>
      <p>Three tasks slipped — mostly writing the React patterns reference deck. Moving them into the capstone weeks rather than cutting them; the deck is the kind of debt that compounds quietly. Week eight is capstone planning. Time to aim at something real.</p>`,
  },

  {
    slug: "week-08", week: 8, date: "2026-08-24",
    title: "Capstone Sprint: Scoping the Station",
    focus: "Capstone · design systems · project scoping",
    hours: 26, topics: 4, tasks: "11/12", progress: 96, status: "COMPLETE",
    wins: [
      "Wrote a one-page capstone spec with a finish line — applying every post-mortem lesson",
      "Extracted this blog's CSS into a reusable mini design system",
      "Defined 'done' as a demo checklist, not a feeling",
    ],
    struggles: [
      "One task left: the patterns reference deck — rolls into week 9",
      "Temptation to build a framework instead of an app. Resisted. Barely.",
    ],
    goals: [
      "Complete the capstone build and demo it to two humans",
      "Ship the patterns deck",
      "Start the next learning arc: deeper systems or deeper web — decide by data",
    ],
    resources: ["My failed-project post-mortem (this blog)", "Refactoring UI", "The 12-factor app"],
    excerpt: "Scoping week: one page of spec, a demo checklist instead of a feeling, and the blog's CSS promoted into a design system. Capstone starts now.",
    html: `
      <p>Week eight was a sprint, but not the kind I expected: the deliverable was a <strong>one-page specification</strong> for the capstone, plus the groundwork to make it real. After the post-mortem I wrote on this blog, the rules were: scope written before code, a demo checklist instead of a mood, and "done" defined as an event, not a vibe.</p>
      <h2>What I learned</h2>
      <p>Writing a tight spec is a skill, and it's harder than it looks. One page forces ranking: this is in, that is out, and the outs are written down so future me can't quietly renegotiate. The spec's most valuable section is "explicitly not doing" — a list I expect to defend every single week of the build.</p>
      <p>The second artifact: I extracted this blog's styles — tokens, panels, HUD corners, code windows — into a small reusable design system. What began as decoration is now infrastructure. The capstone UI will inherit it, and every improvement to one propagates to both.</p>
      <h2>State of the mission</h2>
      <p>96% through the fundamentals arc. One task open (the patterns deck), rolling into week 9. The capstone build starts now — two weeks, one product, demo to two humans at the end. The mission log continues.</p>`,
  },
];
