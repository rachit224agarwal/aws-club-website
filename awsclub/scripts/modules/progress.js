import readline from 'readline';
import chalk from 'chalk';
import path from 'path';
import { CONFIG } from './constants.js';

export class ProgressBar {
  constructor({ total = 0, ci = false, dryRun = false } = {}) {
    this.total = total;
    this.current = 0;
    this.startTime = Date.now();
    this.ci = ci;
    this.dryRun = dryRun;
    this.active = false;
    this.barLength = 24;
    this.lastFile = '';
  }

  start() {
    if (!CONFIG.logging.showProgressBar || this.total === 0) return;
    this.active = true;
    this.startTime = Date.now();
    this.render();
  }

  update(current, currentFile = '') {
    if (!this.active) return;
    this.current = Math.min(current, this.total);
    if (currentFile) this.lastFile = currentFile;
    this.render();
  }

  increment(currentFile = '') {
    if (!this.active) return;
    this.current = Math.min(this.current + 1, this.total);
    if (currentFile) this.lastFile = currentFile;
    this.render();
  }

  stop() {
    if (!this.active) return;
    this.active = false;
    if (!this.ci && process.stdout.isTTY) {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
    }
  }

  render() {
    if (!this.active || this.total === 0) return;

    // In CI environments or non-TTY pipes, avoid spamming stdout with ANSI control characters
    if (this.ci || !process.stdout.isTTY) {
      if (this.current % Math.max(1, Math.floor(this.total / 4)) === 0 || this.current === this.total) {
        const pct = Math.floor((this.current / this.total) * 100);
        console.log(`[Progress] ${pct}% (${this.current}/${this.total}) - Latest: ${path.basename(this.lastFile)}`);
      }
      return;
    }

    const ratio = Math.min(this.current / this.total, 1);
    const percent = Math.floor(ratio * 100).toString().padStart(3, ' ');
    const filled = Math.floor(ratio * this.barLength);
    const empty = this.barLength - filled;

    const bar = '█'.repeat(filled) + '░'.repeat(empty);

    const elapsed = (Date.now() - this.startTime) / 1000;
    const rate = this.current / (elapsed || 0.001);
    const remaining = this.total - this.current;
    const etaSecs = rate > 0 && remaining > 0 ? Math.round(remaining / rate) : 0;

    const etaStr = etaSecs >= 60 
      ? `${Math.floor(etaSecs / 60)}m ${etaSecs % 60}s` 
      : `${etaSecs}s`;

    const shortFile = this.lastFile ? path.basename(this.lastFile) : 'Scanning...';
    const displayFile = shortFile.length > 22 ? shortFile.substring(0, 19) + '...' : shortFile.padEnd(22);
    const prefix = this.dryRun ? chalk.magenta('Dry-Run:') : chalk.cyan('Progress:');

    const line = `${prefix} [${chalk.green(bar)}] ${chalk.bold(percent + '%')} | ${this.current.toString().padStart(this.total.toString().length)}/${this.total} | ${chalk.yellow(displayFile)} | ETA: ${chalk.cyan(etaStr.padEnd(6))}`;

    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(line);
  }

  clearForLog() {
    if (this.active && !this.ci && process.stdout.isTTY) {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
    }
  }

  restoreAfterLog() {
    if (this.active && !this.ci && process.stdout.isTTY) {
      this.render();
    }
  }
}
