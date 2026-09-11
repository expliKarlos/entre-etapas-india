'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { stages, places, stageHref, placeHref, stageLabel } from '@/data/itinerary';
import { Icon } from './icons';

export function Header() {
  const pathname = usePathname();
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Entre etapas · Inicio">
          <span className="brand-mark">
            <Icon name="sun" size={25} />
          </span>
          <span>
            entre etapas<span className="brand-sub">CUADERNO DE VIAJE</span>
          </span>
        </Link>
        <nav aria-label="Navegación principal" className="desktop-nav">
          {[
            ['/', 'El viaje'],
            ['/ruta/', 'La ruta'],
            ['/visitas/', 'Todas las visitas'],
          ].map(([href, label]) => (
            <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <span className="header-edition">
          INDIA <span aria-hidden="true">/</span> GUÍA PERSONAL
        </span>
      </div>
    </header>
  );
}
export function DestinationNavigation() {
  const path = usePathname();
  return (
    <nav className="destination-nav" aria-label="Etapas del viaje">
      <div>
        {stages.map((s, i) => (
          <Link
            key={s.id}
            href={stageHref(s)}
            className={s.kind === 'transit' ? 'transit' : ''}
            aria-current={path.startsWith(stageHref(s)) ? 'location' : undefined}
          >
            <span className="tiny-number">{String(i + 1).padStart(2, '0')}</span>
            {s.kind === 'transit' ? s.subtitle : s.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
export function VisitContext() {
  const path = usePathname();
  const index = places.findIndex((p) => placeHref(p) === path);
  if (index < 0) return null;
  const place = places[index],
    next = places[index + 1];
  return (
    <nav className="visit-context" aria-label="Visita actual">
      <div className="wrap">
        <div>
          <span>
            {stageLabel(stages.find((s) => s.id === place.stage)!)} ·{' '}
            {String(index + 1).padStart(2, '0')} / {places.length}
          </span>
          <strong>{place.name}</strong>
        </div>
        {next ? (
          <Link href={placeHref(next)} aria-label={`Siguiente: ${next.name}`}>
            <span>Siguiente: {next.name}</span>
            <Icon name="arrow" size={19} />
          </Link>
        ) : (
          <Link href="/visitas/" aria-label="Fin del recorrido: volver al índice">
            <span>Volver al índice</span>
            <Icon name="search" size={19} />
          </Link>
        )}
      </div>
    </nav>
  );
}
export function ReturnToIndex({
  placeId,
  className = '',
}: {
  placeId?: string;
  className?: string;
}) {
  return (
    <Link
      className={className}
      href={`/visitas/${placeId ? '#' + placeId : ''}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        try {
          const saved = sessionStorage.getItem('guide-index-url');
          if (saved && /\/visitas\/\?/.test(saved)) {
            e.preventDefault();
            window.location.assign(saved + (placeId ? '#' + placeId : ''));
          }
        } catch {}
      }}
    >
      Volver al índice
    </Link>
  );
}
export function MobileNavigation() {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const place = places.find((p) => placeHref(p) === path);
  const stage = stages.find((s) => path.startsWith(stageHref(s)));
  useEffect(() => {
    if (dialog.current?.open) dialog.current.close();
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <>
      <nav className="mobile-nav" aria-label="Navegación móvil">
        <Link href="/" aria-current={path === '/' ? 'page' : undefined}>
          <Icon name="home" />
          <span>Inicio</span>
        </Link>
        <Link href="/ruta/" aria-current={path === '/ruta/' ? 'page' : undefined}>
          <Icon name="route" />
          <span>Ruta</span>
        </Link>
        <Link href="/visitas/" aria-current={path === '/visitas/' ? 'page' : undefined}>
          <Icon name="search" />
          <span>Visitas</span>
        </Link>
        <button
          ref={trigger}
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="stage-sheet"
        >
          <Icon name="menu" />
          <span>Etapas</span>
        </button>
      </nav>
      <dialog
        ref={dialog}
        id="stage-sheet"
        className="stage-sheet"
        aria-labelledby="sheet-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="sheet-heading">
          <div>
            <span className="eyebrow">TU RECORRIDO</span>
            <h2 id="sheet-title">Saltar a una etapa</h2>
          </div>
          <button className="icon-button" onClick={close} aria-label="Cerrar etapas">
            <Icon name="close" />
          </button>
        </div>
        {stage && (
          <p className="sheet-context">
            Estás en {stageLabel(stage)}
            {place ? ` · ${place.name}` : ''}
          </p>
        )}
        <div className="sheet-body">
          {stages.map((s, i) => (
            <details key={s.id} open={stage?.id === s.id || undefined}>
              <summary>
                <span className="tiny-number">{String(i + 1).padStart(2, '0')}</span>
                {stageLabel(s)}
                <span aria-hidden="true">+</span>
              </summary>
              <Link className="sheet-overview" href={stageHref(s)} onClick={close}>
                Ver la etapa completa <Icon name="arrow" size={16} />
              </Link>
              {places
                .filter((p) => p.stage === s.id)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={placeHref(p)}
                    onClick={close}
                    aria-current={place?.id === p.id ? 'page' : undefined}
                  >
                    {p.name}
                  </Link>
                ))}
            </details>
          ))}
        </div>
      </dialog>
    </>
  );
}
