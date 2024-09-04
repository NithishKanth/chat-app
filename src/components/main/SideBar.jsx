"use client"
import { UserButton } from '@clerk/clerk-react'
import React from 'react'

const SideBar = () => {
  return (
    <div className='w-fit h-full bg-[#242323] p-2 flex items-end'>
        <UserButton />
    </div>
  )
}

export default SideBar