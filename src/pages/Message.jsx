import React from 'react'
import Sideber from '../components/Sideber'
import Group from '../components/Group'
import { Friends } from '../components/Friends'
import MyGroup from '../components/MyGroup'
import Messagebox from '../components/Messagebox'

const Message = () => {
  return (
    <div className='flex justify-between'>
        <div className='w-[161px] h-screen'>
            <Sideber active='message'/>
        </div>
        <div className='w-[344px]'>
         <Friends/> 
         <MyGroup/>  
        </div>
        <div className='w-[650px] h-[580px] shadow-2xl rounded-[20px]'>
        <Messagebox/>
        </div>
    </div>
  )
}

export default Message