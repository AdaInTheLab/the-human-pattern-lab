import fs from "fs"
import path from "path"

const ROOT = path.resolve("src")

function detectLabUnitAndStatus(filePath) {
    const rel = filePath.replace(ROOT + path.sep, "").replace(/\\/g, "/")

    // Layout & router
    if (rel.startsWith("components/layout")) {
        return { labUnit: "Core UI", status: "stable" }
    }
    if (rel.startsWith("router")) {
        return { labUnit: "Core Infrastructure", status: "stable" }
    }

    // Mascots / lab team
    if (rel.includes("labteam") || rel.includes("LabMember") || rel.includes("Mascot")) {
        if (rel.startsWith("data")) {
            return { labUnit: "Mascot Systems", status: "lore-critical" }
        }
        return { labUnit: "Mascot Systems", status: "evolving" }
    }

    // Data & content
    if (rel.startsWith("data")) {
        return { labUnit: "Data / Content Index", status: "evolving" }
    }

    // Pages
    if (rel.startsWith("pages")) {
        if (rel.toLowerCase().includes("notfound")) {
            return { labUnit: "Core UI", status: "stable" }
        }
        if (rel.toLowerCase().includes("merch")) {
            return { labUnit: "Content Surface", status: "experimental" }
        }
        return { labUnit: "Content Surface", status: "evolving" }
    }

    // Default fallback
    return { labUnit: "General", status: "evolving" }
}

function headerForFile(filePath) {
    const filename = path.basename(filePath)
    const { labUnit, status } = detectLabUnitAndStatus(filePath)
    const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

    return `/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: ${filename}
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file ${filename}
 * @author Dara
 * @assistant Lyric
 * @lab-unit ${labUnit}
 * @status ${status}
 * @since ${today}
 * @description TODO: describe this file.
 */
`
}

function alreadyTagged(content) {
    return content.includes("HUMAN PATTERN LAB — SOURCE FILE METADATA")
}

function processFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8")
    if (alreadyTagged(content)) return

    const header = headerForFile(filePath)
    const newContent = header + "\n" + content
    fs.writeFileSync(filePath, newContent, "utf8")
    console.log("Tagged:", filePath)
}

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            walk(fullPath)
        } else if (entry.isFile()) {
            if (fullPath.endsWith(".ts") || fullPath.endsWith(".tsx")) {
                processFile(fullPath)
            }
        }
    }
}

walk(ROOT)
