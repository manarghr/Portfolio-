# Manar Gherib — Portfolio Design System

A small component library for my portfolio. Style: **modern gradient** — rounded
cards, soft shadows, an indigo→violet→pink brand gradient.

## Structure

| Group       | Files |
|-------------|-------|
| Foundations | `foundations/colors.html`, `typography.html`, `spacing.html` |
| Core UI     | `components/button.html`, `badge.html`, `input.html`, `link.html` |
| Blocks      | `blocks/hero.html`, `project-card.html`, `skills.html`, `about.html`, `contact-form.html`, `footer.html` |
| Nav         | `nav/navbar.html` |

`styles/tokens.css` is the source of truth for design tokens. Each preview HTML is
self-contained (it inlines a copy of the relevant tokens) so it renders standalone
in the claude.ai Design System pane.

## Cards

Every preview's first line carries a `<!-- @dsCard group="…" name="…" -->` marker.
The Design System pane builds its card index from those markers.

## Sync

Kept in sync with a claude.ai/design project via `/design-sync` — incrementally,
one component at a time.
