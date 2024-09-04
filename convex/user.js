import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const getUser = query({
    args:{
        id:v.string(),
    },
    handler:async(ctx,args)=>{
        const user = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("id"), args.id))
            .collect();
        return user
    }
})

export const createUser = mutation({
    args:{
        id:v.string(),
        firstName:v.optional(v.string()),
        lastName:v.optional(v.string()),
        fullName:v.optional(v.string()),
        emailAddress:v.string(),
        primaryEmailAddressId:v.string(),
        imageUrl:v.string(),
    },
    handler:async(ctx,args)=>{
        const {id,firstName,lastName,fullName,emailAddress,primaryEmailAddressId,imageUrl} = args;

        const user = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("id"), args.id))
            .collect();
        if(user.length===0)
       { 
            await ctx.db.insert("user",{
                id,
                firstName,
                lastName,
                fullName,
                emailAddress,
                primaryEmailAddressId,
                imageUrl,
                connections:[]
        })}
    }
})

export const updateProfile = mutation({
    args:{
        id:v.string(),
        imageUrl:v.string()
    },
    handler:async(ctx,args)=>{
        const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("id"), args.id))
        .collect();
        const { _id } = user[0];

        await ctx.db.patch(_id,{imageUrl:args.imageUrl});
    }
})