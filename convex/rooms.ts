import { query } from './_generated/server';

export const get = query({
  handler: async (ctx) =>
    await ctx.db
      .query('rooms')
      .filter((q) => q.eq(q.field('state'), 'waiting'))
      .collect(),
});
