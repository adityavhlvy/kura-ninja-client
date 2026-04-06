# Example: No Design System (Built From Scratch)

## Scenario

A developer shares a React app with scattered, hardcoded styles — no tokens, no consistent spacing, multiple font sizes for the same purpose. The skill audits the state of the UI and produces a prioritized remediation plan.

## Input

```
User: "I have a React app I've been building for months and the CSS is a mess —
I have 6 different shades of blue hardcoded, random spacing everywhere, and 3
different font sizes for body text. Can you audit my UI and tell me where to start?"

Files provided:
  - examples/no-design-system/styles.css
  - examples/no-design-system/App.jsx
```

## Expected Output

```
DESIGN SYSTEM AUDIT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Health Score: 28/100

🔴 CRITICAL — Must fix immediately
- Hardcoded colors (6 variants of blue): Creates maintenance debt and
  inconsistency → Define a primary color scale with 3–5 semantic tokens
- No spacing system: Margins/padding use arbitrary px values (7px, 13px, 22px)
  → Adopt an 8px base grid (8, 16, 24, 32, 48px...)
- 3 conflicting body font sizes (13px, 14px, 16px): Undermines readability
  → Standardize on 16px base with a named type scale

🟡 WARNING — Should fix soon
- No defined breakpoints: Layout uses ad-hoc media queries
  → Define 4 breakpoints (sm/md/lg/xl) as CSS variables

🟢 GOOD — Keep this
- Consistent use of Inter throughout the project
- Button hover states are implemented (though not standardized)

PRIORITY RECOMMENDATIONS:
1. Define color tokens (--color-primary-*, --color-neutral-*)
2. Establish spacing scale as CSS custom properties
3. Create a type scale with 5–6 named sizes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Do you agree with these findings?
Are there any brand constraints (specific colors, fonts) I should work within?
```

## Conversation Example

**User:** Ok yes this all looks right. Our brand color is #005FAD. No specific font constraints.

**Agent:**
Got it. Here's the proposed plan based on your brand blue (#005FAD):

**Color Tokens** — I'll generate a 5-step scale from your brand color:
```css
--color-primary-300: #5B9FD1;  /* light */
--color-primary-500: #005FAD;  /* default (brand) */
--color-primary-700: #004A87;  /* hover */
--color-primary-900: #00305A;  /* active */
```

**Spacing** — 8px base scale:
```css
--space-2: 8px; --space-4: 16px; --space-6: 24px; --space-8: 32px;
```

**Type Scale** — keeping Inter, standardizing sizes:
```css
--text-sm: 14px; --text-base: 16px; --text-lg: 18px; --text-xl: 20px;
```

Shall I generate the full `tokens.css` file and start with the button component?
