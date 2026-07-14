# context-directory-opinions-skill

`context-directory-opinions` gives any project a `Context/` directory: the durable home for plans, research, notes, schedules, and shared memory as markup. An optional sibling `Temp-Context/` holds user dumps and short-lived staging. Agents prefer asking how to handle those files, then extract or move everything into `Context/` and remove the empty temp folder.

Every markdown and HTML file carries frontmatter with a description that says when to read it, and a generated index in `Context/AGENTS.md` catalogs everything, so agents load only what matches the task and files stay many, small, and organized. Markdown stays short and linear. HTML is chosen when a compact human review layout, navigation, comparison, or repeated structure materially improves readability.

The design deliberately mirrors how Agent Skills themselves work: each document's description is a trigger read in isolation, the index is the catalog, and loading is selective. That parallel is why splitting into many small files costs nothing here.

## Files

- `SKILL.md` contains the Context directory contract.
- `scripts/index.mjs` regenerates the managed index block and validates frontmatter, zero dependencies.
- `AGENTS.md` is the maintenance contract for editing this skill.

## Install

```bash
git submodule add https://github.com/LeeorNahum/context-directory-opinions-skill.git .agents/skills/context-directory-opinions
```
