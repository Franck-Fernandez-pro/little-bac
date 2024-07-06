'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { api } from '@/convex/_generated/api';
import { CATEGORIES_ENTRIES } from '@/lib/utils';
import { FunctionReturnType } from 'convex/server';
import { useRouter } from 'next/navigation';

export default function Results({
  room,
}: {
  room: Exclude<FunctionReturnType<typeof api.room.get>, null>;
}) {
  const router = useRouter();
  const user = room.users?.reduce((acc: Record<string, string>, user) => {
    if (user) {
      acc[user._id] = user.name;
    }
    return acc;
  }, {});

  async function back() {
    router.push('/');
  }

  return (
    <>
      <h1>Résultats</h1>

      <section className="flex w-full flex-col space-y-5 ml-2">
        {CATEGORIES_ENTRIES.map(([key, value]) => (
          <div key={key}>
            <Label>{value}</Label>
            {room.results?.map((result) => (
              <div key={`${key}_${result.userId}`} className="ml-5">
                <span className="mr-1">{user[result.userId as string]} :</span>
                {/* @ts-ignore */}
                <span>{result.response[key]}</span>
              </div>
            ))}
          </div>
        ))}
      </section>

      <Button onClick={back}>Retourner à l'accueil</Button>
    </>
  );
}
