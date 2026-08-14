import chalk from 'chalk';

let activeProgressBar = null;
let ciMode = false;
let dryRunMode = false;

function wrapLog(printFn) {
  if (activeProgressBar) activeProgressBar.clearForLog();
  printFn();
  if (activeProgressBar) activeProgressBar.restoreAfterLog();
}

export const logger = {
  setProgressBar: (pb) => { activeProgressBar = pb; },
  setCI: (val) => { ciMode = val; },
  setDryRun: (val) => { dryRunMode = val; },

  info: (msg) => {
    wrapLog(() => {
      if (ciMode) {
        console.log(`[INFO] ${msg}`);
      } else {
        const prefix = dryRunMode ? chalk.magenta('ℹ [DRY-RUN]') : chalk.blue('ℹ');
        console.log(prefix, msg);
      }
    });
  },

  success: (msg) => {
    wrapLog(() => {
      if (ciMode) {
        console.log(`[SUCCESS] ${msg}`);
      } else {
        console.log(chalk.green('✔'), msg);
      }
    });
  },

  warn: (msg) => {
    wrapLog(() => {
      if (ciMode) {
        console.warn(`[WARN] ${msg}`);
      } else {
        console.warn(chalk.yellow('⚠'), msg);
      }
    });
  },

  error: (msg) => {
    wrapLog(() => {
      if (ciMode) {
        console.error(`[ERROR] ${msg}`);
      } else {
        console.error(chalk.red('✖'), msg);
      }
    });
  },

  header: (msg) => {
    wrapLog(() => {
      if (ciMode) {
        console.log(`--- ${msg.toUpperCase()} ---`);
      } else {
        const line = chalk.cyan.bold('='.repeat(60));
        console.log(`\n${line}`);
        console.log(chalk.cyan.bold(`  ${msg}`));
        console.log(`${line}\n`);
      }
    });
  }
};
