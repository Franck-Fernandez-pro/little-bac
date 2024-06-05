'use client';

import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { ReactNode, createContext, useEffect } from 'react';

export const UserContext = createContext<{ user?: Doc<'users'> | null }>({
  user: undefined,
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const create = useMutation(api.user.create);
  const localUserId = localStorage.getItem('userId')
    ? (localStorage.getItem('userId') as Id<'users'>)
    : null;
  const user = useQuery(api.user.get, {
    id: localUserId,
  });

  useEffect(() => {
    if (user === null) newUser();

    async function newUser() {
      const id = await create({});
      localStorage.setItem('userId', id);
    }
  }, [user]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}
