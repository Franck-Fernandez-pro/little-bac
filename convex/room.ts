import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: { name: v.string(), admin: v.id("users") },
  handler: async (ctx, { name, admin }) => {
    const id = await ctx.db.insert('rooms', { name, admin });
    return id;
  },
});
