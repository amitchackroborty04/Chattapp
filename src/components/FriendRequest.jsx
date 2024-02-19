import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
  const db = getDatabase();
  const data = useSelector((state)=> state.userLoginInfo.userInfo)
  let [friendrequestList,setFriendrequestlist]= useState([])
  useEffect(() => {
    const starCountRef = ref(db, 'friendrequest/');
    onValue(starCountRef, (snapshot) => {
     let array = []
     snapshot.forEach((item)=>{
      if(data.uid == item.val().reciverid){
        array.push({...item.val(), id:item.key});
      }
     })
     setFriendrequestlist(array)
    });
    
  },[])
 
  let handlefriendrequestAccept =((item)=>{
    console.log(item);
    set(push(ref(db, 'friend/')), { 
      ...item
    }).then(()=>{
      remove(ref(db, 'friendrequest/' + item.id))
    })
  })
  return (
    <div className='mt-1'>
      <div className=' shadow-2xl p-5 rounded-[20px] '>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='font-nunito text-[20px] font-bold text-[#000000]'>Friend  Request</h2>
          </div>
          <div>
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className='w-full h-[210px] overflow-y-scroll'>
          {friendrequestList.map((item)=>(
          <div className='flex items-center justify-between mt-4 border-b pb-3'>
            <img src="group.png" alt="group" />
            <div>
              <h3 className='font-nunito text-[18px] font-bold text-[#000000]'>{item.sendername}</h3>
              <p className='font-nunito text-[14px] font-semibold text-[#4D4D4D]
              '>Hi Guys, Wassup!</p>
            </div>
            <button onClick={()=>handlefriendrequestAccept(item)} className='px-[20px] py-[5px]  bg-[#5F35F5] text-[white] rounded-[5px] font-bold text-[20px]'>Accept</button>
          </div>
          ))}


        </div>
      </div>

    </div>
  )
}

export default FriendRequest