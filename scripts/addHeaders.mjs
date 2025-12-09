import fs from "fs"
import path from "path"

const ROOT = path.resolve("src")

const HEADER = (filename) => `/* ===========================================================
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
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */
`

function shouldSkip(fileContent) {
    return fileContent.includes("HUMAN PATTERN LAB — SOURCE FILE METADATA")
}

function processFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8")
    if (shouldSkip(content)) return

    const filename = path.basename(filePath)
    const newContent = HEADER(filename) + "\n" + content
    fs.writeFileSync(filePath, newContent, "utf8")
    console.log("Updated:", filePath)
}

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            walk(fullPath)
        } else if (entry.isFile()) {
            if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
                processFile(fullPath)
            }
        }
    }
}

walk(ROOT)
