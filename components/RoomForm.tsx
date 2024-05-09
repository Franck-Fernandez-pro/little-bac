import { createRoom } from '@/app/actions';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

export default function RoomForm() {
  return (
    <form action={createRoom} className="w-2/3 space-y-2">
      <Label htmlFor="name">Room name</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          name="name"
          type="text"
          placeholder="Room name"
          defaultValue="Room #1"
          required
        />
        <Button type="submit">Create room</Button>
      </div>
    </form>
  );
}
