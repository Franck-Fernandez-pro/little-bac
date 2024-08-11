'use server';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { fetchMutation } from 'convex/nextjs';
import { z } from 'zod';

const userSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Invalid Name',
      required_error: 'Name is required',
    })
    .min(1, {
      message: 'Must be 1 or more characters long',
    })
    .max(32, {
      message: 'Must be 32 or fewer characters long',
    }),
  userId: z.string({
    required_error: 'userId is required',
  }),
});

export async function patchUser(prevState: any, formData: FormData) {
  const { data, success, error } = userSchema.safeParse({
    name: formData.get('name'),
    userId: formData.get('userId'),
  });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    };
  }

  await fetchMutation(api.user.update, {
    id: data.userId as Id<'users'>,
    name: data.name,
  });

  return {
    ...prevState,
    errors: {},
    success: true,
  };
}
