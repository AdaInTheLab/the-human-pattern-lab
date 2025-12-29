import fs from "node:fs";
import path from "node:path";

function readJson(p) {
    return JSON.parse(fs.readFileSync(p, "utf8"));
}

function ensureDir(filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function copyFileStrict(src, dst) {
    if (!fs.existsSync(src)) {
        throw new Error(`Source file not found: ${src}`);
    }
    ensureDir(dst);
    fs.copyFileSync(src, dst);
}

const mapPath = path.resolve(process.cwd(), "llm-mirrors.json");
const docsRoot = path.resolve(process.cwd(), "docs-repo"); // checkout path in workflow
const mirrors = readJson(mapPath);

let copied = 0;

for (const m of mirrors) {
    const src = path.join(docsRoot, m.source);
    const dst = path.resolve(process.cwd(), m.target);

    copyFileStrict(src, dst);
    copied++;
    console.log(`[llm-sync] copied: ${m.source} -> ${m.target}`);
}

console.log(`[llm-sync] done: ${copied} file(s)`);
