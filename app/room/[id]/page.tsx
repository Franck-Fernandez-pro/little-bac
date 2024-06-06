'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import WaitingRoom from './_components/Waiting';

const CATEGORIES = [
  'Animal',
  'Pays',
  'Métier',
  'Prénom',
  'Fruit/légume',
  'Ville',
  'Marque',
  'Objet',
  'Célébrité',
  'Sport',
  'Fleuve ou rivière',
  'Objet de couleur bleu',
  'Cadeau pour une épouse',
  'Plat',
  'Partie du corps',
  'Mot au hasard',
  'Fromage',
  'Qui est vert',
  'Maladies',
  'Pokémon',
  'Marque alimentaire',
  'Instrument de musique',
  'Objet du quotidien',
  'Objet éléctronique',
  'Cadeau pour un mari',
  'Types de musique',
  'Super héro',
  'Cadeau pour une petite amie',
  'Animaux marins',
];

export default function Room({ params: { id } }: { params: { id: string } }) {
  const room = useQuery(api.room.get, { id: id as Id<'rooms'> });

  if (room === undefined) return 'Loading...';
  if (room === null) return 'Room null';
  return (
    <main className="px-72 pt-5 space-y-8">
      {room.state === 'waiting' && (
        <WaitingRoom id={id} categories={CATEGORIES} />
      )}
    </main>
  );
}
