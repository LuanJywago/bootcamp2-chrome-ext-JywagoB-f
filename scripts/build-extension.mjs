import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.join(__dirname, '..', 'dist');

// Remove build antigo
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);

// Copia arquivos principais
for (const f of ['manifest.json']) {
  fs.copyFileSync(path.join(__dirname, '..', f), path.join(dist, f));
}

// Copia pastas importantes
fs.cpSync(path.join(__dirname, '..', 'src'), path.join(dist, 'src'), { recursive: true });
fs.cpSync(path.join(__dirname, '..', 'icons'), path.join(dist, 'icons'), { recursive: true });

// Gera ZIP (dist/extension.zip)
const output = fs.createWriteStream(path.join(dist, 'extension.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });
archive.directory(dist, false);
archive.pipe(output);
await archive.finalize();

console.log('✅ Build gerado com sucesso em dist/ e dist/extension.zip');
