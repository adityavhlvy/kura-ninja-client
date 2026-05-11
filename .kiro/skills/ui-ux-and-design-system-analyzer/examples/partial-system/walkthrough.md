# Example: Partial Design System (Gap Analysis & Completion)

## Scenario

A team has started a design system — colors are tokenized, but spacing is inconsistent and the button component is missing critical interactive states. The skill identifies what's done well, flags the gaps, and proposes a targeted plan to complete the system.

## Input

```
User: "We have a partial design system — colors are done but spacing is
inconsistent and our button component is missing hover and disabled states.
Please audit what we have and propose a plan to finish the system."

Files provided:
  - examples/partial-system/tokens.css
  - examples/partial-system/Button.jsx
```

## Expected Output

```
DESIGN SYSTEM AUDIT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Health Score: 61/100

🔴 CRITICAL — Must fix immediately
- Button missing hover, disabled, and focus states: Interactive components
  without complete states create confusing and inaccessible UX
  → Add all 5 states: default, hover, active, focus-visible, disabled

🟡 WARNING — Should fix soon
- Spacing inconsistent outside of components: Some sections use token values,
  others use hardcoded px → Enforce token-only spacing via linting or code review

🟢 GOOD — Keep this
- Color tokens are well-structured with semantic naming (--color-primary,
  --color-surface, --color-error, etc.)
- Dark mode overrides are implemented via [data-theme="dark"]
- Typography scale is defined and consistent

PRIORITY RECOMMENDATIONS:
1. Complete the Button component with all interactive states
2. Audit remaining layout sections for hardcoded spacing values
3. Add focus-visible styles globally

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Do you agree with these findings?
Which component should we tackle after Button — forms, cards, or navigation?
```

## Conversation Example

**User:** Yes, let's fix the button first. We use Tailwind so CSS-in-JS isn't needed.

**Agent:**
Here's a before/after for `Button.jsx` using only Tailwind classes and your existing tokens:

**Before** (missing states):
```jsx
<button className="bg-primary-500 text-white px-4 py-2 rounded">
  {children}
</button>
```

**After** (complete states):
```jsx
<button
  className="
    bg-primary-500 text-white px-4 py-2 rounded
    hover:bg-primary-600 hover:shadow-md
    active:bg-primary-700 active:translate-y-px
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2
    disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed
    transition-all duration-200 ease-out
  "
  disabled={disabled}
>
  {children}
</button>
```

Does this match your project's Tailwind config token names? I'll adjust the class names if your tokens use different names.
