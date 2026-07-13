# AGENTS.md

Rules for editing the **context-directory-opinions** skill. User-facing guidance lives in `SKILL.md`. `README.md` is the human skim layer.

## File roles

| File | Edited by | Role |
| --- | --- | --- |
| `SKILL.md` | Hand | The Context directory contract: formats, frontmatter, index, organization, naming |
| `scripts/index.mjs` | Hand | Regenerates the managed index block in a Context directory's AGENTS.md and validates frontmatter |
| `README.md` | Hand | Short human summary |

One owner per concern. The generated index block lives in each consuming project's `Context/AGENTS.md`, never in this repository.

## Editing

- Bump `metadata.version` with semver in the same change whenever authored behavior changes. Calibrate one honest bump per checkpoint.
- Quote every frontmatter string value. Keys stay unquoted.
- No em dashes, and no semicolons used to join what should be separate sentences. Use commas, periods, parentheses, or "to".
- Capitalized bullets and parallel list voice.
- Positive rules. Describe the category of mistake instead of preserving bad examples.
- Placeholders only. This meta skill must not name real projects, repos, or people beyond its own metadata.
- Keep `scripts/index.mjs` zero-dependency and runnable with plain `node`. Its output must stay idempotent, and human content outside the managed block is never touched.
- The guard comments and block format in `scripts/index.mjs` are a compatibility surface. Changing them orphans every existing generated block, so change them only with a major version bump and a migration note.

## History

Version 2.0.0 replaced the earlier planning-repository-opinions skill. The planning framing (a repository that IS the plan) generalized into the Context directory (a folder any repository can host), and plans became one kind of context among research, notes, schedules, and reference material.

## Before finishing

- `node scripts/index.mjs --help` and a run against a scratch Context directory both behave.
- Every support file named by `SKILL.md` exists and has a direct usage condition.
- Bullets stay capitalized, with no em dashes and no joiner semicolons introduced.
- `metadata.version` bumped if and only if authored behavior changed.
- `README.md` matches the actual file layout.
