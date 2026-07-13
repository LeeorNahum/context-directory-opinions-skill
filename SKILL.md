---
name: "context-directory-opinions"
description: "Opinionated structure for a Context directory: the durable home for a project's plans, research, notes, schedules, program info, and shared memory as markup. Use when creating, saving, organizing, or reorganizing any durable documentation or planning material, when the user says to save, note, remember, capture, or document something for later (even vaguely), when adding plans, meeting notes, research, or reference material to a repository, or when reading or maintaining an existing Context directory and its index. Not for code documentation, READMEs, or comments that live with the source."
metadata:
  author: "Leeor Nahum"
  version: "2.0.0"
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

Markdown and HTML are interchangeable markup. Size and content decide which to use, and converting between them when splitting or combining is normal.

- A markdown file must stay concise, roughly 100 lines with less being better. The moment it outgrows a glance or needs visuals beyond an embedded image or Mermaid diagram, convert it to HTML.
- Choose HTML deliberately and often. A short markdown file at a glance equals a medium HTML page at a glance, so in a healthy Context directory roughly half the documents end up as HTML. Markdown wins for agent ingestion, and HTML wins the moment a human cannot comfortably read the markdown.
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

- Every file lives in a topic subdirectory. Keep the root of `Context/` free of loose files, with `AGENTS.md` as its only root-level file.
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
