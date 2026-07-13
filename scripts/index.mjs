#!/usr/bin/env node
// Regenerate the managed index block in a Context directory's AGENTS.md and
// validate every markup file's frontmatter along the way.
//
// Usage: node scripts/index.mjs <path-to-Context>
//
// The block is guard-delimited and idempotent. Human content in AGENTS.md
// outside the block is preserved. Markup files with broken frontmatter are
// listed in an unindexed section so they surface instead of vanishing, and
// the run exits 1 until they are fixed.

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, basename, extname } from "node:path";

const BEGIN = "<!-- BEGIN context-directory-opinions index (generated, do not edit) -->";
const END = "<!-- END context-directory-opinions index -->";
const MARKUP = new Set([".md", ".html"]);
const DATE = /^\d{4}-\d{2}-\d{2}$/;

if (process.argv.includes("--help")) {
  console.log(
    "Usage: node scripts/index.mjs <path-to-Context>\n" +
      "Regenerates the managed index block in <path>/AGENTS.md and validates frontmatter. Exits 1 on errors.",
  );
  process.exit(0);
}

const args = process.argv.slice(2).filter((a) => a !== "--force");
const force = process.argv.includes("--force");
const root = resolve(args[0] ?? "./Context");
if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(`ERROR: ${root} is not a directory`);
  process.exit(1);
}
if (basename(root) !== "Context" && !force) {
  console.error(
    `ERROR: ${root} is not named Context. The index block belongs only in a Context directory's AGENTS.md. Pass --force to override.`,
  );
  process.exit(1);
}

const docs = [];
const assets = [];
const broken = [];
const errors = [];

function parseFrontmatter(raw, ext) {
  let block = null;
  if (ext === ".md") {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (m) block = m[1];
  } else {
    const m = raw.match(/^<!--\r?\n([\s\S]*?)\r?\n-->/);
    if (m) block = m[1].replace(/^---\r?\n/, "").replace(/\r?\n---$/, "");
  }
  if (block === null) return null;
  const fields = {};
  const badLines = [];
  for (const line of block.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (!m) {
      badLines.push(line.trim());
      continue;
    }
    const value = m[2].trim();
    if (/^[|>][+-]?$/.test(value)) {
      badLines.push(`${m[1]}: block scalars are unsupported, use a single-line value`);
      continue;
    }
    fields[m[1]] = value.replace(/^"(.*)"$/s, "$1").replace(/^'(.*)'$/s, "$1");
  }
  return { fields, badLines };
}

function walk(dir) {
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    const rel = relative(root, full).replaceAll("\\", "/");
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (entry === "AGENTS.md") continue;
    const ext = extname(entry).toLowerCase();
    if (!MARKUP.has(ext)) {
      assets.push(rel);
      continue;
    }
    const parsed = parseFrontmatter(readFileSync(full, "utf8"), ext);
    if (!parsed) {
      broken.push(rel);
      errors.push(`${rel}: missing frontmatter block`);
      continue;
    }
    const { fields, badLines } = parsed;
    const problems = badLines.map((l) => `unparseable frontmatter line: ${l}`);
    if (!fields.name) problems.push("missing `name`");
    if (!fields.description) problems.push("missing `description`");
    else if (fields.description.length > 1024) problems.push("`description` over 1024 characters");
    for (const key of ["date_created", "date_modified"]) {
      const v = fields[key];
      if (!v) {
        problems.push(`missing \`${key}\``);
        continue;
      }
      const d = new Date(`${v}T00:00:00Z`);
      if (!DATE.test(v) || Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== v)
        problems.push(`\`${key}\` is not a real YYYY-MM-DD date`);
    }
    if (problems.length) {
      broken.push(rel);
      for (const p of problems) errors.push(`${rel}: ${p}`);
      continue;
    }
    docs.push({ rel, ...fields });
  }
}

walk(root);

const live = docs.filter((d) => !d.rel.startsWith("Deprecated/"));
const deprecated = docs.filter((d) => d.rel.startsWith("Deprecated/"));

const lines = [
  BEGIN,
  "",
  "# Context Index",
  "",
  "Follow the `context-directory-opinions` skill when working in this directory, and regenerate this index after any change here. Each description below is the trigger: read the files whose descriptions match the task.",
];
const entry = (d) => {
  lines.push("", `### [${d.name}](<${d.rel}>) (Modified ${d.date_modified})`, "");
  lines.push(`> ${d.description}`);
};
for (const d of live) entry(d);
if (deprecated.length) {
  lines.push("", "## Deprecated (non-guidance)");
  for (const d of deprecated) entry(d);
}
if (assets.length) {
  lines.push("", "## Assets", "");
  for (const a of assets) lines.push(`- [${basename(a)}](<${a}>)`);
}
if (broken.length) {
  lines.push("", "## Unindexed (fix frontmatter)", "");
  for (const b of broken) lines.push(`- \`${b}\``);
}
lines.push("", END);
const block = lines.join("\n");

const agentsPath = join(root, "AGENTS.md");
let content = existsSync(agentsPath) ? readFileSync(agentsPath, "utf8") : "";
const eol = content.includes("\r\n") ? "\r\n" : "\n";
const guardPattern = new RegExp(
  `${BEGIN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
);
if (!content.trim()) content = `${block}\n`;
else if (guardPattern.test(content)) content = content.replace(guardPattern, () => block);
else content = `${content.trimEnd()}\n\n${block}\n`;
if (eol === "\r\n") content = content.replace(/\r?\n/g, "\r\n");
writeFileSync(agentsPath, content);

console.log(
  `Indexed ${docs.length} doc(s), ${assets.length} asset(s), ${broken.length} unindexed in ${agentsPath}`,
);
for (const e of errors) console.error(`ERROR: ${e}`);
if (errors.length) process.exit(1);
