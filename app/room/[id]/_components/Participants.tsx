'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';

export default function Participants({ roomId }: { roomId: string }) {
  const room = useQuery(api.room.get, { id: roomId as Id<'rooms'> });

  return (
    <section>
      <h2>Participants</h2>
      {room === undefined ? (
        'Loading...'
      ) : (
        <div className="flex flex-wrap gap-3">
          {room?.users.map((user) => (
            <Avatar key={user?._id} className="size-14">
              <AvatarFallback className="capitalize">
                {user?.name.slice(0, 3)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      )}
    </section>
  );
}
