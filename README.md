# context-directory-opinions-skill

`context-directory-opinions` gives any project a living `Context/` directory for durable plans, research, notes, schedules, decisions, and shared memory as markup. Its organization stays malleable and changes as the project changes rather than following one prescribed folder tree.

Every Markdown and HTML file carries frontmatter with a description that says when to read it. A generated index in `Context/AGENTS.md` catalogs the directory so agents load only what matches the task. Rare structural rules that truly need to remain stable may also live outside the generated block, and regeneration preserves them.

An optional sibling `Temp-Context/` holds user dumps and temporary organizing state. Agents drain it into `Context/` and remove the empty staging folder.

## Files

- `SKILL.md` contains the Context directory contract.
- `scripts/index.mjs` regenerates the managed index block and validates frontmatter with zero dependencies.
- `AGENTS.md` is the maintenance contract for editing this skill.

## Validation

```bash
node --check scripts/index.mjs
node scripts/index.mjs --help
```

## Install

```bash
git submodule add https://github.com/LeeorNahum/context-directory-opinions-skill.git .agents/skills/context-directory-opinions
```
