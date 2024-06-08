'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import WaitingRoom from './_components/Waiting';
import Ended from './_components/Ended';
import Running from './_components/Running';

const CATEGORIES = [
  'Animal',
  'Pays',
  'Métier',
  'Fruit/légume',
  'Ville',
  'Marque',
  'Objet',
  'Célébrité',
  'Sport',
  'Partie du corps',
  'Instrument de musique',
  'Objet du quotidien',
  'Super héro',
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
      {room.state === 'running' && <Running id={id} categories={CATEGORIES} />}
      {room.state === 'ended' && <Ended />}
    </main>
  );
}
