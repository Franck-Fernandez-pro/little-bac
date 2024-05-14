import { createRoom } from '@/app/actions';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export default function RoomForm({ className }: { className?: string }) {
  return (
    <section className="border-l pl-10">
      <h2>Create room</h2>
      <form
        action={createRoom}
        className={cn('flex w-full max-w-sm items-center space-x-2', className)}
      >
        <Input name="name" type="text" placeholder="Room name" required />
        <Button type="submit">Create</Button>
      </form>
    </section>
  );
}
