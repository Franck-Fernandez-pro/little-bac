'use server';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { fetchMutation } from 'convex/nextjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createRoomSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Invalid Name',
      required_error: 'Name is required',
    })
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(32, { message: 'Must be 32 or fewer characters long' }),
  userId: z.string({ required_error: 'userId is required' }),
});

export async function createRoom(formData: FormData) {
  const { data, success, error } = createRoomSchema.safeParse({
    name: formData.get('name'),
    userId: formData.get('userId'),
  });

  // Return early if the form data is invalid
  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    };
  }

  const id = await fetchMutation(api.room.create, {
    name: data.name,
    admin: data.userId as Id<'users'>,
  });

  redirect(`/room/${id}`);
}
