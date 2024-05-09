'use server';

import { api } from '@/convex/_generated/api';
import { fetchMutation } from 'convex/nextjs';
import { z } from 'zod';

const createRoomSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Invalid Name',
      required_error: 'Name is required',
    })
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(32, { message: 'Must be 32 or fewer characters long' }),
});

export async function createRoom(formData: FormData) {
  const validatedFields = createRoomSchema.safeParse({
    name: formData.get('name'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const id = await fetchMutation(api.room.create, {
    name: validatedFields.data.name,
  });

  return { id };
}
