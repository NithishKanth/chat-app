import { useQuery } from 'convex/react';
import Image from 'next/image';
import React from 'react'
import { api } from '../../../convex/_generated/api';

const Member = ({id,isadmin,setPerson}) => {
    const data = useQuery(api.document.getDoc,(id)?{id}:{id:""});
  return (
    <div className='flex items-center gap-3 cursor-pointer hover:bg-[#212121] py-3 px-4 rounded-lg drop-shadow-lg' onClick={()=>{
      if(!data) return
      setPerson(data?._id);
    }}>
      <div className='w-[55px] h-[55px]'>
        <Image src={data?.imageUrl} width={350} height={350} className='rounded-lg w-full h-full object-cover'/>
      </div>
      <div>
        {data?.fullName || "Loading..."}
        {isadmin && <p className='bg-white rounded-lg text-black w-fit p-1 px-2 font-semibold'>Admin</p>}
      </div>
    </div>
  )
}

export default Member