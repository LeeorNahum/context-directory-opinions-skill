# planning-repository-opinions-skill

An opinionated skill for turning a folder into a durable planning repository: a `Docs/`-based active plan, Title Case naming, required markdown frontmatter, one topic per file, and disciplined maintenance that keeps the plan modular and free of drift.

## Layout

The opinions live in a single self-contained `SKILL.md`. `AGENTS.md` is the maintenance contract; `README.md` is this skim layer. The planning domain is small enough that it stays one file rather than splitting into references.

## Install

Add as a submodule into your agent's skills directory:

```bash
git submodule add https://github.com/LeeorNahum/planning-repository-opinions-skill.git .agents/skills/planning-repository-opinions-skill
```
