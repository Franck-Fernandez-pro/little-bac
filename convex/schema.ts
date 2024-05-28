import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    admin: v.id('users'),
    // users: v.array(v.id('users')),
  }),
  users: defineTable({
    name: v.string(),
  }),
});
