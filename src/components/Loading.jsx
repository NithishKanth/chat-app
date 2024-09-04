import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-screen grid place-content-center'>
        <div className='p-4 rounded-full border-dashed border-4 border-green-900 animate-spin'>
        </div>
    </div>
  )
}

export default Loading