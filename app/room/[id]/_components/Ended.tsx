'use client';

import { Button } from '@/components/ui/button';
import { Doc } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';

export default function Ended({ room }: { room: Doc<'rooms'> }) {
  const router = useRouter();

  async function back() {
    router.push('/');
  }

  return (
    <>
      <h1>Partie terminée</h1>

      <Button onClick={back}>Retourner à l'accueil</Button>
    </>
  );
}
