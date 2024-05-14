import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const id = await ctx.db.insert('rooms', { name });
    return id;
  },
});
