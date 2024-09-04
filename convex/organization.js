import { mutation } from "./_generated/server";
import { v } from 'convex/values';

export const createOrg = mutation({
    args:{
        id:v.string(),
        fullName:v.string(),
        slug:v.string(),
        imageUrl:v.string(),
        adminId:v.string()
    }
    ,handler:async(ctx,args)=>{
        const { id,fullName,imageUrl,slug,adminId }  = args;
        const members = [{personId:adminId,admin:true}];
        const {connections} = await ctx.db.get(adminId);
        const org = await ctx.db.insert("organization",{
            id,
            fullName,
            slug,
            imageUrl,
            members
        });
        const NewCon = [{id:org,text:""},...connections];
        await ctx.db.patch(adminId,{connections:NewCon});

        const { id:orgID } = await ctx.db.get(org);
        await ctx.db.insert(orgID,{
            orgId:org,
            text:`${fullName} created`
        })
    }
})

export const joinOrg = mutation({
    args:{
        orgId:v.id("organization"),
        personId:v.id("user")
    },
    handler:async(ctx,args)=>{
        const { orgId,personId } = args;
        const { members,id } = await ctx.db.get(orgId);
        const { connections,fullName } = await ctx.db.get(personId);
        const NewObj = [{personId,admin:false},...members];
        await ctx.db.patch(orgId,{members:NewObj});

        const NewCon = [{id:orgId,text:""},...connections];
        await ctx.db.patch(personId,{connections:NewCon});


        await ctx.db.insert(id,{
            text:`${fullName} Joined`,
            orgId:orgId
        })
    }
});

export const sendOrgMessage = mutation({
    args:{
        senderId:v.optional(v.id("user")),
        orgId:v.optional(v.id("organization")),
        text:v.string()
    },
    handler:async(ctx,args)=>{
        const { senderId,orgId,text } = args;
        const { id,members } = await ctx.db.get(orgId);
        const { _id,fullName } = await ctx.db.get(senderId);

        await ctx.db.insert(id,{
            orgId,
            text,  
            fullName,
            senderId:_id
        });

        for( let i of members){
            const { personId } = i;
            const { _id:orgConId,connections } = await ctx.db.get(personId);

            const NewCon = connections.filter((con)=>(con.id!==orgId));

            await ctx.db.patch(orgConId,{connections:[{id:orgId,text},...NewCon]});
        }
    }
});

export const ExitGroup = mutation({
    args:{
        personId:v.string(),
        orgId:v.string(),
    },
    handler:async(ctx,args)=>{
        const { personId,orgId } = args;
        const org = await ctx.db.get(orgId);
        const { fullName,connections }  = await ctx.db.get(personId);
        const { members,id } = org;
        const Newmembers = members.filter((mem)=>(mem.personId !==personId ));
        const NewCon = connections.filter((con)=>(con.id)!==orgId);
        await ctx.db.patch(personId,{connections:NewCon});
        await ctx.db.patch(orgId,{members:Newmembers});

        await ctx.db.insert(id,{
            text:`${fullName} left`,
            orgId:orgId
        })
    }
});

export const deleteGrp = mutation({
    args:{
        orgId:v.string(),
    },
    handler:async(ctx,args)=>{
        const { orgId } = args;
        const { members }  =await ctx.db.get(orgId);

        for( let i of members ){
            const { connections,_id:personId } = await ctx.db.get(i.personId);
            const NewCon = connections.filter((con)=>(con.id)!==orgId);
            await ctx.db.patch(personId,{connections:NewCon});
        }

        await ctx.db.delete(orgId);
    }
})

export const updateLogo = mutation({
    args:{
        orgId:v.string(),
        imageUrl:v.string(),
    },
    handler:async(ctx,args)=>{
        const { orgId,imageUrl } = args;
        const org = await ctx.db
            .query("organization")
            .filter((q) => q.eq(q.field("id"), orgId))
            .collect();
        if(!org){
            return []
        }
        const { _id:Id } = org[0]; 

        await ctx.db.patch(Id,{imageUrl})
    }
})