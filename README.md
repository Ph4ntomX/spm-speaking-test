# SPM Speaking Timer

Free timer tool for Malaysian students preparing for the SPM English Speaking Test (Paper 1119/3).

## Features

- **Part 1** — Interview timer for both candidates (intro + topic question)
- **Part 2** — Individual Long Turn with prep and speaking timers, "You should say" prompts
- **Part 3** — Collaborative task with discussion/decision/opinion phases, turn-taking tracker
- **Full Practice** — Complete mock test running all 3 parts in sequence
- **Scoring** — Per-candidate checklist and grade after each session
- **45 Part 2 sets + 46 Part 3 sets** from 2023 SPM trial papers (auto-cycles, no repeats)
- **Tips panel** — STEEP-A-STEEP technique, PICK-A-POINT, connectors, vocabulary upgrades
- **Works offline** — installable PWA. Visit once, then practice anytime without internet.

## Install / Offline Use

Open the site in a browser, then use "Add to Home Screen" (mobile) or the install icon in the address bar (desktop). After the first visit, the app is cached and works fully offline — fonts, sounds, and all question sets are bundled in.

## Setup

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

## Tech

React, Vite, Tailwind CSS, localStorage, PWA (vite-plugin-pwa), self-hosted fonts. No backend.
