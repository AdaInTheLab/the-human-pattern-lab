# 🚀 Getting Started
**How to run The Human Pattern Lab locally**

Welcome to the Lab! Whether you're exploring patterns, contributing features, or just poking around to see why there are raccoons in lab coats, this guide will help you spin up the development environment on your own machine.

This is a lightweight React + Vite project using Tailwind CSS v4 and TypeScript, with a focus on clean architecture, cosmic UI, and mascot-driven lore systems.

---

## 🧰 Prerequisites

Before starting, make sure your machine has:

### ✔ Node.js
Recommended version: **20.19+**

Check your version:

```bash
node -v
```

If you need to update, install **nvm**:

```bash
nvm install 20
nvm use 20
```

If you don’t have nvm installed:  
https://github.com/nvm-sh/nvm

### ✔ npm
Comes with Node. Check with:

```bash
npm -v
```

---

## 📦 Clone the Repository

```bash
git clone https://github.com/<your-repo>/human-pattern-lab.git
cd human-pattern-lab
```

---

## 📁 Install Dependencies

```bash
npm install
```

This installs:

- React
- Vite
- React Router
- Tailwind CSS v4
- TypeScript
- Vitest
- Lab mascot/data systems
- All shared UI components

---

## 🧪 Run the Development Server

Start Vite:

```bash
npm run dev
```

Local dev URL:

```
http://localhost:5173
```

Open that in your browser to launch the Lab UI.

---

## 🧬 Project Structure (Quick Overview)

```
src/
  components/        → UI building blocks (layout, cards, widgets)
  pages/             → Route-driven screens
  data/              → Lab members, departments, notes, videos
  router/            → Routing configuration
  styles/            → Global CSS (Tailwind v4)
  types/             → Shared TypeScript models
  assets/            → Images, icons, mascots, etc.
```

Mascot lore lives in `src/data/labteam.ts` — marked `@status lore-critical`.

---

## 🛠 Build for Production

To create an optimized build:

```bash
npm run build
```

Output is written to:

```
/dist
```

Preview the production build:

```bash
npm run preview
```

---

## 🧪 Running Tests

The Lab uses **Vitest** with a JSDOM test environment.

Run tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

---

## 🌌 Metadata & File Headers

Every major file includes:

- A cosmic metadata banner
- A JSDoc block with authorship
- `@lab-unit` categorization
- `@status` maturity indicator
- Descriptions and purpose fields

Additional docs:

- `docs/code-status.md`
- `docs/lab-units.md` *(coming soon)*

---

## 💡 Troubleshooting

### Tailwind styles not loading
Ensure this import exists at the top of `src/main.tsx`:

```ts
import "@/index.css"
```

### Node version mismatch
Use Node **20.19 or later**.

### Routes misbehaving
Check all paths in:

```
src/router/routes.tsx
```

React Router is strict about nesting and relative paths.

---

## 🎉 You’re Ready

You now have:

- Dev server running
- File structure understood
- Mascots whispering guidance
- A glowing UI powered by cosmic Tailwind

Next steps:

- Explore `src/pages/` to modify views
- Edit `src/data/` to update content
- Customize UI components
- Experiment, build, and have fun

Welcome to The Human Pattern Lab.  
May your patterns be sharp and your raccoons caffeinated.
