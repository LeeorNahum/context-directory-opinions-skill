---
name: "planning-repository-opinions"
description: "Opinionated structure for planning repositories: turning a folder into a durable plan with a Docs-based active plan, Title Case naming, required markdown frontmatter, one topic per file, and disciplined maintenance. Use when creating or organizing a planning repository, writing or reorganizing planning docs, or keeping a plan modular and free of drift."
metadata:
  author: "Leeor Nahum"
  version: "1.0.0"
---

# Planning Repository Opinions

A planning repository holds durable thinking, notes, constraints, and context: the reasoning that does not belong inside a repo for finalized deliverables. It can live wherever a project keeps it. Keep it modular and freely reorganizable so the plan stays easy to resume as understanding improves.

## Repo Shape

```text
<planning-repo>/
├── AGENTS.md
├── README.md
├── Docs/
│   ├── <Topic>/
│   │   ├── <Document>.md
│   │   └── <Document>.md
│   ├── <Topic>/
│   │   └── <Document>.md
│   └── <Document>.md
└── Deprecated/          (optional; only when old material must be kept)
    ├── <Archived Topic>/
    │   ├── <Archived Document>.md
    │   └── <Archived Document>.md
    ├── <Archived Topic>/
    │   └── <Archived Document>.md
    └── <Archived Document>.md
```

`README.md` owns project purpose, strategy, scope, and human-readable context. `Docs/` holds the active plan. Topic folders under `Docs/` should be created, renamed, split, merged, or removed as the plan evolves.

Planning is encouraged to be broad. It can have many folders, subfolders, and markdown files when the project needs them. For non-trivial plans, default to topic folders under `Docs/` instead of loose top-level docs. The constraint is not the number of files; it is whether each file has a clear purpose, stays concise, and avoids duplicating facts that can drift.

## Docs Is The Active Plan

`Docs/` is the active plan. Do not add a wrapper folder inside it.

Do not put planning markdown in the repo root beyond `AGENTS.md` and `README.md`.

`Deprecated/` is a sibling of `Docs/`, not nested inside it. Add it only when superseded material must be preserved for reference. Treat `Deprecated/` as non-guidance and ignore it for implementation unless the user explicitly asks for historical context.

Create topic folders and subfolders that will have real files now, but do not treat the first folder layout as permanent. Planning should always be freely reorganized as understanding improves. Rename, split, merge, or remove folders as the plan evolves.

## Naming

Use [Title Case](https://en.wikipedia.org/wiki/Title_case) for planning folder and markdown filenames. Capitalize the principal words, including the first and last. Articles (`a`, `an`, `the`), short prepositions, and common conjunctions are lowercase unless first or last.

Do not use lowercase folder names, kebab-case filenames, or snake_case filenames unless an external tool requires it.

Keep folders and filenames descriptive rather than treating any initial category set as sacred.

## Frontmatter

Every planning markdown file starts with YAML frontmatter:

```yaml
---
name: <Title Case Document Name>
description: <one-line sentence describing the file>
date_created: YYYY-MM-DD
date_modified: YYYY-MM-DD
---
```

The `description` value is a single sentence on one line. Keep frontmatter in sync with the file:

- `name` matches the current document name
- `description` matches the current purpose of the file
- `date_created` stays fixed after the file is created
- `date_modified` updates whenever the file content changes

## One Topic Per File

Prefer more markdown files over fewer combined files.

For non-trivial planning repos, prefer `Docs/<Topic>/<Document>.md` over `Docs/<Document>.md`. Loose files directly under `Docs/` are acceptable only for tiny plans with one or two active documents, or for a temporary index that clearly earns its place.

- Create a new file when a topic is distinct enough to implement, review, or update on its own.
- Create a new file for a new durable topic instead of appending everything to one large note.
- Do not combine unrelated topics into one file just to reduce file count.
- Split when a file covers multiple implementation areas that would naturally live in different folders.
- Keep a file together only when the content is one coherent topic with no meaningful split point.
- Use descriptive file names that say what the file is about.

## Maintenance

- Keep documentation modular and purposeful.
- Move, rename, split, merge, and recategorize when structure drifts.
- Remove stale or duplicated facts instead of preserving them forever.
- Do not duplicate the same factual content in multiple files; update the owning file and link instead.

Avoid turning planning into a dumping ground. Modularity should make the project easier to resume, not harder to navigate. Clean or prune stale, redundant, or miscategorized notes instead of preserving them out of inertia.

## Planning AGENTS.md

For a non-trivial planning repo, add or update its `AGENTS.md`. It should explain how the repo is organized, which files own durable facts, and how future agents keep it clean and avoid duplication or knowledge drift as the project changes.
