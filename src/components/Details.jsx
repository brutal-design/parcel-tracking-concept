export default function Details({ rows }) {
  return (
    <section aria-labelledby="details-h" className="rounded-lg border border-line bg-surface p-5">
      <h2 id="details-h" className="text-lg font-bold">Деталі</h2>
      <dl className="mt-3 flex flex-col gap-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-text-muted">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
