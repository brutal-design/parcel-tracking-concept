// Трекінг посилки · ефір #9 · змінні для Figma. Плагін «UX Hero: Code Runner» -> встав -> Cmd+Enter.
// Запусти ДО Claude to Figma: JSON екрана сам прив'яжеться до цих змінних ($semantic/...).
// Колекція «Трекінг · Tokens»: примітиви color/... (hex) і семантика semantic/... як посилання на них.
// Один режим, працює на безкоштовній Figma. Повторний запуск оновлює значення і нічого не дублює.
// Ще й прив'язує до змінних кольори фреймів «Трекінг · ...», якщо вони вже є на сторінці.

const COLLECTION = 'Трекінг · Tokens';
const PRIMITIVES = {
  'color/ink/950': '#15171C',
  'color/ink/600': '#545B67',
  'color/ink/400': '#8C929D',
  'color/ink/200': '#E2E5EA',
  'color/paper/0': '#FFFFFF',
  'color/paper/50': '#F4F5F7',
  'color/signal/600': '#D42A1E',
  'color/signal/700': '#B02218',
  'color/signal/50': '#FDEDEB',
  'color/green/700': '#12704F',
  'color/green/50': '#E6F4EE',
  'color/amber/800': '#8A4B00',
  'color/amber/50': '#FFF3DC',
  'color/blue/600': '#2456D6'
};
const SEMANTIC = {
  'bg': 'color/paper/50',
  'surface': 'color/paper/0',
  'text': 'color/ink/950',
  'text-muted': 'color/ink/600',
  'line': 'color/ink/200',
  'accent': 'color/signal/600',
  'accent-hover': 'color/signal/700',
  'accent-soft': 'color/signal/50',
  'on-accent': 'color/paper/0',
  'success': 'color/green/700',
  'success-bg': 'color/green/50',
  'warning': 'color/amber/800',
  'warning-bg': 'color/amber/50',
  'focus': 'color/blue/600'
};

function rgb(h) {
  h = h.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 };
}
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const col = cols.find((c) => c.name === COLLECTION) || figma.variables.createVariableCollection(COLLECTION);
const mode = col.modes[0].modeId;
const byName = {};
(await figma.variables.getLocalVariablesAsync('COLOR')).filter((x) => x.variableCollectionId === col.id).forEach((x) => { byName[x.name] = x; });
let created = 0;
function upsert(name) {
  if (!byName[name]) { byName[name] = figma.variables.createVariable(name, col, 'COLOR'); created++; }
  return byName[name];
}
for (const [name, hex] of Object.entries(PRIMITIVES)) upsert(name).setValueForMode(mode, rgb(hex));
for (const [name, ref] of Object.entries(SEMANTIC)) upsert('semantic/' + name).setValueForMode(mode, figma.variables.createVariableAlias(byName[ref]));

const total = Object.keys(PRIMITIVES).length + Object.keys(SEMANTIC).length;
const msg = 'Трекінг: ' + total + ' змінних (' + created + ' нових), 1 режим';
figma.notify(msg);
console.log(msg);
