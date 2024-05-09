import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export default async function Rooms() {
  const rooms = await fetchQuery(api.rooms.get);

  if (!rooms) return <div>No rooms</div>;
  return <div>{JSON.stringify(rooms)}</div>;
}
