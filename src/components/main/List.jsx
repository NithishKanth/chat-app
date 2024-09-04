"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Image from 'next/image';
import Connections from './Connections';
import { ScrollArea } from '../ui/scroll-area';
import { Group } from 'lucide-react';
import CreateOrg from '../organization/CreateOrg';

const List = ({user,person,setPerson}) => {
  const [text,setText] = useState("");
  const Names = useQuery(api.list.getNames,{
    text
  });
  const CurrUser = useQuery(api.document.getDocById,(user?.id)?{id:user.id}:{id:""});
  
  return (
    <div className='w-[380px] bg-[#313131] py-7 px-5 text-white flex flex-col gap-3'>
        <div className='text-3xl flex items-center justify-between font-semibold'>
            Chat
            <CreateOrg CurrUser={CurrUser}/>
        </div>
        <div>
            <Input className="text-black text-xl" placeholder="Search" value={text} onChange={(e)=>{
              setText(e.target.value)
            }}/>
        </div>
        {(Names?.length!==0) ?
                <div className='flex flex-col gap-1.5'>
                  {Names?.map((name,index)=>{
                    const { fullName,_id,imageUrl } = name;
                    return(
                      <div key={index} className={`flex items-center gap-4 px-4 py-6 rounded-xl bg-[#212121] drop-shadow-md cursor-pointer ${(person?.includes(_id)) && "person"}`} onClick={()=>{
                        setPerson(_id)
                      }}>
                        <div>
                          <Image src={imageUrl} width={245} height={245} alt='pros' className='rounded-lg w-[45px] h-[45px] object-cover'/>
                        </div>
                        <div>{fullName}</div>
                      </div>
                    )
                  })}
                </div>
              :
                <ScrollArea className="">
                  {CurrUser?.connections?.map((con,index)=>{
                    const { id,text } = con;
                    return(
                      <Connections id={id} text={text} person={person} setPerson={setPerson} key={index}/>
                    )
                  })}
                </ScrollArea>
        }
    </div>
  )
}

export default List