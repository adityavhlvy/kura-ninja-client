# Example: Accessibility Check (WCAG Contrast Audit)

## Scenario

A user wants to verify whether their designer's chosen color combinations meet WCAG AA accessibility standards, without a full design system audit. The skill calculates contrast ratios and gives pass/fail verdicts with alternatives where needed.

## Input

```
User: "My designer picked this color scheme: white text (#ffffff) on medium blue
(#4a90e2) for body copy, and light gray (#f0f0f0) text on white (#ffffff) for
secondary labels. Does this pass accessibility standards?"
```

## Expected Output

```
Checking 2 color pairs against WCAG AA & AAA thresholds:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pair 1 — Body copy: #ffffff on #4a90e2
  Contrast Ratio: 3.00:1

  WCAG AA  — Normal text (4.5:1): ❌ Fail
  WCAG AA  — Large text  (3.0:1): ✅ Pass (just barely)
  WCAG AAA — Normal text (7.0:1): ❌ Fail
  WCAG AAA — Large text  (4.5:1): ❌ Fail

⚠️  This fails for normal body text. Large text (18pt+ or 14pt bold) passes AA,
but body copy at standard sizes does not. Use this combination only for large
display text or decorative elements, not for readable body content.

  ✅ Suggested fix: Darken the blue to #2d6db5 (ratio: 4.61:1 — passes AA)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pair 2 — Secondary labels: #f0f0f0 on #ffffff
  Contrast Ratio: 1.20:1

  WCAG AA  — Normal text (4.5:1): ❌ Fail
  WCAG AA  — Large text  (3.0:1): ❌ Fail
  WCAG AAA — Normal text (7.0:1): ❌ Fail
  WCAG AAA — Large text  (4.5:1): ❌ Fail

❌ This fails all thresholds. Light gray on white is nearly invisible and should
not be used for any text content.

  ✅ Suggested fix: Use #767676 on #ffffff (ratio: 4.54:1 — passes AA)
     Or #6B7280 if you prefer a slightly warmer neutral.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Summary: 0/2 pairs pass WCAG AA for normal text.

Would you like me to run the contrast_checker.py script with your full color
palette to catch any other problem pairs?
```

## Conversation Example

**User:** Oh wow, I didn't realize #f0f0f0 on white was that bad. Can you check the whole palette?

**Agent:**
Sure — share your palette as a list of hex values or a CSS/JSON file and I'll run a full matrix check. I'll also flag which combinations are safe vs. unsafe for body text vs. large text, so your designer has a clear reference.

Alternatively, I can run `contrast_checker.py --batch` with a pairs file if you want a machine-readable output for your CI pipeline.
