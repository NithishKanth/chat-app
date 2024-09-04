import { defineSchema, defineTable } from "convex/server";
import { v } from 'convex/values';

export default defineSchema({
    user: defineTable({
        id: v.string(),
        firstName: v.optional(v.string()),
        lastName: v.optional(v.string()),
        fullName: v.optional(v.string()),
        emailAddress: v.string(),
        primaryEmailAddress: v.string(),
        connections:v.array(v.object()),
        imageUrl: v.string()
    })
    .index("user_id", ["id"])
    .index("email_address", ["emailAddress"]) 
    .index("primary_email_address", ["primaryEmailAddress"])
    .index("full_name", ["fullName"])
    .index("name_search", ["firstName", "lastName"]),

    conversations:defineTable({
        senderId:v.id("user"),
        receiverId:v.id("user"),
        text:v.string()
    })
    .index("sender",['senderId'])
    .index("receiver",["receiverId"]),

    organization:defineTable({
        id:v.string(),
        fullName:v.string(),
        members:v.array(),
        imageUrl:v.string(),
        slug:v.string()
    })
    .index("org_name",["fullName"])
    .index("org_slug",["slug"])
    .index("org_id",["id"])
});
