import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
  args: { id: v.union(v.null(), v.id('users')) },
  handler: async (ctx, { id }) => (id !== null ? await ctx.db.get(id) : null),
});

export const create = mutation({
  args: { name: v.optional(v.string()) },
  handler: async (ctx, { name = 'unknown' }) => {
    const id = await ctx.db.insert('users', { name });
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id('users') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
