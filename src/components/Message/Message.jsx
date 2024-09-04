"use client"
import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { SendIcon } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';
import JoinOrg from '../organization/JoinOrg';
const Message = ({sender,data,text,setText,handeleMessage}) => {
  const { members } = data;
  const { _id } =  sender;
  
  const isMember = members?.some((mem)=>(mem.personId).includes(_id));
  if(members){
    if(!isMember){
      return(
        <JoinOrg senderId={_id} orgId={data._id}/>
      )
    }
  }
  return (
    <div>
        <form className='flex items-center justify-center gap-2' onSubmit={(e)=>{
            e.preventDefault()
            handeleMessage(text)
        }}>
            <Input type="text" className="text-black text-xl" value={text} onChange={(e)=>{
                e.preventDefault();
                setText(e.target.value);
            }}/>
            <SendIcon size={45} className='bg-[#151515] p-3 rounded-lg cursor-pointer' onClick={()=>handeleMessage(text)}/>
        </form>
    </div>
  )
}

export default Message