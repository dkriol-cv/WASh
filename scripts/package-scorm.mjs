#!/usr/bin/env node
/**
 * package-scorm.mjs
 * Creates a SCORM 1.2 compliant ZIP from the already-built dist/ folder.
 *
 * Usage: npm run package:scorm   (runs build first, then this)
 *
 * Output: escola-amiga-wash-scorm.zip  (ready to upload to Moodle)
 */

import { existsSync, rmSync, statSync, readdirSync, createWriteStream } from 'fs';
import { resolve, join, relative } from 'path';
import { execFileSync } from 'child_process';

// Use cwd (where npm run is executed) as project root
const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const OUT_ZIP = join(ROOT, 'escola-amiga-wash-scorm.zip');

// 1 — Verify dist exists
if (!existsSync(resolve(DIST, 'index.html'))) {
  console.error('❌  dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}

// 2 — Clean previous package
if (existsSync(OUT_ZIP)) {
  rmSync(OUT_ZIP);
  console.log('🗑  Removed old package.');
}

// 3 — ZIP using system zip (macOS/Linux)
console.log('\n🗜  Creating SCORM ZIP...');
try {
  execFileSync('zip', ['-r', OUT_ZIP, '.', '-x', '*.DS_Store', '-x', '__MACOSX/*'], {
    cwd: DIST,
    stdio: 'inherit',
  });
} catch (err) {
  console.error('❌  zip command failed:', err.message);
  console.error('   Make sure "zip" is installed (brew install zip).');
  process.exit(1);
}

// 4 — Report
const sizeKB = Math.round(statSync(OUT_ZIP).size / 1024);
console.log(`\n✅  SCORM package ready!`);
console.log(`   Ficheiro : ${OUT_ZIP}`);
console.log(`   Tamanho  : ${sizeKB} KB`);
console.log('\n📋  Instruções de upload no Moodle:');
console.log('   1. Adicionar atividade → SCORM → Carregar o ficheiro ZIP');
console.log('   2. Versão SCORM: SCORM 1.2');
console.log('   3. Nota de aprovação: 70%');
console.log('   4. Número de tentativas: Ilimitado (ou mínimo 2)');
console.log('   5. Apresentação: Janela popup 1024×768px');
console.log('   6. Rastreio: completar/passar (baseado em pontuação)');
