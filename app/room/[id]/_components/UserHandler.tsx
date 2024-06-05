'use client';

import { UserContext } from '@/components/providers/UserProvider';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { useContext, useEffect } from 'react';

export default function UserHandler({ roomId }: { roomId: string }) {
  const { user } = useContext(UserContext);
  const addUser = useMutation(api.room.addUser);

  useEffect(() => {
    if (user) {
      addU();
    }

    return () => {
      
    }

    async function addU() {
      if (!user) return;
      await addUser({ roomId: roomId as Id<'rooms'>, userId: user._id });
    }
  }, [user]);

  // useEffect(() => {
  //   if (user === null) newUser();

  //   async function newUser() {
  //     const id = await create({});
  //     localStorage.setItem('userId', id);
  //   }
  // }, [user]);

  return <></>;
}
