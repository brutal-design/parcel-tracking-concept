import { formatTtn } from '../data/demo.js';

// Порожній стан і «не знайшли»: кажемо, що буде, а не мовчимо.
export default function Hint({ notFound }) {
  if (notFound) {
    return (
      <section aria-labelledby="nf-h" className="rounded-lg border border-line bg-surface p-5">
        <h2 id="nf-h" className="text-lg font-bold">Не знайшли посилку {formatTtn(notFound)}</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-text-muted">
          <li>Перевір цифри в SMS або в застосунку.</li>
          <li>Це концепт з демо-даними: справжні номери тут не шукаються.</li>
        </ul>
      </section>
    );
  }
  return (
    <section aria-labelledby="hint-h" className="rounded-lg border border-dashed border-line p-5">
      <h2 id="hint-h" className="text-lg font-bold">Що ти побачиш</h2>
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        <li>Де посилка зараз і чи можна її забирати</li>
        <li>Адресу відділення і до коли безкоштовне зберігання</li>
        <li>Маршрут з датами і деталі посилки</li>
      </ul>
    </section>
  );
}
