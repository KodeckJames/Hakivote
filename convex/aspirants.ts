import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByRace = query({
  args: { raceId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("aspirants")
      .filter((q) => q.eq(q.field("raceId"), args.raceId))
      .collect();
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("aspirants").collect();
  },
});

export const initAspirants = mutation({
  args: {
    aspirants: v.array(v.object({
      name: v.string(),
      party: v.string(),
      avatarId: v.string(),
      raceId: v.string(),
    }))
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("aspirants").collect();
    if (existing.length > 0) return; // already seeded
    for (const asp of args.aspirants) {
      await ctx.db.insert("aspirants", asp);
    }
  }
});
