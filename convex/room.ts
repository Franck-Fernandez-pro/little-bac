import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { randomLetter } from '../lib/utils';

export const get = query({
  args: { id: v.id('rooms') },
  handler: async (ctx, { id }) => {
    const room = await ctx.db.get(id);

    if (!room) return room;

    const userPromises = room.usersId.map((userId) => ctx.db.get(userId));
    const users = (await Promise.all(userPromises)).filter((user) => user);

    return { ...room, users };
  },
});

export const addUser = mutation({
  args: {
    roomId: v.id('rooms'),
    userId: v.id('users'),
  },
  handler: async (ctx, { roomId, userId }) => {
    const room = await ctx.db.get(roomId);

    if (room?.usersId.includes(userId)) return;

    await ctx.db.patch(roomId, {
      usersId: room?.usersId ? [...room.usersId, userId] : [userId],
    });
  },
});

export const removeUser = mutation({
  args: {
    roomId: v.id('rooms'),
    userId: v.id('users'),
  },
  handler: async (ctx, { roomId, userId }) => {
    const room = await ctx.db.get(roomId);

    if (!room?.usersId.includes(userId)) return;
    const usersIds = room?.usersId || [];
    const filteredUsers = usersIds.filter((uId) => uId !== userId);

    await ctx.db.patch(roomId, {
      usersId: filteredUsers,
    });
  },
});

export const patchState = mutation({
  args: {
    roomId: v.id('rooms'),
    userId: v.id('users'),
    state: v.union(
      v.literal('waiting'),
      v.literal('running'),
      v.literal('collecting'),
      v.literal('results')
    ),
  },
  handler: async (ctx, { roomId, userId, state }) => {
    const room = await ctx.db.get(roomId);

    if (!room) return;
    if (!room.usersId.includes(userId)) return;

    await ctx.db.patch(roomId, {
      state,
      letter: state === 'running' ? randomLetter() : room.letter,
    });
  },
});

export const sendResponse = mutation({
  args: {
    roomId: v.id('rooms'),
    userId: v.id('users'),
    response: v.object({
      animal: v.string(),
      country: v.string(),
      job: v.string(),
      fruit: v.string(),
      city: v.string(),
      brand: v.string(),
      object: v.string(),
      celebrity: v.string(),
      sport: v.string(),
      bodyPart: v.string(),
      instrument: v.string(),
      dailyObject: v.string(),
      superHero: v.string(),
    }),
  },
  handler: async (
    ctx,
    {
      roomId,
      userId,
      response: {
        animal,
        country,
        job,
        fruit,
        city,
        brand,
        object,
        celebrity,
        sport,
        bodyPart,
        instrument,
        dailyObject,
        superHero,
      },
    }
  ) => {
    const room = await ctx.db.get(roomId);

    if (!room) return;
    if (room.state !== 'collecting') return;

    const results = room.results || [];
    if (results.some((r) => r.userId === userId)) return;

    await ctx.db.patch(roomId, {
      results: [
        ...results,
        {
          userId,
          response: {
            animal: { value: animal },
            country: { value: country },
            job: { value: job },
            fruit: { value: fruit },
            city: { value: city },
            brand: { value: brand },
            object: { value: object },
            celebrity: { value: celebrity },
            sport: { value: sport },
            bodyPart: { value: bodyPart },
            instrument: { value: instrument },
            dailyObject: { value: dailyObject },
            superHero: { value: superHero },
          },
        },
      ],
    });
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    admin: v.id('users'),
    usersId: v.optional(v.array(v.id('users'))),
  },
  handler: async (ctx, { name, admin, usersId = [] }) => {
    const id = await ctx.db.insert('rooms', {
      name,
      admin,
      usersId: usersId.length === 0 ? [admin] : usersId,
      state: 'waiting',
    });
    return id;
  },
});
