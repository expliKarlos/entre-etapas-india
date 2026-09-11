'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { places, stages, stageLabel, searchPlaces, placeHref } from '@/data/itinerary';
import { Icon } from './icons';
export type Thumbnail = { src: string; alt: string; width: number; height: number };
export function Search({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="search">
      <span className="sr-only">Buscar lugares de esta guía</span>
      <Icon name="search" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="¿Qué lugar quieres encontrar?"
        autoComplete="off"
      />
    </label>
  );
}
export function FilterBar({
  stage,
  category,
  onStage,
  onCategory,
}: {
  stage: string;
  category: string;
  onStage: (v: string) => void;
  onCategory: (v: string) => void;
}) {
  const categories = Array.from(
    new Set(places.filter((p) => !stage || p.stage === stage).map((p) => p.category)),
  );
  return (
    <div className="filter-bar">
      <label>
        <span>Etapa</span>
        <select value={stage} onChange={(e) => onStage(e.target.value)}>
          <option value="">Todas las etapas</option>
          {stages.map((s) => (
            <option key={s.id} value={s.id}>
              {stageLabel(s)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Tipo de visita</span>
        <select value={category} onChange={(e) => onCategory(e.target.value)}>
          <option value="">Todos los tipos</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
export function Explorer({ photos }: { photos: Record<string, Thumbnail> }) {
  const [q, setQ] = useState(''),
    [stage, setStage] = useState(''),
    [category, setCategory] = useState(''),
    [ready, setReady] = useState(false);
  useEffect(() => {
    function restore() {
      const params = new URLSearchParams(window.location.search);
      setQ(params.get('q') || '');
      setStage(params.get('etapa') || '');
      setCategory(params.get('tipo') || '');
    }
    restore();
    setReady(true);
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);
  function update(nextQ: string, nextStage: string, nextCategory: string) {
    setQ(nextQ);
    setStage(nextStage);
    setCategory(nextCategory);
    const params = new URLSearchParams();
    if (nextQ) params.set('q', nextQ);
    if (nextStage) params.set('etapa', nextStage);
    if (nextCategory) params.set('tipo', nextCategory);
    const url = '/visitas/' + (params.size ? '?' + params.toString() : '');
    window.history.replaceState(null, '', url);
    try {
      sessionStorage.setItem('guide-index-url', url);
    } catch {}
  }
  const results = searchPlaces(q, stage, category);
  const filtered = Boolean(q || stage || category);
  return (
    <>
      <div className="explorer-controls">
        <Search value={q} onChange={(v) => update(v, stage, category)} />
        <FilterBar
          stage={stage}
          category={category}
          onStage={(v) => update(q, v, '')}
          onCategory={(v) => update(q, stage, v)}
        />
      </div>
      <div className="results-summary">
        <p role="status" aria-live="polite">
          {results.length} {results.length === 1 ? 'visita' : 'visitas'}
          {filtered ? (results.length === 1 ? ' encontrada' : ' encontradas') : ' para descubrir'}
        </p>
        {filtered && (
          <button className="clear-filters" onClick={() => update('', '', '')}>
            Limpiar filtros <Icon name="close" size={16} />
          </button>
        )}
      </div>
      <noscript>
        <p>La búsqueda necesita JavaScript. Todas las visitas siguen disponibles en este índice.</p>
      </noscript>
      {results.length === 0 ? (
        <div className="empty-state">
          <Icon name="search" size={32} />
          <h2>No encontramos ese lugar</h2>
          <p>
            La búsqueda incluye únicamente las visitas de este recorrido. Prueba otro nombre o
            cambia los filtros.
          </p>
          <button className="button secondary" onClick={() => update('', '', '')}>
            Ver todas las visitas
          </button>
        </div>
      ) : (
        <div className="index-groups" data-ready={ready}>
          {stages.map((s) => {
            const items = results.filter((p) => p.stage === s.id);
            return (
              items.length > 0 && (
                <section key={s.id} aria-labelledby={`heading-${s.id}`}>
                  <div className="index-stage-heading">
                    <span className="stage-index">
                      {String(stages.indexOf(s) + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="eyebrow">
                        {s.kind === 'transit'
                          ? 'PARADA INTERMEDIA'
                          : `${items.length} ${items.length === 1 ? 'VISITA' : 'VISITAS'}`}
                      </p>
                      <h2 id={`heading-${s.id}`}>{stageLabel(s)}</h2>
                    </div>
                  </div>
                  <div className="index-list">
                    {items.map((p) => (
                      <Link
                        id={p.id}
                        key={p.id}
                        href={placeHref(p)}
                        className="index-place"
                        onClick={() => {
                          try {
                            sessionStorage.setItem(
                              'guide-index-url',
                              window.location.pathname + window.location.search,
                            );
                          } catch {}
                        }}
                      >
                        <span className="index-number">
                          {String(places.indexOf(p) + 1).padStart(2, '0')}
                        </span>
                        {photos[p.id] ? (
                          <img
                            src={photos[p.id].src}
                            alt=""
                            width={photos[p.id].width}
                            height={photos[p.id].height}
                            loading="lazy"
                          />
                        ) : (
                          <span className="index-no-image">
                            <Icon name={p.category === 'Mercados y artesanía' ? 'search' : 'pin'} />
                          </span>
                        )}
                        <div>
                          <span className="eyebrow">{p.category}</span>
                          <h3>{p.name}</h3>
                        </div>
                        <Icon name="arrow" />
                      </Link>
                    ))}
                  </div>
                </section>
              )
            );
          })}
        </div>
      )}
    </>
  );
}
