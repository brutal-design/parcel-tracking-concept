export default function Timeline({ steps }) {
  return (
    <section aria-labelledby="route-h" className="rounded-lg border border-line bg-surface p-5">
      <h2 id="route-h" className="text-lg font-bold">Маршрут</h2>
      <ol className="mt-4 flex flex-col gap-4">
        {steps.map((s, i) => {
          const now = i === steps.length - 1;
          return (
            <li key={s.title} className="flex gap-3">
              <span aria-hidden="true" className={`mt-1.5 size-3 shrink-0 rounded-full ${now ? 'bg-success' : 'bg-text-muted'}`} />
              <div>
                <p className={now ? 'font-bold' : 'font-medium'}>
                  {s.title}
                  {now && <span className="ml-2 text-xs font-semibold text-success">зараз</span>}
                </p>
                <p className="text-xs text-text-muted">{s.meta}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
