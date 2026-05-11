# Design Token Examples

Referensi ini berisi contoh output design tokens dalam berbagai format.
Gunakan sebagai acuan saat menghasilkan output di FASE 4 (Eksekusi).

---

## CSS Custom Properties (Direkomendasikan untuk Web)

```css
/* ===== COLOR TOKENS ===== */
:root {
  /* Primary */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6; /* default */
  --color-primary-600: #2563eb; /* hover */
  --color-primary-700: #1d4ed8; /* active */

  /* Neutral */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-500: #64748b;
  --color-neutral-900: #0f172a;

  /* Semantic */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Surface */
  --color-surface: var(--color-neutral-0);
  --color-surface-raised: var(--color-neutral-50);
  --color-surface-overlay: var(--color-neutral-100);
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-500);
  --color-text-disabled: var(--color-neutral-100);
}

/* ===== TYPOGRAPHY TOKENS ===== */
:root {
  /* Font Family */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Font Size (modular scale 1.25) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */

  /* Font Weight */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Height */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}

/* ===== SPACING TOKENS ===== */
:root {
  /* Base: 4px */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}

/* ===== BORDER RADIUS TOKENS ===== */
:root {
  --radius-sm: 0.25rem;   /* 4px */
  --radius-base: 0.5rem;  /* 8px */
  --radius-md: 0.75rem;   /* 12px */
  --radius-lg: 1rem;      /* 16px */
  --radius-xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;
}

/* ===== SHADOW TOKENS ===== */
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* ===== ANIMATION TOKENS ===== */
:root {
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-moderate: 300ms;
  --duration-slow: 500ms;

  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ===== BREAKPOINT REFERENCE (for media queries) ===== */
/*
  sm:  640px   - Landscape mobile
  md:  768px   - Tablet
  lg:  1024px  - Small desktop
  xl:  1280px  - Desktop
  2xl: 1536px  - Large desktop
*/
```

---

## JSON Format (Style Dictionary / Figma Tokens)

```json
{
  "color": {
    "primary": {
      "500": { "value": "#3b82f6", "type": "color" },
      "600": { "value": "#2563eb", "type": "color" }
    },
    "semantic": {
      "error": { "value": "{color.red.500}", "type": "color" },
      "success": { "value": "{color.green.500}", "type": "color" }
    }
  },
  "typography": {
    "heading": {
      "h1": {
        "fontSize": { "value": "{text.5xl}", "type": "fontSize" },
        "fontWeight": { "value": "{font.bold}", "type": "fontWeight" },
        "lineHeight": { "value": "{leading.tight}", "type": "lineHeight" }
      }
    }
  },
  "spacing": {
    "1": { "value": "4px", "type": "spacing" },
    "4": { "value": "16px", "type": "spacing" },
    "8": { "value": "32px", "type": "spacing" }
  }
}
```

---

## Contoh Komponen dengan Tokens (Button)

```css
/* Button Base */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-base);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
  transition: all var(--duration-normal) var(--ease-out);
  cursor: pointer;
  border: none;
}

/* Primary Variant */
.btn-primary {
  background-color: var(--color-primary-500);
  color: var(--color-neutral-0);
}
.btn-primary:hover {
  background-color: var(--color-primary-600);
  box-shadow: var(--shadow-md);
}
.btn-primary:active {
  background-color: var(--color-primary-700);
  transform: translateY(1px);
}
.btn-primary:disabled {
  background-color: var(--color-neutral-100);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

---

## Dark Mode dengan CSS Custom Properties

```css
:root {
  color-scheme: light dark;

  /* Light Mode (default) */
  --color-surface: #ffffff;
  --color-text-primary: #0f172a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #0f172a;
    --color-text-primary: #f8fafc;
  }
}

/* Manual toggle juga bekerja */
[data-theme="dark"] {
  --color-surface: #0f172a;
  --color-text-primary: #f8fafc;
}
```
