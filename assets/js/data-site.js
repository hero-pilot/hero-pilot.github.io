/* ════════════════════════════════════════════════════════════════
   NEXUS // data-site.js — EDIT THIS FILE to make the blog yours.
   Change the values below; the whole site updates automatically.
   ════════════════════════════════════════════════════════════════ */

const SITE = {
  name: "Erfan Dousti",          // ← your name (used in hero, nav, footer)
  firstName: "Erfan",            // ← first name (hero glitch line 1)
  lastName: "Dousti",           // ← last name (hero glitch line 2)
  initials: "ED",               // ← avatar hexagon letters
  role: "Software Engineer",   // ← shown under your name
  location: "SECTOR 7G · EARTH",               // ← fun location tag
  email: "erfan.flashpoint@gmail.com",

  // Rotating typewriter lines in the hero (keep 2-5 short lines)
  taglines: [
    "I build things and write about the journey.",
    "Shipping code, collecting scars, sharing the maps.",
  ],

  // "About the operator" paragraphs (2-3 sentences each works best)
  bio: [
    "I'm a developer who enjoys the full trip from a blank file to a live product — design systems, performance budgets, and the occasional shader rabbit-hole. By day I work on web platforms; by night I run learning missions and log them in the <b>reports</b> archive.",
    "This station is my public notebook. The <span class='mono-inline'>blog</span> holds long-form entries about tools, languages and lessons learned; the <span class='mono-inline'>reports</span> section is a weekly dossier of what I studied, what worked and what exploded."
  ],

  // Skill / tech chips shown in the About section
  skills: ["TypeScript", "React", "Node.js", "Python", "Rust", "Docker", "SQL", "Git", "Linux"],

  // Your social links — replace the urls with your real profiles.
  // Delete any line you don't use, or add new ones (id must exist in ICONS inside app.js).
  socials: [
    { id: "github",   label: "GitHub",   url: "https://github.com/your-username" },
    { id: "x",        label: "X",        url: "https://x.com/your-handle" },
    { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/your-handle" },
    { id: "mail",     label: "Email",    url: "mailto:hello@example.com" },
    { id: "rss",      label: "Feed",     url: "#/blog" }
  ]
};
