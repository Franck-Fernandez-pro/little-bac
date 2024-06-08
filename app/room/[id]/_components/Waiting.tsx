import { Badge } from '@/components/ui/badge';
import Participants from './Participants';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useContext } from 'react';
import { UserContext } from '@/components/providers/UserProvider';

export default function WaitingRoom({
  id,
  categories,
}: {
  id: string;
  categories: string[];
}) {
  const room = useQuery(api.room.get, { id: id as Id<'rooms'> });
  const patchState = useMutation(api.room.patchState);
  const { user } = useContext(UserContext);
  const isAdmin = room?.admin === user?._id;

  async function start() {
    if (!user) return;
    if (!isAdmin) return;

    await patchState({
      roomId: id as Id<'rooms'>,
      userId: user?._id,
      state: 'ended',
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

      <Participants roomId={id} />
      <Button onClick={start} disabled={!isAdmin}>
        {isAdmin ? 'Commencer la partie' : "En attente de l'admin"}
      </Button>
    </>
  );
}
