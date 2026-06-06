# AGENTS.md

Rules for editing the **planning-repository-opinions** skill. The opinions live entirely in `SKILL.md`. `README.md` is the human skim layer.

## Shape

This skill is intentionally a single self-contained `SKILL.md`. The planning domain is small enough that splitting into references would be bloat. Keep it one file unless the guidance genuinely outgrows that.

## Repository-Opinions Skill Layout

This skill belongs to the repository-opinions family. The shared layout for that family is:

- `SKILL.md` is the spine: a short thesis, the opinionated conventions and rules, and risky-change "Ask before" guidance where it applies.
- `references/*.md` hold one concept each when a skill's domain is large enough to warrant them. A small domain stays a single `SKILL.md`, as here.
- `assets/` hold copyable starters when useful.
- `AGENTS.md` is this maintenance contract.
- `README.md` is the human skim layer.

A repository-opinions skill is opinionated and explicit, names its defaults as swappable picks, uses placeholder project names, and keeps one owner per opinion.

## Editing

- Bump `metadata.version` with semver in the same change whenever behavior changes.
- Keep it a single file while the domain stays small. Promote to `references/` only if a section grows into its own concept.
- Encode a default only when backed by user preference or real usage. Do not invent opinions the skill never stated.
- **Opinionated and explicit.** State the preference clearly. This skill takes positions.
- **No project leakage.** Use placeholder topic and document names.
- **No em dashes.** Use commas, periods, parentheses, or "to".
- **Capitalized bullets.** Start every bullet with a capital letter.
- **Positive rules.** State the action to take, not the mistake to avoid.

Before finishing, confirm every bullet starts capitalized and `metadata.version` is bumped if behavior changed.
