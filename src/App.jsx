import { useEffect, useState } from 'react';
import ConceptBar from './components/ConceptBar.jsx';
import Header from './components/Header.jsx';
import TrackingForm from './components/TrackingForm.jsx';
import StatusCard from './components/StatusCard.jsx';
import Timeline from './components/Timeline.jsx';
import Details from './components/Details.jsx';
import Hint from './components/Hint.jsx';
import Footer from './components/Footer.jsx';
import { DEMO_PARCEL, DEMO_TTN, formatTtn } from './data/demo.js';

export default function App() {
  const [result, setResult] = useState(null); // null | { found: true } | { notFound: '...' }
  const fromUrl = new URLSearchParams(location.search).get('ttn') || '';

  function search(ttn) {
    setResult(ttn.replace(/\D/g, '') === DEMO_TTN ? { found: true } : { notFound: ttn.replace(/\D/g, '') });
  }
  useEffect(() => {
    if (fromUrl) search(fromUrl);
  }, []);

  return (
    <>
      <ConceptBar />
      <Header />
      <main className="mx-auto grid max-w-6xl gap-5 px-4 pb-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-8 lg:px-8 lg:pt-4">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">Де моя посилка?</h1>
          <TrackingForm initial={fromUrl ? formatTtn(fromUrl.replace(/\D/g, '')) : ''} onSearch={search} />
          {result?.found && <StatusCard parcel={DEMO_PARCEL} />}
        </div>
        <div className="flex flex-col gap-5 lg:pt-2">
          {result?.found ? (
            <>
              <Timeline steps={DEMO_PARCEL.steps} />
              <Details rows={DEMO_PARCEL.details} />
            </>
          ) : (
            <Hint notFound={result?.notFound} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
