import { readdir, readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const ignored = new Set(['.git', 'node_modules', 'output', 'dist', 'coverage', '.local']);
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.filter(item => !ignored.has(item.name)).map(item => {
    const path = join(dir, item.name);
    return item.isDirectory() ? walk(path) : [path];
  }));
  return nested.flat();
}
const files = await walk(root);
const errors = [];
for (const file of files) {
  if (file.endsWith('.json')) {
    try { JSON.parse(await readFile(file, 'utf8')); }
    catch (error) { errors.push(`${file}: ${error.message}`); }
  }
  if (file.endsWith('.mjs')) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) errors.push(`${file}: ${result.stderr || result.error}`);
  }
  if (file.endsWith('.md')) {
    const source = await readFile(file, 'utf8');
    const links = [
      ...[...source.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)].map(match => match[1]),
      ...[...source.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]),
    ];
    for (const link of links) {
      if (/^(https?:|mailto:|data:|#)/.test(link)) continue;
      const path = decodeURIComponent(link.split('#')[0]);
      if (!path) continue;
      try { await access(resolve(dirname(file), path)); }
      catch { errors.push(`${file}: broken local link ${link}`); }
    }
  }
}
for (const path of ['assets/brand/logo-original.jpg', ...['01-hero','02-compute-flow','03-holder-access','04-manifesto'].map(name => `assets/banners/${name}.png`)]) {
  try { await access(join(root, path)); } catch { errors.push(`Missing asset: ${path}`); }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Repository checks passed: ${files.length} files; local links, JSON, JS syntax and brand assets verified.`);
}
