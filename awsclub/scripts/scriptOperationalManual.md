# Image Optimization Pipeline Operational Manual

This manual describes the automated image optimization and code refactoring system. The pipeline converts source images (PNG, JPG, JPEG) to compressed WebP files, updates code import statements via Abstract Syntax Tree (AST) parsing, and utilizes multi-parameter caching to ensure fast execution.

---

## Index

1. [Overview and Core Capabilities](#1-overview-and-core-capabilities)
2. [Commands and Usage](#2-commands-and-usage)
3. [Directory Structure](#3-directory-structure)
4. [Git Automation Hooks](#4-git-automation-hooks)
5. [Generated Reports](#5-generated-reports)

---

## 1. Overview and Core Capabilities

The script operates as a high-performance asset optimization engine built for speed, safety, and reliability.

- **Bounded Concurrency:** Executes across an asynchronous worker pool (default 6 workers) with strict memory clamping and isolated error handling.
- **Multi-Parameter Caching:** Uses SHA-256 asset hashes combined with image dimensions, quality settings, and script versioning (`v2.1.0`) to skip unchanged files instantly.
- **AST Import Refactoring:** Uses `@babel/parser` and `@babel/traverse` to update static imports, dynamic `import()`, `require()`, and Vite asset URLs cleanly without altering comments or strings.
- **Atomic File Operations:** Employs temporary lock files, exponential backoff retries, and atomic renames to prevent corruption during concurrent filesystem access.
- **Bloat Protection:** Preserves transparency, strips unnecessary EXIF metadata, and rejects WebP output if the converted file size exceeds the original asset size.
- **Graceful Termination:** Captures process signals (`SIGINT`, `SIGTERM`) to cleanly shutdown workers and purge temporary files before exiting.

---

## 2. Commands and Usage

Execute these commands from the workspace root directory.

| Command | Action | Recommended Use Case |
| :--- | :--- | :--- |
| `npm run images:optimize` | Runs full workspace optimization, converts assets, updates imports, and verifies build integrity. | Manual cleanups or pre-deployment checks |
| `npm run images:staged` | Fast optimization mode targeting only staged additions or edits (`git diff --cached`). | Git pre-commit workflow |
| `npm run images:verify` | Checks that all imported WebP assets physically exist on disk without converting images. | Continuous integration assertions |
| `node scripts/optimize-images.js --dry-run` | Simulates pipeline execution and prints estimated savings without modifying files. | Testing configuration changes |
| `node scripts/optimize-images.js --ci` | Runs in CI mode with structured logging and machine-readable JSON status summaries. | Automated deployment pipelines |

---

## 3. Directory Structure

All settings are controlled centrally via `image.config.js` at the workspace root, while logic resides inside `scripts/`.

| File / Folder | Purpose |
| :--- | :--- |
| `image.config.js` | Central configuration for dimensions, worker concurrency, quality, and compression |
| `scripts/optimize-images.js` | Primary CLI orchestrator and execution entry point |
| `scripts/modules/convert-images.js` | Sharp image compression encoder with atomic file guarantees |
| `scripts/modules/image-cache.js` | SHA-256 hash persistence and cache validation manager |
| `scripts/modules/image-utils.js` | Atomic file writers, exponential retries, and temporary lock registry |
| `scripts/modules/image-validator.js` | Asset file formatting and structure verification |
| `scripts/modules/parallel-pool.js` | Bounded asynchronous concurrency worker pool |
| `scripts/modules/replace-imports.js` | Babel AST parser for JSX, TSX, JS, and TS import refactoring |
| `scripts/modules/resize-images.js` | Asset resolution scaling and responsive rules engine |
| `scripts/modules/verify-images.js` | Pre-deployment physical asset presence verification |
| `scripts/modules/cleanup-images.js` | Orphaned WebP asset garbage collector |

---

## 4. Git Automation Hooks

The optimization system integrates directly into Husky Git hooks to maintain asset efficiency automatically.

- **Pre-Commit Hook:** Executes `npm run images:staged` followed by code linting. Instantly optimizes staged raw images before the Git commit completes.
- **Pre-Push Hook:** Executes `npm run images:optimize` to assert that all assets are valid and compilation succeeds before code is pushed to remote branches.

---

## 5. Generated Reports

Upon successful execution, the orchestrator outputs two report artifacts in the root directory:

- `image-conversion-report.md`: Human-readable markdown log displaying total bytes reduced, compression ratios, converted item tables, and cached skip lists.
- `image-optimization-summary.json`: Structured machine-readable metrics report containing timestamps, execution timing, error arrays, and pipeline configuration state.
