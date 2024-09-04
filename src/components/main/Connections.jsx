import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../convex/_generated/api'
import Image from 'next/image';

const Connections = ({ id, text, person, setPerson }) => {
  const data = useQuery(api.document.getDoc, id ? { id } : { id: "" });

  return (
    <div
      className={`con mb-1.5 px-4 py-6 rounded-xl bg-[#212121] drop-shadow-md cursor-pointer 
      ${!data && 'animate-pulse'} ${(person?.includes(id)) && 'person'}`}
      onClick={() => setPerson(id)}
    >
      <div className={`rounded-lg h-[50px] ${!data?.imageUrl && "animate-pulse"}`}>
        {(data?.imageUrl) &&
          <Image 
          src={data?.imageUrl} 
          width={245} 
          height={245} 
          alt='pros' 
          className='rounded-lg w-full h-full object-cover'
        />
        }
      </div>
      <div className='detail overflow-hidden'>
        <p>{data?.fullName || 'Loading...'}</p>
        {text && <p>{text}</p>}
      </div>
    </div>
  );
};

export default Connections;
