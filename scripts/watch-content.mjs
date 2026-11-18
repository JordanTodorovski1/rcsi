import fs from 'node:fs';
import { exec } from 'node:child_process';

console.log('Следење на нови објави во content/articles...');
let debounceTimer;

fs.watch('content/articles', (eventType, filename) => {
  if (filename && filename.endsWith('.json')) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`\n[CMS] Забележана нова/изменета објава: ${filename}. Автоматско освежување на сајтот...`);
      exec('node build.mjs', (err, stdout, stderr) => {
        if (err) console.error('Грешка при build:', err);
        else console.log(stdout.trim());
      });
    }, 500);
  }
});
