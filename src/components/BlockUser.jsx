import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockUser = () => {
  const db = getDatabase();
  const data = useSelector((state)=> state.userLoginInfo.userInfo)
  let [bolcklist,setBlocklist]= useState([])

  useEffect(() => {
    const friendRef = ref(db, 'block/');
    onValue(friendRef, (snapshot) => {
     let array = []
     snapshot.forEach((item)=>{
      // array.push(item.val())
      if(data.uid== item.val().blockbyid){
        array.push({
          blockid:item.val().blockid,
          block:item.val().block,
          id:item.key
        }
        )
      }else 
      if(data.uid== item.val().blockid){
        array.push({
          blockbyid:item.val().blockbyid,
          blockby:item.val().blockby,
          id:item.key
        })
      }
     })
     setBlocklist(array)
    }); 
  },[])

  let handkeUnblock =(item)=>{
    set(push(ref(db, 'friend/')), {
      sendername: data.displayName,
      senderid: data.uid,
      recivername: item.block,
      reciverid: item.blockid
    }).then(()=>{
      remove(ref(db, 'block/' + item.id))
      
    })
  }
  return (
    <div className='mt-1'>
    <div className=' shadow-2xl p-5 rounded-[20px] '>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='font-nunito text-[20px] font-bold text-[#000000]'>Blocked Users</h2>
        </div>
        <div>
          <BsThreeDotsVertical />
        </div>
      </div>
      <div className='w-full h-[210px] overflow-y-scroll'>
      {bolcklist.map((item)=>(
      <div className='flex items-center  mt-4 border-b pb-3'>
        <img className='w-[50px] h-[50px]' src="group.png" alt="group" />
        <div>
          <h3 className='ml-3 font-nunito text-[14px] font-bold text-[#000000]'>{item.block}</h3>

          <h3 className='ml-3 font-nunito text-[14px] font-bold text-[#000000]'>{item.blockby}</h3>

          <p className='ml-3 w-[76px] font-nunito text-[10px] font-semibold text-[#000000]
            '>Today, 8:56pm</p>
        </div>
        {item.blockid  && (
        <button onClick={()=>handkeUnblock(item)} className='ml-[5px] px-[9px]  bg-[#5F35F5] text-[white] rounded-[5px] font-bold text-[18px]'>unblock</button>
        )}
      </div>
      ))}
      </div>
    </div>

  </div>
  )
}

export default BlockUser