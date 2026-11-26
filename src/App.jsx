import ConceptBar from './components/ConceptBar.jsx';

const SWATCHES = ['bg', 'surface', 'text', 'text-muted', 'line', 'accent', 'success', 'warning', 'focus'];

export default function App() {
  return (
    <>
      <ConceptBar />
      <main className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-extrabold">Токени з Figma</h1>
        <p className="mt-2 text-text-muted">Колекція «Трекінг · Tokens» у коді. Наступний крок - екран.</p>
        <ul className="mt-6 grid grid-cols-3 gap-3">
          {SWATCHES.map((s) => (
            <li key={s} className="rounded-md border border-line bg-surface p-3 text-xs">
              <span className="mb-2 block h-10 rounded-sm border border-line" style={{ background: `var(--color-${s})` }} />
              {s}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
