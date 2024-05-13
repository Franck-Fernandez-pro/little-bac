import { createRoom } from '@/app/actions';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

export default function RoomForm({ className }: { className?: string }) {
  return (
    <section className="border-l pl-10">
      <h2>Create room</h2>
      <form action={createRoom} className={cn('space-y-2', className)}>
        <Label htmlFor="name">Name</Label>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            name="name"
            type="text"
            placeholder="Room name"
            defaultValue="Room #1"
            required
          />
          <Button type="submit">Create</Button>
        </div>
      </form>
    </section>
  );
}
