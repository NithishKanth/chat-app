"use client"
import { useMutation, useQuery } from 'convex/react'
import React, { useState } from 'react'
import { api } from '../../../convex/_generated/api'
import Header from '../Message/Header'
import Message from '../Message/Message'
import Chat from '../Message/Chat'
import Home from './Home'

const MessageBox = ({person,user,setPerson}) => {
  const sendMessage = useMutation(api.message.sendMessage);
  const sendGrpMessage = useMutation(api.organization.sendOrgMessage);
  const handeleMessage = async(text)=>{
    if(!text || !sender || !person){
      return;
    }
    if(data.members){
      await sendGrpMessage({
        senderId:sender?._id,
        orgId:data?._id,
        text
      })
    }else{
      await sendMessage({
        senderId:sender?._id,
        receiverId:data?._id,
        text
      })
    }
    setText("");
  }
  const data = useQuery(api.document.getDoc,
    (person)?{id:person}:{id:""}
  )
  const sender = useQuery(api.document.getDocById,
    (user?.id)?{id:user?.id}:{id:""}
  );
  const [text,setText] = useState("");
  return (
    <div className='h-full w-full flex-1 bg-[#212121] text-white px-4 py-7 flex flex-col'>
      {(data && person)?
        <>
          <Header data={data} user={user} setPerson={setPerson}/>
          <Chat 
            person={person} 
            sender={sender}
            setPerson={setPerson}
          />
          <Message 
            sender={sender} 
            data={data} 
            text={text} 
            setText={setText} 
            handeleMessage={handeleMessage}
          />
        </>:
          <Home />
      }
    </div>
  )
}

export default MessageBox