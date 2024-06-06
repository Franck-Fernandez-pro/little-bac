import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    admin: v.id('users'),
    usersId: v.array(v.id('users')),
    state: v.union(v.literal('waiting'), v.literal('ended')),
  }),
  users: defineTable({
    name: v.string(),
  }),
});
