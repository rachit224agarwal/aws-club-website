import path from 'path';
import chalk from 'chalk';
import { REPORT_FILE, CI_SUMMARY_FILE, IMAGES_DIR } from './constants.js';
import { formatBytes, atomicWriteFile, atomicWriteJson } from './image-utils.js';

export async function generateReports({
  startTime,
  results,
  failures,
  deletedFiles,
  updatedImports,
  dryRun = false,
  ci = false,
  staged = false,
  status = 'success'
}) {
  const durationMs = Date.now() - startTime;
  const totalDurationSec = (durationMs / 1000).toFixed(2);

  let convertedCount = 0;
  let skippedCount = 0;
  let uncompressedCount = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  const convertedItems = [];
  const allItems = [];

  for (const item of results) {
    if (!item) continue;
    const origSize = item.originalSize || 0;
    const optSize = item.optimizedSize || origSize;
    const saved = Math.max(0, origSize - optSize);
    const pct = origSize > 0 ? ((saved / origSize) * 100).toFixed(1) : '0.0';
    const relPath = item.inputPath ? path.relative(IMAGES_DIR, item.inputPath).replace(/\\/g, '/') : 'unknown';

    const entry = {
      file: relPath,
      status: item.status, // 'converted', 'skipped', or 'uncompressed_larger'
      originalSize: origSize,
      optimizedSize: optSize,
      savedBytes: saved,
      compressionRatio: `${pct}%`,
      width: item.width || 0,
      height: item.height || 0
    };

    allItems.push(entry);
    totalOriginalSize += origSize;
    totalOptimizedSize += optSize;

    if (item.status === 'converted') {
      convertedCount++;
      convertedItems.push(entry);
    } else if (item.status === 'skipped') {
      skippedCount++;
    } else if (item.status === 'uncompressed_larger') {
      uncompressedCount++;
    }
  }

  const failedCount = failures.length;
  const deletedCount = deletedFiles.length;
  const totalProcessed = allItems.length;
  const avgTimePerImage = totalProcessed > 0 ? Math.round(durationMs / totalProcessed) : 0;
  
  const totalSavedBytes = Math.max(0, totalOriginalSize - totalOptimizedSize);
  const overallCompressionPct = totalOriginalSize > 0 ? ((totalSavedBytes / totalOriginalSize) * 100).toFixed(2) : '0.00';

  // 1. Terminal CLI Display
  if (dryRun) {
    console.log('\n' + chalk.magenta.bold('='.repeat(62)));
    console.log(chalk.magenta.bold(`  DRY RUN SIMULATION RESULTS (${staged ? 'STAGED MODE' : 'FULL MODE'}) - No Files Written`));
    console.log(chalk.magenta.bold('='.repeat(62)));
    console.log(`📁 Files that would be CONVERTED:  ${chalk.green.bold(convertedCount)}`);
    console.log(`⏩ Files that would be SKIPPED:    ${chalk.blue.bold(skippedCount)} (Cache Hits)`);
    console.log(`🛡️ Files larger than original:     ${chalk.cyan.bold(uncompressedCount)} (Retained original)`);
    console.log(`🗑️ Files that would be DELETED:    ${chalk.red.bold(deletedCount)} (Orphans)`);
    console.log(`📝 Imports that would be UPDATED:  ${chalk.yellow.bold(updatedImports.replacedCount || 0)} files`);
    console.log(`💾 Expected Storage Savings:       ${chalk.green.bold(formatBytes(totalSavedBytes))}`);
    console.log(`📉 Expected Compression Ratio:     ${chalk.cyan.bold(overallCompressionPct + '%')}`);
    console.log(chalk.magenta.bold('='.repeat(62)) + '\n');
    return;
  }

  if (ci) {
    console.log(`[CI Optimization Status]: ${status.toUpperCase()} (${staged ? 'Staged' : 'Full'} Mode)`);
    console.log(`[CI Metrics]: Total=${totalProcessed}, Converted=${convertedCount}, SkippedCache=${skippedCount}, SkippedLarger=${uncompressedCount}, Deleted=${deletedCount}, Failed=${failedCount}`);
    console.log(`[CI Savings]: Saved=${formatBytes(totalSavedBytes)} (${overallCompressionPct}%), Duration=${totalDurationSec}s`);
  } else {
    console.log('\n' + chalk.cyan.bold('='.repeat(62)));
    console.log(chalk.cyan.bold(`  IMAGE OPTIMIZATION TIMING & METRICS (${staged ? 'STAGED MODE' : 'FULL MODE'})`));
    console.log(chalk.cyan.bold('='.repeat(62)));
    console.log(`⏱️ Total Execution Time:   ${chalk.white.bold(totalDurationSec + 's')} (${durationMs} ms)`);
    console.log(`⚡ Avg Time per Image:     ${chalk.white.bold(avgTimePerImage + ' ms')}`);
    console.log(`🔄 Converted Assets:       ${chalk.green.bold(convertedCount)} converted`);
    console.log(`⏩ Skipped (Cache Hits):   ${chalk.blue.bold(skippedCount)} unchanged`);
    console.log(`🛡️ Retained (Larger WebP): ${chalk.magenta.bold(uncompressedCount)} avoided recompression`);
    console.log(`🗑️ Deleted Orphaned:       ${chalk.yellow.bold(deletedCount)} cleaned`);
    console.log(`✖  Failed Conversions:     ${failedCount > 0 ? chalk.red.bold(failedCount) : chalk.green('0')}`);
    console.log(`📏 Total Original Size:    ${chalk.white(formatBytes(totalOriginalSize))}`);
    console.log(`📦 Total Optimized Size:   ${chalk.white(formatBytes(totalOptimizedSize))}`);
    console.log(`💰 Total Storage Saved:    ${chalk.green.bold(formatBytes(totalSavedBytes))}`);
    console.log(`📉 Compression Reduction:  ${chalk.cyan.bold(overallCompressionPct + '% reduction')}`);
    console.log(chalk.cyan.bold('='.repeat(62)) + '\n');
  }

  // 2. Generate machine-readable JSON summary artifact for all executions (CI and local)
  if (!dryRun) {
    const jsonSummary = {
      timestamp: new Date().toISOString(),
      status,
      mode: staged ? 'staged' : 'full',
      durationMs,
      statistics: {
        totalProcessed,
        converted: convertedCount,
        skippedCacheHits: skippedCount,
        uncompressedLargerThanOriginal: uncompressedCount,
        deletedOrphans: deletedCount,
        failed: failedCount,
        updatedImportsCount: updatedImports.replacedCount || 0
      },
      compression: {
        originalSizeBytes: totalOriginalSize,
        optimizedSizeBytes: totalOptimizedSize,
        savedBytes: totalSavedBytes,
        compressionRatioPercentage: parseFloat(overallCompressionPct)
      },
      failedFiles: failures.map(f => ({
        file: f.item ? path.relative(IMAGES_DIR, f.item).replace(/\\/g, '/') : 'unknown',
        error: f.error ? f.error.message : 'Unknown error'
      }))
    };
    await atomicWriteJson(CI_SUMMARY_FILE, jsonSummary, { spaces: 2 });
  }

  // 3. Generate structured Markdown artifact report for all successful executions
  if (!dryRun) {
    const topSaved = [...allItems].sort((a, b) => b.savedBytes - a.savedBytes).slice(0, 10);
    const topLargestRemaining = [...allItems].sort((a, b) => b.optimizedSize - a.optimizedSize).slice(0, 10);
    const skippedFiles = allItems.filter(i => i.status === 'skipped');
    const largerFiles = allItems.filter(i => i.status === 'uncompressed_larger');

    let md = `# Image Optimization & Compression Report\n\n`;
    md += `**Execution Timestamp:** \`${new Date().toLocaleString()}\`  \n`;
    md += `**Execution Mode:** \`${staged ? 'Staged Pre-Commit' : 'Full Workspace'}\`  \n`;
    md += `**Pipeline Status:** \`${status.toUpperCase()}\`  \n`;
    md += `**Total Duration:** \`${totalDurationSec} seconds\` (\`${avgTimePerImage} ms\` avg/image)\n\n`;

    md += `## 📊 Executive Summary\n\n`;
    md += `| Metric | Value |\n`;
    md += `| :--- | :--- |\n`;
    md += `| **Total Assets Analyzed** | **${totalProcessed}** |\n`;
    md += `| **Converted to WebP** | \`${convertedCount}\` |\n`;
    md += `| **Skipped (Cache Hits)** | \`${skippedCount}\` |\n`;
    md += `| **Retained Original (WebP Larger)** | \`${uncompressedCount}\` |\n`;
    md += `| **Deleted Orphaned Assets** | \`${deletedCount}\` |\n`;
    md += `| **Failed Conversions** | \`${failedCount}\` |\n`;
    md += `| **Code Imports Refactored** | \`${updatedImports.replacedCount || 0} files\` |\n`;
    md += `| **Total Original Size** | \`${formatBytes(totalOriginalSize)}\` |\n`;
    md += `| **Total Optimized Size** | \`${formatBytes(totalOptimizedSize)}\` |\n`;
    md += `| **Total Storage Saved** | **\`${formatBytes(totalSavedBytes)}\` (${overallCompressionPct}% savings)** |\n\n`;

    if (topSaved.length > 0 && convertedCount > 0) {
      md += `## 🏆 Top Optimized Assets (Highest Byte Savings)\n\n`;
      md += `| File Name | Dimensions | Original Size | Optimized Size | Storage Saved | Reduction |\n`;
      md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
      for (const item of topSaved) {
        if (item.savedBytes > 0) {
          md += `| \`${item.file}\` | ${item.width}x${item.height} | ${formatBytes(item.originalSize)} | ${formatBytes(item.optimizedSize)} | **${formatBytes(item.savedBytes)}** | **${item.compressionRatio}** |\n`;
        }
      }
      md += `\n`;
    }

    if (topLargestRemaining.length > 0) {
      md += `## 📦 Largest Remaining WebP Assets\n\n`;
      md += `| File Name | Dimensions | WebP Size | Original Size | Savings |\n`;
      md += `| :--- | :--- | :--- | :--- | :--- |\n`;
      for (const item of topLargestRemaining) {
        md += `| \`${item.file}\` | ${item.width}x${item.height} | **${formatBytes(item.optimizedSize)}** | ${formatBytes(item.originalSize)} | ${item.compressionRatio} |\n`;
      }
      md += `\n`;
    }

    if (largerFiles.length > 0) {
      md += `## 🛡️ Retained Originals (Avoided Recompression Bloat)\n\n`;
      for (const f of largerFiles) {
        md += `- \`${f.file}\` (${formatBytes(f.originalSize)})\n`;
      }
      md += `\n`;
    }

    if (failures.length > 0) {
      md += `## ✖ Failed Files\n\n`;
      for (const f of failures) {
        md += `- \`${f.item ? path.relative(IMAGES_DIR, f.item).replace(/\\/g, '/') : 'unknown'}\`: ${f.error ? f.error.message : 'Unknown error'}\n`;
      }
      md += `\n`;
    }

    if (skippedFiles.length > 0 && !staged) {
      md += `## ⏩ Skipped Files (${skippedFiles.length} cache hits)\n\n<details>\n<summary>Click to expand skipped cache hit list</summary>\n\n`;
      for (const s of skippedFiles) {
        md += `- \`${s.file}\` (${formatBytes(s.optimizedSize)})\n`;
      }
      md += `\n</details>\n`;
    }

    await atomicWriteFile(REPORT_FILE, md, 'utf8');
  }
}
