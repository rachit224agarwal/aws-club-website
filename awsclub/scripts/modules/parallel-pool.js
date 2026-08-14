// High-Performance Concurrency Pool for Parallel Processing
// Bounded worker execution prevents excessive RAM and CPU spikes

export async function processConcurrently(items, concurrencyLimit, workerFn, onProgress) {
  let currentIndex = 0;
  const total = items.length;
  const results = new Array(total);
  const failures = [];

  const worker = async (workerId) => {
    while (currentIndex < total) {
      const index = currentIndex++;
      const item = items[index];
      try {
        const result = await workerFn(item, index, workerId);
        results[index] = result;
      } catch (err) {
        failures.push({ item, error: err, index });
        results[index] = null;
      } finally {
        if (onProgress) {
          onProgress(item, index + 1, total);
        }
      }
    }
  };

  const actualConcurrency = Math.max(1, Math.min(concurrencyLimit || 4, total));
  const workers = Array.from({ length: actualConcurrency }, (_, i) => worker(i));

  await Promise.all(workers);

  return { results, failures };
}
