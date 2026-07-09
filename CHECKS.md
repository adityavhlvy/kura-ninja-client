# Local Checks

Run these commands locally to verify code quality before pushing.

## Verification Commands

1. **Install Dependencies**
   ```bash
   bun install --frozen-lockfile
   ```

2. **Linting (ESLint)**
   ```bash
   bun run lint
   ```

3. **Format Check (Prettier)**
   ```bash
   bunx prettier --check "src/**/*.{ts,tsx,css}"
   ```

4. **Type Checking (TypeScript)**
   ```bash
   bun run typecheck
   ```

5. **Unused Code Check (Knip)**
   ```bash
   bun run knip
   ```

6. **Security Audit (Bun Audit)**
   ```bash
   bun audit
   ```

7. **Build Compilation**
   ```bash
   bun run build
   ```
