import { test } from 'node:test';
import assert from 'node:assert/strict';
import { places, stages, stagePlaces, placeHref, searchPlaces } from '../src/data/itinerary.ts';

test('exact closed itinerary and original order', () => {
  const expected = [
    [
      'udaipur',
      [
        'Templo Jagdish',
        'Palacio de la Ciudad (City Palace)',
        'Saheliyon Ki Bari',
        'Lago Fateh Sagar',
        'Lago Pichola',
        'Bagore Ki Haveli',
      ],
    ],
    ['en-ruta-ranakpur', ['Nagda', 'Templo Jainista de Ranakpur']],
    [
      'jodhpur',
      [
        'Fuerte Mehrangarh',
        'Jaswant Thada',
        'Palacio Umaid Bhawan',
        'Torre del Reloj',
        'Mercado Local',
      ],
    ],
    ['ajmer', ['Templos Jainistas de Ajmer']],
    [
      'jaipur',
      [
        'Purohit Ji Ka Katla',
        'Mercado Textil',
        'Fuerte Amber',
        'Jal Mahal',
        'Palacio de la Ciudad',
        'Jantar Mantar',
        'Hawa Mahal',
        'Mercado',
      ],
    ],
    ['en-ruta-fatehpur', ['Fatehpur Sikri']],
    ['agra', ['Fuerte de Agra', 'Taj Mahal']],
    [
      'delhi',
      [
        'Tumba de Humayun',
        'Puerta de la India y Eje Ceremonial',
        'Dilli Haat INA',
        'Fuerte Rojo',
        'Gurudwara Bangla Sahib Park',
        'Qutab Minar',
      ],
    ],
  ];
  assert.deepEqual(
    stages.map((s) => [s.id, stagePlaces(s.id).map((p) => p.name)]),
    expected,
  );
  assert.equal(places.length, 31);
  assert.deepEqual(
    places.map((p) => p.stage),
    expected.flatMap(([s, ps]) => (ps as string[]).map(() => s)),
  );
  assert.equal(new Set(places.map(placeHref)).size, 31);
  assert.equal(new Set(places.map((p) => p.id)).size, 31);
  assert.equal(stages.filter((s) => s.kind === 'transit').length, 2);
});
test('market subzones reuse Purohit and add no visits', () => {
  const zones = places.find((p) => p.id === 'mercado-jaipur')!.zones!;
  assert.deepEqual(
    zones.map((z) => z.name),
    ['Purohit Ji Ka Katla', 'Lal Ji Sand Ka Rasta', 'Navjeevan Plaza'],
  );
  assert.equal(zones[0].placeId, 'purohit');
  assert.equal(places.filter((p) => p.name === 'Purohit Ji Ka Katla').length, 1);
});
test('search is accent insensitive, supports subzones and intersects filters', () => {
  assert.deepEqual(
    searchPlaces('JAGDÍSH').map((p) => p.id),
    ['jagdish'],
  );
  assert.deepEqual(
    searchPlaces('Navjeevan').map((p) => p.id),
    ['mercado-jaipur'],
  );
  assert.equal(searchPlaces('textil', 'udaipur').length, 0);
  assert.equal(searchPlaces('', 'jaipur', 'Mercados y artesanía').length, 3);
  assert.equal(searchPlaces('Mumbai').length, 0);
});
