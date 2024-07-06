'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import WaitingRoom from './_components/Waiting';
import Results from './_components/Results';
import Running from './_components/Running';
import { CATEGORIES_ENTRIES, CATEGORIES_VALUES } from '@/lib/utils';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Room({ params: { id } }: { params: { id: string } }) {
  const room = useQuery(api.room.get, { id: id as Id<'rooms'> });
  const patchState = useMutation(api.room.patchState);

  // When all users have responded, change the state to ended
  useEffect(() => {
    if (room?.state === 'collecting') {
      const allUsersResponded = room.usersId.every((userId) =>
        room.results?.some((result) => result.userId === userId)
      );

      if (allUsersResponded) {
        patchState({
          roomId: id as Id<'rooms'>,
          userId: room.admin,
          state: 'ended',
        });
      }
    }
  }, [room?.state, room?.results]);

  if (room === undefined) return 'Chargement...';
  if (room === null) return redirect('/');

  return (
    <main className="px-72 py-5 space-y-8">
      {room.state === 'waiting' && (
        <WaitingRoom room={room} categories={CATEGORIES_VALUES} />
      )}
      {(room.state === 'running' || room.state === 'collecting') && (
        <Running room={room} categories_entries={CATEGORIES_ENTRIES} />
      )}
      {room.state === 'ended' && <Results room={room} />}
    </main>
  );
}
