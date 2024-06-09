'use client';

import { sendResponse } from '@/app/actions';
import { UserContext } from '@/components/providers/UserProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { useContext, useEffect, useRef } from 'react';

export default function Running({
  id,
  categories_entries,
}: {
  id: string;
  categories_entries: [string, string][];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const room = useQuery(api.room.get, { id: id as Id<'rooms'> });
  const { user } = useContext(UserContext);
  const patchState = useMutation(api.room.patchState);

  useEffect(() => {
    if (room?.state === 'collecting' && formRef.current) {
      formRef.current.requestSubmit();
    }
  }, [room?.state]);

  function patch() {
    patchState({
      roomId: id as Id<'rooms'>,
      userId: user?._id as Id<'users'>,
      state: 'collecting',
    });
  }

  return (
    <>
      <h1>
        Lettre : <span className="uppercase">{room?.letter}</span>
      </h1>

      {!room?.letter && 'Loading...'}
      {room?.letter && (
        <form
          className="flex w-full flex-col items-center space-y-5"
          autoComplete="false"
          action={sendResponse}
          ref={formRef}
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
                placeholder={`${room.letter?.toUpperCase()}...`}
                defaultValue=""
              />
            </div>
          ))}
          <input name="roomId" type="hidden" value={id} />
          <input name="userId" type="hidden" value={user?._id || ''} />
          <Button type="button" onClick={patch}>
            Terminer
          </Button>
        </form>
      )}
    </>
  );
}
