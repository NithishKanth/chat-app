import { defineSchema,defineTable } from "convex/server";
import { v } from 'convex/values';
import { query } from "./_generated/server";

export const getNames = query({
    args:{
        text:v.string()
    },
    handler:async(ctx,args)=>{
        const { text } = args;
        if(!text){
            return []
        }
        const users = await ctx.db.query("user").collect();
        const orgs = await ctx.db.query("organization").collect();

        const newList = users.filter((user)=>(
            ((user.fullName.toLowerCase()).includes(text.toLocaleLowerCase()))
        ));
        const newOrg = orgs.filter((org)=>(
            ((org.fullName.toLowerCase()).includes(text.toLocaleLowerCase()))
        ));
        return [...newList,...newOrg];
    }
})