'use client';

import { createRoom } from '@/app/actions';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';
import { LoaderCircle } from 'lucide-react';

export default function RoomForm({ className }: { className?: string }) {
  return (
    <section className={cn(className)}>
      <h2>Nouvelle room</h2>
      <form
        action={createRoom}
        className="flex w-full sm:max-w-sm items-center gap-3 flex-wrap 2xl::flex-nowrap"
      >
        <Input name="name" type="text" placeholder="Nom de la room" required />
        <input
          name="userId"
          type="hidden"
          value={localStorage.getItem('userId') || ''}
        />
        <Submit />
      </form>
    </section>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full sm:w-auto" type="submit" disabled={pending}>
      {pending ? <LoaderCircle className="animate-spin" /> : 'Créer'}
    </Button>
  );
}
