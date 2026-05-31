---
name: Tailwind v4 dark mode
description: How dark mode works in Tailwind v4 — @apply dark is invalid
---

In Tailwind v4, `dark` is a variant (defined via `@custom-variant dark (&:is(.dark *))`), not a utility class. You cannot `@apply dark` in CSS.

**Why:** Variants are selector modifiers, not utility classes. `@apply` only works with utilities.

**How to apply:**
- WRONG: `@apply bg-background text-foreground dark;`
- RIGHT: `@apply bg-background text-foreground;` (remove `dark` from @apply)
- To default to dark mode, add `class="dark"` to `<html>` in `index.html`, or toggle it via JS on `document.documentElement`.
- In this project (Aikya Sentinel), `:root` and `.dark` CSS blocks share the same values since it's always dark — so no class toggle is needed.
