import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="wrap empty-state">
      <p className="eyebrow">FUERA DEL RECORRIDO</p>
      <h1>No encontramos esta página.</h1>
      <p>Vuelve al índice para encontrar cualquiera de las visitas de la guía.</p>
      <Link href="/visitas/" className="button primary">
        Ver todas las visitas →
      </Link>
    </div>
  );
}
