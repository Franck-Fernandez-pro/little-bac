'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Button } from './ui/button';
import { Card, CardTitle, CardContent } from './ui/card';
import { Doc } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Rooms({ className }: { className?: string }) {
  const rooms = useQuery(api.rooms.get);

  if (rooms === undefined) return <div>Loading...</div>;
  if (rooms.length === 0) return <div>No room</div>;

  return (
    <section className={cn('space-y-4', className)}>
      <h2>Rooms</h2>
      <div className="flex flex-wrap gap-4">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
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
