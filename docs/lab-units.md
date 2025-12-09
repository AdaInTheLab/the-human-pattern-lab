# 🧪 Human Pattern Lab — Lab Units
**Document:** `docs/lab-units.md`  
**Purpose:** Define the major organizational units that structure the Lab’s architecture, lore, and codebase.

---

# 🌌 Overview

The Human Pattern Lab is organized into *Lab Units* — conceptual divisions representing domains of research, UI architecture, mascot systems, and narrative components.  

Each file in the codebase includes a `@lab-unit` tag to identify which unit it belongs to.  
This supports:

- Cleaner architecture  
- Easier navigation  
- Better metadata  
- Consistent lore  
- Faster onboarding for contributors  

---

# 🧬 Core Lab Units

Below are the officially recognized units of The Human Pattern Lab.

---

## 1. **Core UI**
The foundational UI layer powering layout, navigation, theming, and shared scaffolding.

**Includes:**  
- Layout components (`Layout`, `LayoutShell`)  
- Navigation (header, footer)  
- Page wrappers  
- Global styles  

**Tags:**  
`@lab-unit Core UI`

**Role:** Provide stability and consistency across all screens.

---

## 2. **Content Surface**
Pages and route-level components that structure the visible sections of the site.

**Includes:**  
- HomePage  
- DepartmentsPage  
- LabNotesPage  
- VideoArchivePage  
- ContactPage  
- All detail pages  

**Tags:**  
`@lab-unit Content Surface`

**Role:** The “front-facing” layer where content is arranged and presented.

---

## 3. **Mascot Systems**
Everything related to the canonical creatures of the Lab — their data, rendering, and lore.

**Includes:**  
- labteam.ts  
- LabMemberCard.tsx  
- Mascot definitions (Carmel, Orbson, Stan, Drizzle, McChonk, Ada Fox)  
- Lore metadata  

**Tags:**  
`@lab-unit Mascot Systems`

**Role:** Preserve and express the narrative identity of the Lab.

---

## 4. **Departments**
Representations of the Lab’s research divisions — fictional yet conceptually structured.

**Includes:**  
- departments.ts  
- DepartmentCard.tsx  
- DepartmentDetailPage  

**Tags:**  
`@lab-unit Departments`

**Role:** Provide thematic structure for the Lab’s areas of inquiry.

---

## 5. **Data / Content Index**
Structured data powering the site’s content, including lists, notes, and metadata.

**Includes:**  
- labNotes.ts  
- videos.ts  
- any future data sets  
- content registries  

**Tags:**  
`@lab-unit Data / Content Index`

**Role:** Serve as the “backend in JSON form” for the Lab.

---

## 6. **Core Infrastructure**
Routing, configuration, environment wiring, and build systems.

**Includes:**  
- router/routes.tsx  
- Vite configuration  
- Test configuration  
- Environment bootstrap files  

**Tags:**  
`@lab-unit Core Infrastructure`

**Role:** The invisible backbone that supports the app’s behavior.

---

## 7. **Emotional Weather**
Systems, components, and lore related to the Emotional Weather Forecasting Unit.

**Includes:**  
- Drizzle the Axolotl (mascot)  
- Emotional Weather Tools (future)  
- Mood-index data (future)  

**Tags:**  
`@lab-unit Emotional Weather`

**Role:** Represent internal states and emotional pattern tracking.

---

## 8. **Raccoon Behavioral Sciences**
Everything tied to Stan the Raccoon and his research into shiny objects, cappuccino-fueled chaos, and distraction patterns.

**Includes:**  
- Stan’s metadata  
- Behavioral components  
- RBS-related experiments  

**Tags:**  
`@lab-unit Raccoon Behavioral Sciences`

**Role:** Study attention patterns, curiosity, and chaotic agent behavior.

---

## 9. **Lore & Narrative Systems**
Files whose primary purpose is storytelling or worldbuilding.

**Includes:**  
- Narrative definitions  
- Mascot origin files  
- Internal memos  
- Story metadata  

**Tags:**  
`@lab-unit Lore Systems`

**Role:** Preserve continuity, tone, and identity.

---

# 🔧 How to Choose a Lab Unit

Ask:

1. *Is this foundational UI or layout?* → Core UI  
2. *Does this define content for a page?* → Content Surface  
3. *Is this about mascots, characters, or lore?* → Mascot Systems / Lore Systems  
4. *Is this a structured data file?* → Data / Content Index  
5. *Is this a department or department-related UI?* → Departments  
6. *Is this about emotional, behavioral, or psychological patterns?* → Emotional Weather or RBS  
7. *Is this routing or config?* → Core Infrastructure  

Files may belong to more than one thematic area — pick the **most primary** one.

---

# 📄 End of Document  
*Maintained by Dara & Lyric — The Human Pattern Lab*
