'use client';

import { sendResponse } from '@/app/actions';
import { UserContext } from '@/components/providers/UserProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { useContext, useEffect, useRef } from 'react';

export default function Running({
  room,
  categories_entries,
}: {
  room: Doc<'rooms'>;
  categories_entries: [string, string][];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useContext(UserContext);
  const patchState = useMutation(api.room.patchState);
  const isCollecting = room?.state === 'collecting';

  useEffect(() => {
    if (isCollecting && formRef.current) {
      formRef.current.requestSubmit();
    }
  }, [room?.state]);

  function patch() {
    patchState({
      roomId: room._id as Id<'rooms'>,
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
                disabled={isCollecting}
              />
            </div>
          ))}
          <input name="roomId" type="hidden" value={room._id} />
          <input name="userId" type="hidden" value={user?._id || ''} />
          <Button type="button" onClick={patch} disabled={isCollecting}>
            {isCollecting ? 'Envoi en cours...' : 'Terminer'}
          </Button>
        </form>
      )}
    </>
  );
}
