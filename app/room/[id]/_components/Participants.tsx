'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { useMutation, useQuery } from 'convex/react';
import { MouseEvent, useContext, useEffect } from 'react';
import { UserContext } from '@/components/providers/UserProvider';
import { useRouter } from 'next/navigation';

export default function Participants({ roomId }: { roomId: string }) {
  const router = useRouter();
  const room = useQuery(api.room.get, { id: roomId as Id<'rooms'> });
  const removeUser = useMutation(api.room.removeUser);
  const { user } = useContext(UserContext);
  const isAdmin = room?.admin === user?._id;

  useEffect(() => {
    if (!room?.usersId) return;
    if (!user) return;

    if (!room.usersId.includes(user._id)) {
      router.push('/');
    }
  }, [room?.usersId]);

  async function remove(e: MouseEvent<HTMLButtonElement>) {
    // @ts-ignore
    const userId = e.target.value;
    if (!userId) return;
    if (!isAdmin) return;

    await removeUser({ roomId: roomId as Id<'rooms'>, userId: userId });
  }

  return (
    <section>
      <h2>Participants</h2>
      {room === undefined && 'Loading...'}
      {room && (
        <div className="flex flex-wrap gap-3">
          {room.users.map((user) => (
            <TooltipProvider key={user?._id} delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="size-14">
                    <AvatarFallback className="capitalize">
                      {user?.name.slice(0, 3)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                {isAdmin && (
                  <TooltipContent>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={remove}
                      value={user?._id}
                    >
                      Remove
                    </Button>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      )}
    </section>
  );
}
