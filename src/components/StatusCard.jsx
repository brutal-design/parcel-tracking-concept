import { useState } from 'react';

export default function StatusCard({ parcel }) {
  const [note, setNote] = useState('');
  const off = () => setNote('У концепті дії вимкнені: це демо, а не справжній сервіс.');

  return (
    <section aria-labelledby="status-h" className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-success-bg px-3 py-1 text-xs font-semibold text-success">{parcel.status}</span>
        <span className="text-xs text-text-muted">демо-дані</span>
      </div>
      <h2 id="status-h" className="text-2xl font-extrabold tracking-tight lg:text-2xl">{parcel.headline}</h2>
      <p className="text-base font-medium">{parcel.branch}</p>
      <p className="self-start rounded-full bg-warning-bg px-3 py-1 text-xs font-semibold text-warning">
        Безкоштовно зберігається до {parcel.storageUntil}
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={off} className="min-h-11 rounded-md border border-line px-4 text-sm font-semibold text-accent-hover">
          Маршрут
        </button>
        <button type="button" onClick={off} className="min-h-11 rounded-md border border-line px-4 text-sm font-semibold text-accent-hover">
          Продовжити зберігання
        </button>
      </div>
      <p aria-live="polite" className="text-xs text-text-muted">{note}</p>
    </section>
  );
}
