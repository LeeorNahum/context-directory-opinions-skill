---
name: "context-directory-opinions"
description: "Opinionated structure for a Context directory: the durable home for a project's plans, research, notes, schedules, program info, and shared memory as markup. Use when creating, saving, organizing, or reorganizing any durable documentation or planning material, when the user says to save, note, remember, capture, or document project material for later (even vaguely), never for personal reminders or in-chat preferences, when adding plans, meeting notes, research, or reference material to a repository, or when reading or maintaining an existing Context directory and its index. Not for code documentation, READMEs, or comments that live with the source."
metadata:
  author: "Leeor Nahum"
  version: "2.2.0"
---

# Context Directory Opinions

A `Context/` directory is the durable home for everything a project knows that is not code: plans, research, notes, schedules, decisions, program information, and shared memory. Humans and agents both read and write it, so every document carries a description that says when to read it, a generated index catalogs everything, and agents load only what matches the task. That is what makes many small files cheap, and many small files are the point.

## The Context Directory

- `Context/` lives at the host directory's root. The skill owns only that directory, never the host repository around it.
- Organize freely with subdirectories and topic folders. Create, rename, split, merge, and remove them as understanding improves. No first layout is permanent.
- `Context/AGENTS.md` holds the generated index block and nothing else needs to live there, though human content around the block is preserved. It is the only `AGENTS.md` anywhere in the directory. It and this skill cross-reference each other: read either one and the whole system is known.
- An optional `Deprecated/` subdirectory preserves superseded material. Treat its contents as non-guidance unless the user explicitly asks for history.

## Reading Discipline

Read `Context/AGENTS.md` first. Each index entry's description says when to read that file. Load the files whose descriptions match the task and nothing else. Never assume the folder must be read in full, and never avoid creating a new file to keep the folder "small enough to read". The index makes size free.

## File Formats

Markdown and HTML are interchangeable markup. Choose by reading job, not by quota. A mature directory often ends up with a substantial mix of both because short agent-first notes and compact human-facing views solve different problems.

- Choose Markdown for one linear topic that an agent or human can scan without layout help. Prefer it for short research notes, decisions, meeting records, and prose with at most one small table or checklist.
- Keep a review checklist in Markdown when the reviewer is expected to edit the file directly, add quote-line comments, and review the resulting Git diff. Split it by topic and keep each file short. Use HTML when the review is primarily read, navigated, compared, filtered, or summarized rather than edited as source.
- Treat 50 lines as a review tripwire, not an allowance. Keep Markdown shorter when it contains dense links, tables, nested lists, repeated checklist rows, or many headings. Split it or convert it as soon as finding one item requires repeated scrolling.
- Choose HTML from the start for a human review surface, dashboard, status board, comparison matrix, schedule, dense checklist, multi-column reference, or any document whose meaning benefits from cards, anchored navigation, sticky headings, side-by-side content, filtering, or compact visual hierarchy.
- Convert Markdown to HTML before it reaches 50 lines when layout would make it materially easier to read. Convert even a short file when repeated structures or a review workflow are awkward in linear prose.
- Do not convert a long agent-first note merely to hide length. Split it into focused Markdown owners when the content is still linear. HTML is for useful presentation, not a container for an oversized topic.
- HTML files are self-contained: inline CSS and JS, no external dependencies.
- Use Mermaid inside markdown whenever a diagram helps: timelines, flows, relationships, schedules. Do not create standalone `.mmd` files, since they cannot carry frontmatter and would be reduced to a description-less asset entry, invisible to selection. A diagram that outgrows Mermaid becomes an HTML page.
- Images (PNG, SVG, JPG) and PDFs belong in `Context/` too, placed in the topic folder they support. They carry no frontmatter, and the index lists every non-markup file by path without a description.

## Frontmatter

Every markdown and HTML file starts with the same contract. Markdown uses YAML frontmatter:

```yaml
---
name: <Title Case Document Name>
description: <one line saying what the file holds and when to read it>
date_created: YYYY-MM-DD
date_modified: YYYY-MM-DD
---
```

HTML has no native frontmatter, so the file starts with the identical block inside an HTML comment:

```html
<!--
name: <Title Case Document Name>
description: <one line saying what the file holds and when to read it>
date_created: YYYY-MM-DD
date_modified: YYYY-MM-DD
-->
```

Descriptions are written for a deciding agent: they state what the file holds and when to read it, on one line of at most 1024 characters, high-signal, never the content itself. A rule that lives only in a description is invisible once the file is opened, so descriptions select and bodies inform.

Keep frontmatter in sync: `name` matches the current document name, `description` matches the current purpose, `date_created` never changes, and `date_modified` updates with every content change.

## The Index

`Context/AGENTS.md` holds a managed block listing every file's name, path, modified date, and description, with assets listed by path. The block is generated, guard-delimited, idempotent, and never placed in the host repository's root `AGENTS.md`. Human content in `Context/AGENTS.md` outside the block is preserved.

Run the generator after any bulk change:

```bash
node <skill-root>/scripts/index.mjs <path-to-Context>
```

It regenerates the block and validates every markup file as it goes: frontmatter present and fully parseable, `name` and `description` set, description within its limits, and both dates real YYYY-MM-DD dates. Deprecated entries render under their own non-guidance heading. Files with broken frontmatter still appear in the index under an unindexed section so they surface instead of vanishing, and the run exits non-zero until they are fixed. The script refuses a target directory not named `Context` unless forced, so the block cannot land in a host repository's root `AGENTS.md` by accident.

## Splitting And Organization

- Prefer topic subdirectories for files. Root-level markups and assets are allowed but keep them few and overarching: a file earns the root by spanning the whole directory, like a status board or master summary, not by belonging to a topic that simply has no folder yet.
- One topic per file. Create a new file for each durable topic instead of appending to a large note.
- Split aggressively when a file covers areas that would naturally live apart, and combine when fragments describe one coherent topic.
- One owner per fact. Update the owning file and link to it instead of duplicating content that can drift.
- Move, rename, and recategorize whenever structure drifts. Prune stale or duplicated material instead of preserving it out of inertia, or move it to `Deprecated/` when it must be kept.

## Naming

- Title Case for folders and markup filenames. Capitalize principal words, lowercase articles and short prepositions unless first or last.
- Prefix time-anchored artifacts (meetings, snapshots, dated events) with `YYYY-MM-DD ` so they sort chronologically. Evergreen topic files take no date prefix.
- Keep names descriptive of content, never of temporary process.

## Validation

Before finishing any session that touched `Context/`:

- Run the generator (see The Index) and fix every error it reports.
- Confirm each edited file's frontmatter is in sync (see Frontmatter).
- Confirm nothing was duplicated that an existing file already owns.
