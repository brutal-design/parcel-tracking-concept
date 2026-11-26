// tokens.json (DTCG, експорт з Figma Variables) -> src/styles/tokens.css (Tailwind 4 @theme).
// Запуск: node scripts/tokens.mjs. Руками tokens.css не правити.
import { readFileSync, writeFileSync } from 'node:fs';

const t = JSON.parse(readFileSync(new URL('../tokens.json', import.meta.url), 'utf8'));
const lines = [];
const ref = (v) => v.replace(/^\{(.+)\}$/, (_, p) => 'var(--' + p.replace(/\./g, '-') + ')');

for (const [fam, steps] of Object.entries(t.color)) {
  for (const [step, tok] of Object.entries(steps)) lines.push(`  --color-${fam}-${step}: ${tok.$value};`);
}
lines.push('');
for (const [name, tok] of Object.entries(t.semantic)) lines.push(`  --color-${name}: ${ref(tok.$value)};`);
lines.push('');
for (const [name, tok] of Object.entries(t.radius)) lines.push(`  --radius-${name}: ${tok.$value};`);
for (const [name, tok] of Object.entries(t.size)) lines.push(`  --text-${name}: ${tok.$value};`);
lines.push(`  --font-sans: ${t.font.sans.$value.map((f) => (f.includes('-') ? f : `"${f}"`)).join(', ')};`);

const css = `/* Згенеровано з tokens.json (Figma Variables). Не правити руками: node scripts/tokens.mjs */\n@theme static {\n${lines.join('\n')}\n}\n`;
writeFileSync(new URL('../src/styles/tokens.css', import.meta.url), css);

console.log('tokens.css готовий');
