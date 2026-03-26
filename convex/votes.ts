import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const cast = mutation({
  args: {
    voterPhone: v.string(),
    selections: v.array(v.object({
      raceId: v.string(),
      aspirantId: v.id("aspirants"),
    })),
  },
  handler: async (ctx, args) => {
    const existingVotes = await ctx.db.query("votes")
      .withIndex("by_voter", (q) => q.eq("voterPhone", args.voterPhone))
      .collect();
    
    // allow resubmission for this demo by deleting previous
    for (const vote of existingVotes) {
      await ctx.db.delete(vote._id);
    }

    for (const sel of args.selections) {
      await ctx.db.insert("votes", {
        voterPhone: args.voterPhone,
        raceId: sel.raceId,
        aspirantId: sel.aspirantId,
      });
    }
  }
});

export const getUserVotes = query({
  args: { voterPhone: v.string() },
  handler: async (ctx, args) => {
    const votes = await ctx.db.query("votes")
      .withIndex("by_voter", (q) => q.eq("voterPhone", args.voterPhone))
      .collect();
    
    const populated = await Promise.all(votes.map(async (v) => {
      const aspirant = await ctx.db.get(v.aspirantId);
      return {
        ...v,
        aspirant,
      };
    }));
    
    return populated;
  }
});
