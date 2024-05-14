'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Button } from './ui/button';
import { Card, CardTitle, CardContent } from './ui/card';
import { Doc } from '@/convex/_generated/dataModel';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';

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

const RoomCard = ({ room: { _id, name } }: { room: Doc<'rooms'> }) => (
  <Card className="w-[350px]">
    <CardContent className="pt-6 flex justify-between items-center">
      <CardTitle>{name}</CardTitle>
      <Button asChild>
        <Link href={`/room/${_id}`}>Join</Link>
      </Button>
    </CardContent>
  </Card>
);

const SkeletonCard = () => (
  <Card className="w-[350px] h-[88px]">
    <CardContent className="pt-6 flex justify-between items-center h-full">
      <Skeleton className="h-6 w-[160px] rounded-lg" />
      <Skeleton className="h-6 w-[50px] rounded-lg" />
    </CardContent>
  </Card>
);
