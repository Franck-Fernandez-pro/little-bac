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
      v.literal('collecting'),
      v.literal('results')
    ),
    letter: v.optional(v.string()),
    results: v.optional(
      v.array(
        v.object({
          userId: v.id('users'),
          response: v.object({
            animal: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            country: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            job: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            fruit: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            city: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            brand: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            object: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            celebrity: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            sport: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            bodyPart: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            instrument: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            dailyObject: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
            superHero: v.object({
              value: v.string(),
              correct: v.optional(v.boolean()),
            }),
          }),
        })
      )
    ),
  }),
  users: defineTable({
    name: v.string(),
  }),
});
