import { Badge } from '@/components/ui/badge';
import Participants from './Participants';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useContext } from 'react';
import { UserContext } from '@/components/providers/UserProvider';

export default function WaitingRoom({
  room,
  categories,
}: {
  room: Doc<'rooms'>;
  categories: string[];
}) {
  const patchState = useMutation(api.room.patchState);
  const { user } = useContext(UserContext);
  const isAdmin = room?.admin === user?._id;

  async function start() {
    if (!user) return;
    if (!isAdmin) return;

    await patchState({
      roomId: room._id as Id<'rooms'>,
      userId: user?._id,
      state: 'running',
    });
  }

  return (
    <>
      <h1>Nouvelle partie</h1>

      <section>
        <h2>Catégories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c, idx) => (
            <Badge key={idx}>{c}</Badge>
          ))}
        </div>
      </section>

      {/* <section>
        <h2>Lien de la partie</h2>
        <RoomPath />
      </section> */}

      <Participants roomId={room._id} />
      <Button onClick={start} disabled={!isAdmin}>
        {isAdmin ? 'Commencer la partie' : "En attente de l'admin"}
      </Button>
    </>
  );
}
