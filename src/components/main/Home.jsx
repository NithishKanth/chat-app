import Image from 'next/image'
import React from 'react'
import chat from '../../../public/chat.svg';

const Home = () => {
  return (
    <div className='size-full flex flex-col items-center justify-center gap-2'>
        <Image src={chat} width={55} height={55} alt='no'/>
        <div className='text-2xl'>Chat with your friends</div>
    </div>
  )
}

export default Home