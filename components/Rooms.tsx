'use client';

import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Button } from './ui/button';
import { Card, CardTitle, CardContent } from './ui/card';
import { Doc } from '@/convex/_generated/dataModel';
import { Skeleton } from './ui/skeleton';
import { useContext } from 'react';
import { UserContext } from './providers/UserProvider';
import { useRouter } from 'next/navigation';

export default function Rooms({ className }: { className?: string }) {
  const rooms = useQuery(api.rooms.get);

  return (
    <section className={className}>
      <h2>Rooms</h2>
      <div className="flex flex-wrap gap-4">
        {rooms === undefined && [
          <SkeletonCard key="0" />,
          <SkeletonCard key="1" />,
          <SkeletonCard key="2" />,
          <SkeletonCard key="3" />,
        ]}
        {rooms !== undefined && rooms.length === 0 && <div>No room</div>}
        {rooms !== undefined &&
          rooms.length > 0 &&
          rooms.map((room) => <RoomCard key={room._id} room={room} />)}
      </div>
    </section>
  );
}

function RoomCard({ room: { _id, name } }: { room: Doc<'rooms'> }) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const addUser = useMutation(api.room.addUser);

  async function joinRoom() {
    if (!user) return;
    await addUser({ roomId: _id, userId: user._id });
    router.push(`/room/${_id}`);
  }

  return (
    <Card className="w-[350px]">
      <CardContent className="pt-6 flex justify-between items-center">
        <CardTitle>{name}</CardTitle>
        <Button onClick={joinRoom}>Join</Button>
      </CardContent>
    </Card>
  );
}

const SkeletonCard = () => (
  <Card className="w-[350px] h-[88px]">
    <CardContent className="pt-6 flex justify-between items-center h-full">
      <Skeleton className="h-6 w-[160px] rounded-lg" />
      <Skeleton className="h-6 w-[50px] rounded-lg" />
    </CardContent>
  </Card>
);
