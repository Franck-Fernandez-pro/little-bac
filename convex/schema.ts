import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    admin: v.id('users'),
    usersId: v.array(v.id('users')),
    state: v.union(
      v.literal('waiting'),
      v.literal('running'),
      v.literal('ended')
    ),
    letter: v.optional(v.string()),
    results: v.optional(
      v.array(
        v.object({
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
        })
      )
    ),
  }),
  users: defineTable({
    name: v.string(),
  }),
});
