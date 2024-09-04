import { mutation,query } from "./_generated/server";
import { v }from 'convex/values';

export const getDoc  = query({
    args:{
        id:v.optional(v.string())
    },
    handler:async(ctx,args)=>{
        const { id } = args;
        if(!id){
            return [];
        }
        return await ctx.db.get(id)
    }
})

export const getDocById  = query({
    args:{
        id:v.optional(v.string())
    },
    handler:async(ctx,args)=>{
        const { id } = args;
        const user = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("id"), id))
            .collect();
        if(!user){
            return [];
        }
        return user[0];
    }
})