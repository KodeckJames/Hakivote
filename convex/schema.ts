import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  aspirants: defineTable({
    name: v.string(),
    party: v.string(),
    avatarId: v.string(), // Identifier to map to local or remote image
    raceId: v.string(),   // e.g. "president", "governor", "mp", "mca", "womenrep"
  }),
  
  votes: defineTable({
    voterPhone: v.string(),
    raceId: v.string(),
    aspirantId: v.id("aspirants"),
  }).index("by_voter", ["voterPhone"]),
});
