import fs from 'node:fs/promises';
import path from 'node:path';

const repo = 'rcsi';
const base = `/${repo}/`;
console.log(`Building GitHub Pages export for repo: ${repo}...`);

// 1. Create docs folder by copying dist
await fs.rm('docs', { recursive: true, force: true });
await fs.cp('dist', 'docs', { recursive: true });

// 2. Walk docs and replace root paths with /rcsi/
async function processDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(full);
    } else if (entry.name.endsWith('.html')) {
      let html = await fs.readFile(full, 'utf8');
      // Replace href="/ and src="/ (avoiding protocol-relative //)
      html = html.replace(/href="\/(?!\/)/g, `href="${base}`);
      html = html.replace(/src="\/(?!\/)/g, `src="${base}`);
      html = html.replace(/data-image="\/(?!\/)/g, `data-image="${base}`);
      html = html.replace(/url\('\/(?!\/)/g, `url('${base}`);
      // Fix canonical and og URLs if needed
      html = html.replace('https://rcsi.mk/', `https://jordantodorovski1.github.io${base}`);
      await fs.writeFile(full, html);
    } else if (entry.name === 'content.json') {
      let json = await fs.readFile(full, 'utf8');
      json = json.replace(/"\/assets\//g, `"${base}assets/`);
      await fs.writeFile(full, json);
    }
  }
}

await processDir('docs');
// Add .nojekyll so GitHub Pages does not ignore files starting with _
await fs.writeFile('docs/.nojekyll', '');
console.log('GitHub Pages build created in docs/ with .nojekyll');
