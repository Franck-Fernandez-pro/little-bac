'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { api } from '@/convex/_generated/api';
import { CATEGORIES_ENTRIES } from '@/lib/utils';
import { FunctionReturnType } from 'convex/server';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
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
                <div className="mr-1 flex items-center gap-2">
                  <div>
                    {user[result.userId as string]} :{' '}
                    {result.response[key].value}
                  </div>

                  <div>
                    <Toggle
                      pressed={result.response[key].correct === true}
                      // onPressedChange={}
                      className="data-[state=on]:bg-green-400 hover:bg-green-400"
                      variant="rounded"
                      size="xs"
                    >
                      <ThumbsUp className="size-4" />
                    </Toggle>

                    <Toggle
                      pressed={result.response[key].correct === false}
                      // onPressedChange={}
                      className="data-[state=on]:bg-red-400 hover:bg-red-400"
                      variant="rounded"
                      size="xs"
                    >
                      <ThumbsDown className="size-4" />
                    </Toggle>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      <Button onClick={back}>Retourner à l'accueil</Button>
    </>
  );
}
