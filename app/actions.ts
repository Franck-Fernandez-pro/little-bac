'use server';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
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

  animal: z.string(),
  country: z.string(),
  job: z.string(),
  fruit: z.string(),
  city: z.string(),
  brand: z.string(),
  object: z.string(),
  celebrity: z.string(),
  sport: z.string(),
  bodyPart: z.string(),
  instrument: z.string(),
  dailyObject: z.string(),
  superHero: z.string(),
});

export async function sendResponse(formData: FormData) {
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

  await fetchMutation(api.room.sendResponse, {
    roomId: data.roomId as Id<'rooms'>,
    userId: data.userId as Id<'users'>,
    response: {
      animal: data.animal,
      country: data.country,
      job: data.job,
      fruit: data.fruit,
      city: data.city,
      brand: data.brand,
      object: data.object,
      celebrity: data.celebrity,
      sport: data.sport,
      bodyPart: data.bodyPart,
      instrument: data.instrument,
      dailyObject: data.dailyObject,
      superHero: data.superHero,
    },
  });
}
