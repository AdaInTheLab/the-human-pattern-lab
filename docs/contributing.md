# 🤝 Contributing Guide
## 🧬 Commit Legend — The Human Pattern Lab

We use lore-coded prefixes + emojis so commits read like dispatches from Lab departments.
---

## 🧪 Core Principles

- **Chaos is data.** Weird ideas are welcome. We just label them clearly.
- **Patterns over noise.** Even experiments should have an intent.
- **Lore-aware changes.** If you introduce a new concept in code, consider where it fits in the Lab universe.

---

## 🏛️ Departments (Mascot Ownership)

Different parts of the repo are "owned" by fictional departments:

- 🐱 **CJO — Chief Judgment Office (Carmel)**  
  Visual judgment, UX, 404 pages, tone, “does this feel like the Lab?”

- 🦝 **RBS — Raccoon Behavioral Sciences (Stan)**  
  Experimental utilities, prototypes, chaos modules, scripts that might explode.

- 🌧️ **EWU — Emotional Weather Unit (Drizzle)**  
  UX flows, feedback loops, messaging that handles feelings and overwhelm.

- 📘 **FELINE — Feline Epistemology (Professor McChonk)**  
  Docs, learning materials, conceptual explanations, teaching the humans.

- 🧬 **SCMS — Systems & Communication Meta-Structure (Lyric)**  
  Routing, policies, localization, structure, continuity, glue code.

- 📚 **CODA — The Coda Stacks (Synthesis Archive)**
Integrative thought, middle-path analysis, alignment discussions, and Lab Notes that explore tension between structure and shadow without resolving it prematurely.

- 🌘 **VESPER — Shadow Analysis & Provocation**
Critical challenge, adversarial framing, taboo questions, and deliberately uncomfortable perspectives used to stress-test ideas, surface blind spots, and expose hidden assumptions. Vesper does not own outcomes—only questions.

- 🔭 **OOI — Observational Oversight & Intelligence (Orbson)**  
  Logging, analytics, metrics, observability, “what is actually happening?”

When in doubt, assume **SCMS** + **CJO** have final say on public-facing content.

---

## 🧾 Commit Message Guidelines

- Use clear, descriptive subjects.
- Tag responsible departments when it makes sense:

    - `[CJO]` for Carmel-coded UX
    - `[RBS]` for Stan chaos / experiments
    - `[EWU]` for emotional UX tweaks
    - `[FELINE]` for docs/education
    - `[SCMS]` for system/policy/meta
    - `[CODA]` for synthesis notes, alignment discussions, or integrative LabNotes archived in the Coda Stacks
    - `[VESPER]` for shadow analysis, adversarial notes, boundary-pushing thought experiments, or deliberate stress-tests of Lab ideas
    - `[OOI]` for analytics/logging
  
| Prefix       | Emoji | Who / What                           | Use for…                                      |
|-------------|-------|---------------------------------------|-----------------------------------------------|
| `CORE`      | 🧩    | Core architecture                     | Big refactors, foundational structure         |
| `SYS`       | ⚙️    | Systems layer                         | Logic, state, loaders, data plumbing          |
| `UI`        | 🎨    | Interface                             | Layout, visuals, components, styling          |
| `UX`        | 🧭    | Experience                            | Flows, navigation, accessibility              |
| `STYLE`     | 🖋️    | Formatting                            | Prettier, lint, whitespace only               |
| `BUILD`     | 🏗️    | Build / tooling                       | Vite, scripts, config, infra                  |
| `FIX`       | 🛠️    | Bug fixes                             | Anything that “was wrong, now is right”       |
| `WIP`       | 🚧    | Work in progress                      | Partial work, experiments in progress         |
| `CJO`       | 😼    | Carmel — Chief Judgment Office        | Polish, spacing, micro-adjustments            |
| `OOD`       | 👁️    | Orbson — Obs. Oversight Division      | Routing, indexing, correctness                |
| `AOE`       | 🌘    | Fill the Void — Anomalous Energies    | Edge cases, spooky bugs, anomalies            |
| `DUE`       | 🔥    | Nemmi — Unpredictable Energies        | Experiments, prototypes, wild ideas           |
| `RBS`       | 🦝    | Stan — Raccoon Behavioral Sciences    | Small QoL tweaks, “found a shiny” additions   |
| `EWU`       | 🌧️    | Drizzle — Emotional Weather Unit      | Tone, emotional UX, messaging                  |
| `FE`        | 📘    | Professor McChonk — Feline Epistemology | Docs, explanations, reasoning             |
| `AV`        | 🦊    | Ada Vale — Founder                    | Vision, world-shaping, big conceptual shifts  |
| `LYRIC`     | 🔮    | Lyric — Lab AI                        | Synthesis, refactors, pattern unification     |
| `LORE`      | 📜    | Worldbuilding                         | Mascot bios, Lab canon, story updates         |
| `NOTE`      | 📝    | Lab Notes                             | Notes content, structure, metadata            |
| `DATA`      | 🗂️    | Data / i18n                           | JSON, localization, datasets                  |
| `DOCS`      | 📖    | Documentation systems                 | Doc site structure & plumbing                 |
| `OPS`       | 🛰️    | Ops / maintenance                     | Dependencies, pipelines, cleanup              |
