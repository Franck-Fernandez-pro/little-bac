import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

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
    });
    return id;
  },
});
