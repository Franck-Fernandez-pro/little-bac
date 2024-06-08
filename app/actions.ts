'use server';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { CATEGORIES_KEYS } from '@/lib/utils';
import { fetchMutation } from 'convex/nextjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// ------------------------------------------------------ CREATE ROOM
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
    usersId: [data.userId as Id<'users'>],
  });

  redirect(`/room/${id}`);
}

// ------------------------------------------------------ SEND RESPONSE
const sendResponseSchema = z.object({
  roomId: z.string({ required_error: 'roomId is required' }),
  userId: z.string({ required_error: 'userId is required' }),

  animal: z.string().nullable(),
  country: z.string().nullable(),
  job: z.string().nullable(),
  fruit: z.string().nullable(),
  city: z.string().nullable(),
  brand: z.string().nullable(),
  object: z.string().nullable(),
  celebrity: z.string().nullable(),
  sport: z.string().nullable(),
  bodyPart: z.string().nullable(),
  instrument: z.string().nullable(),
  dailyObject: z.string().nullable(),
  superHero: z.string().nullable(),
});

export async function sendResponse(formData: FormData) {
  console.log(formData.get('roomId'));
  const { data, success, error } = sendResponseSchema.safeParse({
    roomId: formData.get('roomId'),
    userId: formData.get('userId'),

    animal: formData.get('animal'),
    country: formData.get('country'),
    job: formData.get('job'),
    fruit: formData.get('fruit'),
    city: formData.get('city'),
    brand: formData.get('brand'),
    object: formData.get('object'),
    celebrity: formData.get('celebrity'),
    sport: formData.get('sport'),
    bodyPart: formData.get('bodyPart'),
    instrument: formData.get('instrument'),
    dailyObject: formData.get('dailyObject'),
    superHero: formData.get('superHero'),
  });

  // Return early if the form data is invalid
  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    };
  }
}
