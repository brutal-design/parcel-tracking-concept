import { useRef, useState } from 'react';
import { DEMO_TTN, formatTtn } from '../data/demo.js';

// Поле ТТН зі станами: порожнє, фокус, помилка, завантаження.
// Номер з SMS приходить з пробілами: рахуємо тільки цифри.
export default function TrackingForm({ initial = '', onSearch }) {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // «Вставити»: номер з буфера (SMS, застосунок). Буфер недоступний - просто фокус у поле.
  async function paste() {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (text) {
        setValue(text);
        setError('');
      }
    } catch {
      // браузер не дав доступ до буфера
    }
    inputRef.current?.focus();
  }

  function submit(e) {
    e.preventDefault();
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 14) {
      setError(`Номер має 14 цифр, зараз ${digits.length}`);
      return;
    }
    setError('');
    setValue(formatTtn(digits));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSearch(digits);
    }, 700);
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2">
      <label htmlFor="ttn" className="text-sm font-semibold">Номер накладної (ТТН)</label>
      <div className="relative">
        <input
          ref={inputRef}
          id="ttn"
          inputMode="numeric"
          autoComplete="off"
          placeholder="20 4512 3456 7890"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby="ttn-msg"
          className={`h-14 w-full rounded-md border bg-surface pl-4 pr-28 text-lg font-medium tracking-wide outline-none placeholder:text-text-muted focus:border-focus ${
            error ? 'border-accent' : 'border-line'
          }`}
        />
        {!value && (
          <button
            type="button"
            onClick={paste}
            className="absolute right-1.5 top-1/2 h-11 -translate-y-1/2 rounded px-3 text-sm font-semibold text-accent-hover hover:bg-bg"
          >
            Вставити
          </button>
        )}
      </div>
      <p id="ttn-msg" aria-live="polite" className={`text-xs ${error ? 'font-medium text-accent-hover' : 'text-text-muted'}`}>
        {error || '14 цифр. Є в SMS і в застосунку'}
      </p>
      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="mt-1 h-12 rounded-md bg-accent px-5 text-base font-bold text-on-accent transition-colors hover:bg-accent-hover disabled:bg-accent-hover"
      >
        {loading ? 'Шукаю…' : 'Відстежити'}
      </button>
      <button
        type="button"
        onClick={() => { setValue(formatTtn(DEMO_TTN)); setError(''); }}
        className="min-h-11 self-start text-xs font-semibold text-accent-hover underline underline-offset-2"
      >
        Спробувати демо-номер {formatTtn(DEMO_TTN)}
      </button>
    </form>
  );
}
