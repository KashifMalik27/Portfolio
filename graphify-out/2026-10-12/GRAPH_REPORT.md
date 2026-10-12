# Graph Report - malik-kashif-next-portfolio  (2026-10-12)

## Corpus Check
- 45 files · ~351,555 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .css 1, .jfif 1)

## Summary
- 208 nodes · 258 edges · 20 communities (16 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- layout.jsx
- package.json
- dependencies
- next
- contact/page.jsx
- projects/page.jsx
- react
- eslint.config.mjs
- Portfolio Design System
- about/page.jsx
- education/page.jsx
- experience/page.jsx
- resume/page.jsx
- devDependencies
- compilerOptions
- next.config.js
- Malik Kashif Next.js Portfolio
- Design Decisions

## God Nodes (most connected - your core abstractions)
1. `Portfolio Design System` - 19 edges
2. `Design Decisions` - 12 edges
3. `react` - 8 edges
4. `next` - 7 edges
5. `RootLayout()` - 5 edges
6. `SkillPhysicsField()` - 5 edges
7. `scripts` - 5 edges
8. `Malik Kashif Next.js Portfolio` - 5 edges
9. `Hero()` - 4 edges
10. `PageTransition()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Patterns` --references--> `PageTransition()`  [INFERRED]
  DESIGN_SYSTEM.md → components/PageTransition.jsx
- `AboutPage()` --calls--> `AboutSection()`  [EXTRACTED]
  app/about/page.jsx → components/AboutSection.jsx
- `ContactPage()` --calls--> `ContactForm()`  [EXTRACTED]
  app/contact/page.jsx → components/ContactForm.jsx
- `EducationPage()` --calls--> `EducationTimeline()`  [EXTRACTED]
  app/education/page.jsx → components/EducationTimeline.jsx
- `ExperiencePage()` --calls--> `ExperienceTimeline()`  [EXTRACTED]
  app/experience/page.jsx → components/ExperienceTimeline.jsx

## Import Cycles
- None detected.

## Communities (20 total, 4 thin omitted)

### Community 0 - "layout.jsx"
Cohesion: 0.12
Nodes (17): app_globals, inter, metadata, RootLayout(), Footer(), iconMap, Navbar(), PageTransition() (+9 more)

### Community 1 - "package.json"
Cohesion: 0.10
Nodes (19): startPhysics(), name, private, scripts, build, dev, lint, start (+11 more)

### Community 2 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, @emailjs/browser, framer-motion, gsap, @heroicons/react, lenis, matter-js, next (+5 more)

### Community 3 - "next"
Cohesion: 0.29
Nodes (7): HomePage(), metadata, Hero(), socialIconMap, ProfileCard(), heroData, next

### Community 4 - "contact/page.jsx"
Cohesion: 0.31
Nodes (6): ContactPage(), metadata, ContactForm(), socialIconMap, contactData, @emailjs/browser

### Community 5 - "projects/page.jsx"
Cohesion: 0.36
Nodes (5): metadata, ProjectsPage(), ProjectCard(), ProjectsGrid(), projectsData

### Community 6 - "react"
Cohesion: 0.20
Nodes (10): metadata, SkillsPage(), SkillCard, icons, SkillIcon(), SkillPhysicsField(), SkillsSearch(), skillsData (+2 more)

### Community 7 - "eslint.config.mjs"
Cohesion: 0.25
Nodes (7): compat, __dirname, eslintConfig, __filename, @eslint/eslintrc, ref_path, ref_url

### Community 8 - "Portfolio Design System"
Cohesion: 0.11
Nodes (18): Accessibility, Color tokens, Crisp Profile Cover Fix — 2026-10-09, Direction, Final Profile Cover Treatment — 2026-10-09, Mirrored Profile Hero Card Complete — 2026-10-09, Portfolio Design System, Profile Card Alignment & Brand Mark — 2026-10-09 (+10 more)

### Community 9 - "about/page.jsx"
Cohesion: 0.43
Nodes (4): AboutPage(), metadata, AboutSection(), aboutData

### Community 10 - "education/page.jsx"
Cohesion: 0.43
Nodes (4): EducationPage(), metadata, EducationTimeline(), educationData

### Community 11 - "experience/page.jsx"
Cohesion: 0.43
Nodes (4): ExperiencePage(), metadata, ExperienceTimeline(), experienceData

### Community 12 - "resume/page.jsx"
Cohesion: 0.43
Nodes (4): metadata, ResumePage(), ResumeActions(), resumeData

### Community 13 - "devDependencies"
Cohesion: 0.29
Nodes (7): devDependencies, autoprefixer, eslint, eslint-config-next, @eslint/eslintrc, postcss, tailwindcss

### Community 18 - "Malik Kashif Next.js Portfolio"
Cohesion: 0.33
Nodes (5): Contact form, Malik Kashif Next.js Portfolio, Production check, Resume, Run locally

### Community 19 - "Design Decisions"
Cohesion: 0.07
Nodes (26): 2026-10-09 — Apple Glass Visual Refresh, 2026-10-09 — Desktop Navigation Motion, 2026-10-09 — Liquid Glass Material Refinement, 2026-10-09 — Reference-Matched Neon Liquid Theme, 2026-10-09 — Smooth Scroll Performance, Decisions Made, Decisions Made, Decisions Made (+18 more)

## Knowledge Gaps
- **97 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `inter` (+92 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 110 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `layout.jsx`, `package.json`, `projects/page.jsx`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `layout.jsx`, `package.json`, `contact/page.jsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _97 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `layout.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11666666666666667 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Portfolio Design System` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Design Decisions` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._