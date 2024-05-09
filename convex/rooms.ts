import { query } from './_generated/server';

export const get = query({
  handler: async (ctx) => {
    const rooms = await ctx.db.query('rooms').collect();
    return rooms;
  },
});
