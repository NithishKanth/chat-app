import { useQuery } from 'convex/react'
import React, { useEffect, useRef } from 'react'
import { api } from '../../../convex/_generated/api'
import { ScrollArea } from '../ui/scroll-area';

const Chat = ({ person, sender,setPerson }) => {
  const getChats = useQuery(api.message.getChat, person ? { senderId: sender?._id, receiverId: person } : {});
  const data  = useQuery(api.document.getDoc,person?{id:person}:{id:""});
  function getTime(messageTime) {
    const messTime = new Date(messageTime);
    return messTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
  const ismember = data?.members?.some((mem)=>(mem.personId).includes(sender?._id));
  const divUnderMessages = useRef();
  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({behavior:'smooth', block:'end'});
    }
  }, [getChats]);
  return (
    <ScrollArea className="w-full h-full flex-1 p-3">
      <div className='flex-1 p-3 flex flex-col gap-1.5'>
        {(ismember===true || !data?.members) ?<>{getChats?.map((chat) => {
          const {fullName,senderId,orgId} = chat;
          return(
            <div 
              key={chat._id}
              className={`flex ${chat.senderId === sender?._id ? 'justify-end' : 'justify-start'} ${(!chat.senderId && !chat.receiverId && orgId) ? "justify-center":""}`}
            >
              <div className={`${(!chat.senderId && !chat.receiverId && orgId)? "px-4 py-2":"px-5 py-3"} rounded-xl break-words drop-shadow-lg max-w-[370px] relative text-wrap ${chat.senderId === sender?._id ? 'bg-black' : 'bg-[#2d2d2d]'} ${(!chat.senderId && !chat.receiverId && orgId) ?" bg-[#343434]":""}`}>
                {(fullName) && <div className='mb-2 text-sm underline cursor-pointer' onClick={()=>{
                  setPerson(senderId)
                }}>{fullName}</div>}
                <div className={`py-3 ${(!chat.senderId && !chat.receiverId && orgId) ? "text-[14px]":"text-xl"}`}>{chat?.text}</div>
                <div className={`text-sm ${chat.senderId === sender?._id ? 'text-right' : 'text-left'} ${(!chat.senderId && !chat.receiverId && orgId)?"noTime":""}`}>{getTime(chat?._creationTime)}</div>
              </div>
            </div>
        )})}</>
        :<></>}
        
      </div>
      <div ref={divUnderMessages}></div>
    </ScrollArea>
  );
}

export default Chat;
