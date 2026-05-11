---
name: portfolio-project-analyzer
description: Analyze a project's codebase and README to generate a high-quality, honest portfolio description in JSON and Markdown. This skill MUST be used whenever the user wants to add a project to their portfolio, needs to verify if their documentation matches their code, or asks for an honest technical summary of their work. It is particularly effective for catching out-of-sync README files and generating structured JSON data for portfolio websites.
---

# Portfolio Project Analyzer

This skill ensures your portfolio descriptions are accurate, technical, and honest. It performs a deep dive into the code and compares it with existing documentation to find discrepancies.

## Core Capabilities

1. **Codebase Analysis**: Identify core features, stack, and complex logic by actually reading the files.
2. **Cross-Verification**: Compare the code reality with the `README.md` claims.
3. **Honest Synthesis**: Generate descriptions that avoid hyperbole, focusing on what was actually built.
4. **Structured Output**: Produce results ready for inclusion in a web portfolio JSON file.

## Step-by-Step Workflow

### 1. Project Discovery
Locate the project root and look for:
- `README.md` or other documentation.
- Project metadata (`package.json`, `go.mod`, `requirements.txt`, etc.).
- Source directories (`src/`, `cmd/`, `lib/`).

### 2. Forensic Analysis (Deep Dive)
Analyze the code to extract:
- **Major Features**: What can the user actually DO with this code?
- **Technical Stack**: Which libraries and frameworks are being utilized (not just listed, but used)?
- **Technical Challenges**: Identify the most complex parts (e.g., recursive logic, complex state management, API integrations, performance bottlenecks).
- **Rationale & Deliverables**: Infer *why* this was built (e.g., personal need, educational) and what the final *outcomes* are.
- **Architectural Patterns**: Identify patterns (e.g., Singleton, Observer, MVC) and design choices.

### 3. Cross-Verification
Compare your analysis with any existing `README.md`.
- **Identify Gaps**: Features mentioned in README but missing in code.
- **Identify Ghost Features**: Features in code not mentioned in README.
- **Identify Inaccuracies**: README claims that are technically incorrect or outdated.

### 4. Generation (Honesty & Depth)
Generate the project information using the following principles:
- **No Fluff**: Avoid hyperbolic language. Speak with technical precision.
- **Category Match**: Automatically assign to `Frontend`, `Backend`, `Fullstack`, etc., based on codebase characteristics.
- **Competency Mapping**: Map specific implementations to professional skills (e.g., "OAuth Integration" -> "Security").
- **Visual Suggestions**: Pinpoint specific code blocks or directories that would make a strong visual impact in a portfolio.
- **Readiness Score**: Quantify the project's health (Tests, Docs, Code Quality 1-100).
- **Structured**: Output both a JSON object and a Markdown summary.

## Output Formats

### JSON (For Portfolio Web)
Follow the [schema.json](file:///c:/KuraNinjaWeb/prompt-market/productivity/portfolio-project-analyzer/resources/schema.json).

### Markdown (For Quick Reference)
# [Project Title] ([Category])
[Honest, 2-3 sentence description]

**Rationale**: [Why this project?]
**Stack**: [Tech 1], [Tech 2]
**Competencies**: [Skill A], [Skill B]

- [Verified Feature 1]
- [Verified Feature 2]

---
**Technical Challenges**: [Describe 1-2 hurdles and solutions]
**Readiness**: 🏗️ Tests: [X]%, 📝 Docs: [X]%, 💎 Quality: [X]%
**Visual Suggestions**: [Where to screenshot]

## When to Flag Sync Issues
If the project is **"out-of-sync"**, ALWAYS provide a specific "Documentation Update" suggestion at the end of your response, clearly stating what lines or sections of the README should be updated to reflect the current state of the code.
