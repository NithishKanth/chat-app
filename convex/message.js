import { mutation,query } from "./_generated/server";
import { v } from 'convex/values';

const UpdateConnections = async(ctx,a,b,text)=>{
    const { _id:id,connections } = a;

    let NewSenderConnections = connections?.filter((con)=>((con.id)!==b)) || [];
    NewSenderConnections  =[{id:b,text} ,...NewSenderConnections];
    await ctx.db.patch(id,{connections:NewSenderConnections});
}

export const sendMessage = mutation({
    args:{
        senderId:v.string(),
        receiverId:v.string(),
        text:v.string(),
    },
    handler:async(ctx,args)=>{
        const { senderId,receiverId,text } = args;
        // console.log(args);
        await ctx.db.insert("conversations",{
            senderId,
            receiverId,
            text
        });

        const sender = await ctx.db.get(senderId);
        const receiver = await ctx.db.get(receiverId);

        if (sender && receiver) {
               await UpdateConnections(ctx, sender, receiverId, text)
               await UpdateConnections(ctx, receiver, senderId, text)
        }
    }
})

export const getChat = query({
    args:{
        senderId:v.string(),
        receiverId:v.string()
    },
    handler:async(ctx,args)=>{
        const { senderId,receiverId } = args;
        const chorg = await ctx.db.get(receiverId);
        if(chorg?.members){
         const Messages = await ctx.db.query(chorg?.id).collect();
         return Messages
        }
        const Messages = await ctx.db.query("conversations").collect();

        const NewMess = Messages.filter((mem)=>(
            (mem.senderId.includes(senderId) && mem.receiverId.includes(receiverId)) ||
            (mem.senderId.includes(receiverId) && mem.receiverId.includes(senderId))
            
        ))

        return NewMess;
    }
})