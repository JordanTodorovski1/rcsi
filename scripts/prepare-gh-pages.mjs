import fs from 'node:fs/promises';
import path from 'node:path';

const repoName = process.argv[2] || '';
const basePrefix = repoName ? `/${repoName.replace(/^\/+|\/+$/g, '')}/` : '/';

console.log(`Preparing build with base: "${basePrefix}"...`);

async function walkDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else if (entry.name.endsWith('.html')) {
      let content = await fs.readFile(fullPath, 'utf8');
      if (basePrefix !== '/') {
        // Add <base> tag right after <head>
        content = content.replace('<head>', `<head><base href="${basePrefix}">`);
        // Update root-relative asset paths to respect base
        content = content.replaceAll('href="/', `href="${basePrefix}`);
        content = content.replaceAll('src="/', `src="${basePrefix}`);
      }
      await fs.writeFile(fullPath, content);
    }
  }
}

// Update app.mjs fetch to respect base
const appPath = path.join('rcsi-redesign/dist/app.mjs');
try {
  let appCode = await fs.readFile(appPath, 'utf8');
  appCode = appCode.replace("fetch('/content.json')", "fetch(new URL('content.json', document.baseURI).href)");
  await fs.writeFile(appPath, appCode);
} catch (e) {}

console.log('GitHub Pages readiness complete.');
