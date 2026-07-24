# context-directory-opinions-skill

`context-directory-opinions` gives a project a living `Context/` directory for durable plans, research, decisions, state, opinions, and shared memory.

Markdown is the default for agent-facing and mixed-use knowledge. HTML is reserved for intentionally human-facing visual or interactive surfaces. Meaningful subdirectories are encouraged as a topic grows, and historical non-guidance lives under `Context/Archive/` outside the active index.

Every active Markdown and HTML file carries frontmatter with a selection description. `Context/AGENTS.md` provides a compact generated index, while `Temp-Context/` is optional staging that is drained and removed.

## Files

- `SKILL.md` contains the Context directory contract.
- `scripts/index.mjs` regenerates the active index and validates active frontmatter.
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
