'use client';

import { sendResponse } from '@/app/actions';
import { UserContext } from '@/components/providers/UserProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useContext } from 'react';

export default function Running({
  id,
  categories_entries,
}: {
  id: string;
  categories_entries: [string, string][];
}) {
  const room = useQuery(api.room.get, { id: id as Id<'rooms'> });
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>Lettre : {room?.letter}</h1>

      {!room?.letter && 'Loading...'}
      {room?.letter && (
        <form
          className="flex w-full flex-col items-center space-y-5"
          autoComplete="false"
          action={sendResponse}
        >
          {categories_entries.map(([c, v], idx) => (
            <div
              key={idx}
              className="grid w-full max-w-3xl items-center gap-1.5"
            >
              <Label htmlFor={c}>{v}</Label>
              <Input
                name={c}
                type="text"
                placeholder={`${room.letter}...`}
                value={v}
              />
            </div>
          ))}
          <input name="roomId" type="hidden" value={id} />
          <input name="userId" type="hidden" value={user?._id || ''} />
          <Button type="submit">Terminer</Button>
        </form>
      )}
    </>
  );
}
