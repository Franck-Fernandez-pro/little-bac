'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import WaitingRoom from './_components/Waiting';
import Ended from './_components/Ended';
import Running from './_components/Running';
import { CATEGORIES_ENTRIES, CATEGORIES_VALUES } from '@/lib/utils';

export default function Room({ params: { id } }: { params: { id: string } }) {
  const room = useQuery(api.room.get, { id: id as Id<'rooms'> });

  if (room === undefined) return 'Loading...';
  if (room === null) return 'Room null';
  return (
    <main className="px-72 py-5 space-y-8">
      {room.state === 'waiting' && (
        <WaitingRoom id={id} categories={CATEGORIES_VALUES} />
      )}
      {room.state === 'running' && (
        <Running id={id} categories_entries={CATEGORIES_ENTRIES} />
      )}
      {room.state === 'ended' && <Ended />}
    </main>
  );
}
