![Build: Approved by Carmel](https://img.shields.io/github/actions/workflow/status/AdaInTheLab/the-human-pattern-lab/deploy-main-site.yml?branch=master&label=Build%3A%20Approved%20by%20Carmel&logo=github&logoColor=white)
[![Tests](https://github.com/AdaInTheLab/the-human-pattern-lab/actions/workflows/tests.yml/badge.svg)](https://github.com/AdaInTheLab/the-human-pattern-lab/actions/workflows/tests.yml)
[![Coverage](https://codecov.io/gh/AdaInTheLab/the-human-pattern-lab/branch/master/graph/badge.svg?label=Coverage%3A%20Judged%20by%20Carmel%20%F0%9F%98%BC&color=8A2BE2)](https://codecov.io/gh/AdaInTheLab/the-human-pattern-lab)

# 🧌 How This Repo Works

Welcome, traveler, to the **inner workings** of The Human Pattern Lab main site.  
This section explains how everything functions, but, you know… *in gremlin*.

---

## 🧪 1. The Folder Structure (a.k.a. “Where Things Live, Probably”)

This repo now has **real structure**.  
SCMS (Systems, Chaos & Meta-Structures) fought for its life to make sure things are where they *claim* to be.

- **/src** — The heart of the Lab. Components, pages, layouts, and chaos.
- **/departments** — Home of the CJO, SCMS, OOD, AOE, DUE, FELINE, RBS, and EWU.  
  Each has its own lore, responsibilities, and mascot supervisor.
- **/pages** — Site routes (Home, About, Lab Notes, Videos, etc).
- **/components** — Reusable UI widgets and questionable React ideas.
- **/lib** — Infrastructure magic. Probably important. We should label it someday.
- **/assets** — Shiny objects Stan collected. Also fonts and images.
- **/public** — Static files that refuse to be organized.
- **/__tests__** — Where Vitest silently judges your code (Carmel joins in).

If something isn’t listed:  
- It is either **in progress**,  
- **in hiding**,  
- or **in the claws of Nemmi**.

---

## ⚙️ 2. The Build Process (aka “Making It Less Broke™”)

If you want the gremlins to forge this site into existence:

```bash
npm install
npm run build
```

This produces the holy **/dist** folder.  
Treat it with respect.  
Or don’t — Vite will rebuild it anyway.

---

## 🚀 3. Deployment (The Ritual, Automated Edition)

Thanks to GitHub Actions:

1. You push to `master`
2. The build runs
3. Carmel judges it
4. DreamHost gets the updated site
5. A mascot somewhere high-fives another mascot

No more manual deployments.  
Unless things break.  
(They will.)

---

## 🧭 4. Navigation (or: “How Not to Get Lost in the Lab”)

Main sections include:

- **/departments/** — Explore each division of the Lab  
  (Judgment, Chaos, Anomalies, Emotional Weather, Raccoon Science… all the essentials.)
- **/docs/** — The Lab Archives (via Docusaurus)
- **/lab-notes/** — Thoughts, diagrams, lore, and the occasional fox rant
- **/videos/** — Archive of content for future humans
- **/mascots/** — The real executives of the organization

If you see a 404:  
Congratulations.  
You’ve discovered a new department.

---

## 🧪 5. Tests (a.k.a. “Proving Things Mostly Work™”)

Vitest + Happy DOM ensures:

- Pages render  
- Routes map correctly  
- Departments don’t spontaneously explode  
- The codebase remains *slightly* less cursed  

Run them with:

```bash
npm run test
```

For coverage:

```bash
npm run test:coverage
```

Carmel will judge the numbers from her neon Codecov throne.

---

## 🧹 6. Coverage & CI Badges

Your repo is now monitored by three powerful forces:

- **Carmel** — Approves builds  
- **Vitest** — Judges your logic  
- **Codecov** — Exposes your sins via percentage  

Perfect synergy.

---

## 🐾 7. Contributions (Gremlin Edition)

You may contribute if you are:

- Gremlin-coded  
- Mascot-approved  
- Comfortable shipping features at 3am  
- Aware that Stan may steal your code mid-PR  
- Prepared to be silently judged by Carmel

Pull requests should include:

- Working code  
- Minimal fires  
- Snacks for Professor McChonk  
- Respect for Drizzle’s emotional climate  
- Zero leading-space filenames (we do not speak of it)

---

## 🔥 8. The Vibes

This repo is held together by:

- Curiosity  
- Pattern recognition  
- Mascot energy  
- Coffee  
- Chaos  
- Vibes  
- Several untracked miracles  

If something breaks:  
**Stan touched it.**

If something works:  
**Carmel allowed it.**

---

Proceed with caution.  
And snacks.  
Always snacks.
