import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

/**
 * SCORM 1.2 Manifest Plugin
 * After every build, rewrites dist/imsmanifest.xml with the complete
 * file list from the dist/ folder so the SCORM ZIP is fully compliant.
 */
function scormManifestPlugin() {
  return {
    name: 'scorm-manifest',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve('dist');
      const manifestSrc = path.resolve('public/imsmanifest.xml');
      const manifestDst = path.join(distDir, 'imsmanifest.xml');

      if (!fs.existsSync(manifestSrc)) {
        console.warn('[SCORM] imsmanifest.xml not found in public/ — skipping.');
        return;
      }

      // Collect all files recursively from dist/
      const collectFiles = (dir, base = '') => {
        const results = [];
        fs.readdirSync(dir).forEach(name => {
          if (name === 'imsmanifest.xml' || name.startsWith('.')) return;
          const full = path.join(dir, name);
          const rel = base ? `${base}/${name}` : name;
          if (fs.statSync(full).isDirectory()) {
            results.push(...collectFiles(full, rel));
          } else {
            results.push(rel);
          }
        });
        return results;
      };

      const files = collectFiles(distDir);
      const fileEntries = files
        .map(f => `            <file href="${f}" />`)
        .join('\n');

      let manifest = fs.readFileSync(manifestSrc, 'utf-8');

      // Replace only the SCO <resource identifier=...> inner file list
      // Note: must match `<resource ` (with space) to avoid matching `<resources>`
      manifest = manifest.replace(
        /(<resource identifier[^>]*>)([\s\S]*?)(<\/resource>)/,
        (_, open, _body, close) =>
          `${open}\n${fileEntries}\n        ${close}`
      );

      fs.writeFileSync(manifestDst, manifest, 'utf-8');
      console.log(`[SCORM] imsmanifest.xml written with ${files.length} files.`);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    scormManifestPlugin(),
  ],
  base: './', // Mandatory for SCORM 1.2 — all paths must be relative
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
