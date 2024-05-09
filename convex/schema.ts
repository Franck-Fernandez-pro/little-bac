import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    users: v.array(v.object({ id: v.string(), name: v.string() })),
  }),
});
