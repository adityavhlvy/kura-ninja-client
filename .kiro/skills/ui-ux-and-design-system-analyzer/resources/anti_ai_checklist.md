# Anti-AI UI Checklist
# The "No-AI-Slop" Design Audit — 2026 Edition

Use this checklist to identify and eliminate patterns that make a UI look AI-generated.
Rate each item: ✅ Human-intentional | ⚠️ Generic/safe | ❌ AI-slop fingerprint

---

## 🎨 COLOR — Fingerprint #1: The Purple Gradient Syndrome

- [ ] **No purple-dominant hero** — Purple-on-white with a gradient hero is the #1 AI UI fingerprint. If present, flag immediately.
- [ ] **One accent, four neutrals** — The palette should follow roughly this ratio. A rainbow of accent colors = AI default.
- [ ] **Neutrals have temperature** — Warm neutrals (slight yellow/beige) vs cold grays. Generic slate/gray with no temperature = AI output.
- [ ] **Colors are named, not indexed** — `--color-rust` not `--color-orange-500`. Specific names signal intentionality.
- [ ] **No "safe" primary** — Pure blue (#3B82F6), pure green (#10B981), or pure indigo (#6366F1) primary colors are AI defaults. The palette should feel curated.
- [ ] **Background has subtle character** — Pure white (#FFFFFF) or pure dark (#0F172A) backgrounds with no personality = AI. Slightly warm/cool off-white or dark tones signal human choice.

**Anti-AI Fixes:**
- Replace purple gradient hero → single strong, specific accent color (e.g., #E24B4A rust, #1D6748 forest, #C87533 amber)
- Replace blue/indigo primary → domain-appropriate accent with a distinct personality
- Add warmth or coolness to neutrals: `#F1EFE8` instead of `#F8F9FA`

---

## 🔤 TYPOGRAPHY — Fingerprint #2: Inter Dependency

- [ ] **Not using Inter as the only font** — Inter, Space Grotesk, and DM Sans are the "Comic Sans of 2026." Flag if used without a deliberate counterpart.
- [ ] **Display font has character** — Heading font should have a point of view (serif personality, editorial weight, historical character). Examples: Fraunces, Neue Haas Grotesk, Söhne, Editorial New, Satoshi, Gambarino.
- [ ] **Body font is intentionally quiet** — Not competing with the display. One distinctive display + one quiet body = human design.
- [ ] **Not using two neutral fonts** — The combination of two "safe" grotesks (e.g., Inter + DM Sans) signals no typographic opinion.
- [ ] **Letter-spacing is opinionated** — Headings with negative tracking (`-0.02em` to `-0.04em`) vs. small caps with positive tracking. Not uniform `0` across all sizes.
- [ ] **Type scale breaks are intentional** — Not equal-step progression (12/14/16/18/20). Real scales have jumps: `13/15/22/32/52px`.

**Anti-AI Fixes:**
- Pair a distinctive serif or display typeface with a minimal sans for body
- Apply tight negative letter-spacing to display sizes (`letter-spacing: -0.03em`)
- Avoid "neutral" pairings — at least one typeface must have personality

---

## 📐 SPACING — Fingerprint #3: The Even-Everything Grid

- [ ] **Spacing uses contrast, not uniformity** — AI defaults to 16px gaps everywhere. Look for intentional clustering: tight groups next to generous open space.
- [ ] **Whitespace is opinionated** — Some elements breathe generously, others cluster tightly. Not every component has the same padding.
- [ ] **Not every gap is 16px or 24px** — If all spacing values are 16px/24px/32px, it signals AI automation. Real designs have 10px, 14px, 40px, 56px as deliberate choices.
- [ ] **Section breaks use contrast** — Large gaps between sections (80px+) vs tight internal spacing creates rhythm. Flat equal spacing = AI.

**Anti-AI Fixes:**
- Create deliberate spacing contrast: `8px` internal padding, `64px` section breaks
- Introduce some "tight" moments: elements that feel slightly compressed on purpose
- Avoid padding: `1rem` everywhere — vary the rhythm

---

## 🏗️ LAYOUT — Fingerprint #4: The Perfect Grid Prison

- [ ] **At least one deliberate grid break** — An overlapping element, a hanging element, an off-center layout moment, or a bleeding image. Strict 12-column prison = AI.
- [ ] **Not all cards are the same size** — Uniform card grids (3-column icon + title + body) are the hero section AI loves. Mix sizes deliberately.
- [ ] **Asymmetry is present** — Strict symmetry across the horizontal axis = AI default. One asymmetric layout moment signals human creative choice.
- [ ] **Content dictates layout, not the template** — If the layout could swap any content and still look "right," it's too generic.

**Anti-AI Fixes:**
- Add one element that bleeds past its container, overlaps, or rotates
- Break the 3-column feature grid — replace with one outcome-led section
- Give one section a deliberately unexpected width or alignment

---

## ✍️ COPY — Fingerprint #5: The AI Pitch Deck Voice

- [ ] **No "seamless," "cutting-edge," "empower," "revolutionize"** — These words are AI copy fingerprints. Flag every instance.
- [ ] **Hero doesn't open with features** — "Experience seamless collaboration..." = AI slop. Human copy leads with outcome or feeling.
- [ ] **Not a 3-6 item feature list as the first section** — The icon grid (Feature 1, Feature 2, Feature 3...) below the hero = AI structure.
- [ ] **Copy has a specific voice** — Not trying to sound "professional." Has wit, specificity, or an unexpected angle.
- [ ] **CTA is specific, not generic** — "Get started" and "Try for free" are AI defaults. Specific: "See it live," "Start your first analysis," "Build with us."

**Anti-AI Fixes:**
- Replace hero with one specific, human-sounding outcome: *"Your team's work, in one place. No herding cats required."*
- Remove or demote the feature icon grid from above the fold
- Rewrite CTAs with action-specific language tied to the product's unique value

---

## 🎬 MOTION — Fingerprint #6: Everything Fades In

- [ ] **Not every element animates on scroll** — If every card, heading, and paragraph fades/slides in = AI motion design. Maximum 1-2 significant transitions per page.
- [ ] **Motion is purposeful, not decorative** — Each animation communicates something: state change, hierarchy, causality. Not just "it looks fancy."
- [ ] **No entrance animation overload** — Elements that were never off-screen shouldn't animate in. Animation should mark a real transition.
- [ ] **Easing is deliberate** — Not `ease-in-out` on everything. Fast-in, slow-out for elements entering; fast-out for elements leaving.

**Anti-AI Fixes:**
- Remove all scroll-triggered animations except one meaningful one
- Keep micro-interactions (button hover, focus ring) but eliminate decorative entrances
- Use `transition: border-color 0.2s` instead of `animation: fadeSlideIn 0.6s`

---

## 🧠 DESIGN PHILOSOPHY — Fingerprint #7: Design-by-Committee Averaging

- [ ] **Has a point of view** — The design takes a clear stance: brutally minimal, or unapologetically loud. Warm or cold. Structured or chaotic. It doesn't try to please everyone.
- [ ] **Isn't "a little bit of everything"** — A little dark mode + a little playful + a little serious + a little minimal = AI averaging all training data. Commit to a direction.
- [ ] **Pushed past comfort, then pulled back one step** — The tension between "too much" and "almost too much" is where personality lives.
- [ ] **Decisions feel deliberate** — Every choice (color, font, layout break) should be explainable: "We did this because..."

**Anti-AI Fixes:**
- Define a 1-sentence design direction: *"Minimal and cold. Like a Bloomberg terminal, but for architects."*
- Kill anything that softens the direction "just in case" — that's averaging
- Add one uncomfortable but intentional choice and commit to it

---

## 🔍 OVERALL AI-SLOP SCORE

After completing the checklist, calculate the Anti-AI Score:

| Category | Weight | Score (0-100) |
|---|---|---|
| Color (no AI palette fingerprints) | 20% | |
| Typography (distinctive fonts) | 20% | |
| Spacing (deliberate contrast) | 15% | |
| Layout (one grid break) | 15% | |
| Copy (human voice) | 15% | |
| Motion (restraint + purpose) | 10% | |
| Design POV (committed direction) | 5% | |

**Anti-AI Score = Weighted Average**
- **80–100**: Feels decisively human-designed
- **60–79**: Mostly human, a few safe/generic choices
- **40–59**: Generic but functional — noticeable AI fingerprints
- **Below 40**: AI slop — looks machine-averaged, needs significant rethinking

---

## Key Principle

> "The real secret: make decisions a model wouldn't dare make."

AI plays it safe. It averages. It picks the purple gradient because it's been trained on purple gradients that "look like tech." It uses Inter because everyone uses Inter. It builds the 3-column feature grid because that's the template.

**Human design makes uncomfortable, specific, committed choices.** The goal of this audit is to find where safety replaced opinion — and replace safety with intent.
