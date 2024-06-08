'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Ended({}: {}) {
  const router = useRouter();

  async function back() {
    router.push('/');
  }

  return (
    <>
      <h1>Ended</h1>

      <Button onClick={back}>Retourner à l'accueil</Button>
    </>
  );
}
