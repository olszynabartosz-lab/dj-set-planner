import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'dj-set-planner.tracks';

function readTracks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(saved) || !saved.every((track) =>
      track && typeof track.id === 'string' &&
      typeof track.artist === 'string' && typeof track.title === 'string' &&
      typeof track.key === 'string' && (track.bpm === null || Number.isFinite(track.bpm))
    )) return { tracks: [], warning: 'Nie udało się odczytać zapisanej listy.' };
    return { tracks: saved, warning: '' };
  } catch {
    return { tracks: [], warning: 'Zapis w przeglądarce jest niedostępny lub zapisane dane są uszkodzone.' };
  }
}

export default function App() {
  const [initial] = useState(readTracks);
  const [tracks, setTracks] = useState(initial.tracks);
  const [trackText, setTrackText] = useState('');
  const [formError, setFormError] = useState('');
  const [warning, setWarning] = useState(initial.warning);
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
    } catch {
      setWarning('Nie udało się zapisać listy. Utwory będą dostępne tylko do odświeżenia strony.');
    }
  }, [tracks]);

  function addTrack(event) {
    event.preventDefault();
    const parts = trackText.trim().match(/^(.+?)\s+[-–—]\s+(.+)$/);
    if (!parts || !parts[1].trim() || !parts[2].trim()) {
      setFormError('Wpisz wykonawcę i tytuł, oddzielając je myślnikiem ze spacjami, np. Rene Wise - Knock Motion.');
      return;
    }
    const track = {
      id: crypto.randomUUID(),
      artist: parts[1].trim(),
      title: parts[2].trim(),
      bpm: null,
      key: '',
    };
    setTracks((previous) => [...previous, track]);
    setTrackText('');
    setFormError('');
    setMessage(`Dodano: ${track.artist} — ${track.title}.`);
    event.currentTarget.elements.trackText.focus();
  }

  function removeTrack(track) {
    setTracks((previous) => previous.filter((item) => item.id !== track.id));
    setMessage(`Usunięto: ${track.artist} — ${track.title}.`);
  }

  return (
    <main className="planner">
      <header className="header">
        <div className="brand"><span className="brand-icon" aria-hidden="true">≋</span> THE SELECTOR'S TOOLKIT</div>
        <span className="local-badge"><span /> LOCAL SESSION</span>
      </header>

      <section className="intro">
        <p className="eyebrow">DOBRY SET ZACZYNA SIĘ OD PLANU</p>
        <h1>DJ Set <span>Planner.</span></h1>
        <p>Twoje utwory. Twój flow. Ułóż kolejny set w jednym miejscu.</p>
      </section>

      <section className="form-panel" aria-labelledby="add-heading">
        <div className="section-title"><h2 id="add-heading">Dodaj utwór</h2><span>01 / BIBLIOTEKA</span></div>
        <form onSubmit={addTrack}>
          <div className="fields">
            <label htmlFor="trackText">
              Wykonawca - Tytuł
              <input
                id="trackText" name="trackText" value={trackText}
                placeholder="np. Rene Wise - Knock Motion"
                type="text" maxLength={300} required
                aria-describedby={formError ? 'track-hint track-error' : 'track-hint'}
                aria-invalid={Boolean(formError)}
                onChange={(event) => {
                  setTrackText(event.target.value);
                  setFormError('');
                }}
              />
            </label>
            <button className="add-button" type="submit"><span aria-hidden="true">＋</span> Dodaj utwór</button>
          </div>
          <p id="track-hint" className="form-hint">Oddziel wykonawcę i tytuł myślnikiem ze spacjami. BPM i tonację możesz na razie pominąć.</p>
          {formError && <p id="track-error" className="warning" role="alert">{formError}</p>}
        </form>
        <p className="storage-note">↳ Lista zapisuje się automatycznie w tej przeglądarce.</p>
      </section>

      {warning && <p className="warning" role="alert">{warning}</p>}
      <p className="sr-only" role="status">{message}</p>

      <section className="track-section" aria-labelledby="tracks-heading">
        <div className="list-heading"><h2 id="tracks-heading">Twój set <span className="count">{tracks.length}</span></h2><span className="list-caption">W KOLEJNOŚCI DODANIA</span></div>
        {tracks.length === 0 ? (
          <div className="empty-state">
            <div className="record" aria-hidden="true"><span /></div>
            <h3>Tu zaczyna się Twój set</h3>
            <p>Dodaj pierwszy utwór i nadaj mu rytm.</p>
          </div>
        ) : (
          <ol className="track-list">
            {tracks.map((track, index) => (
              <li className="track" key={track.id}>
                <span className="track-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="track-info"><h3>{track.title}</h3><p>{track.artist}</p></div>
                <span className="tempo" aria-label={track.bpm === null ? 'Brak BPM' : undefined}>{track.bpm ?? '—'}<small>BPM</small></span>
                <span className="key-tag" aria-label={track.key ? undefined : 'Brak tonacji'}>{track.key || '—'}</span>
                <button className="remove-button" onClick={() => removeTrack(track)} aria-label={`Usuń ${track.artist} — ${track.title}`} title="Usuń utwór">×</button>
              </li>
            ))}
          </ol>
        )}
      </section>
      <footer><span>MADE FOR YOUR NEXT MIX</span><span>Bez konta. Bez chmury. Po prostu muzyka.</span></footer>
    </main>
  );
}
