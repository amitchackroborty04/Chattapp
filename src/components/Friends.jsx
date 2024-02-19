import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector,useDispatch } from 'react-redux';
import { activechatInfo } from '../pages/slice/chatSlice';

export const Friends = () => {
  const db = getDatabase();
  const dispatch = useDispatch()
  const data = useSelector((state)=> state.userLoginInfo.userInfo)
  let [friendlist,setFriendList]= useState([])


  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
     let array = []
     snapshot.forEach((item)=>{
      if(data.uid == item.val().senderid || data.uid == item.val().reciverid){
        array.push({...item.val(), id:item.key});
      }
     })
     setFriendList(array)
    }); 
  },[])

  let handlaeBlock =((item)=>{
    console.log(item);
    if(data.uid == item.senderid){
      set(push(ref(db, 'block/')), {
        block:item.recivername,
        blockid:item.reciverid,
        blockby:data.displayName,
        blockbyid:data.uid
      }).then(()=>{
        remove(ref(db, 'friend/' + item.id))
      })
    }else{
      set(push(ref(db, 'block/')), {
        block:item.sendername,
        blockid:item.senderid,
        blockby:item.recivername,
        blockbyid:item.reciverid
      }).then(()=>{
        remove(ref(db, 'friend/' + item.id))
        
      })
    }
  })
  let handlemsgInfo=(item)=>{
    if(data.uid == item.senderid){

      dispatch(activechatInfo({name : item.recivername, id: item.reciverid}))
      // localStorage.setItem('chatInfo',JSON.stringify(item))
    }else{
      dispatch(activechatInfo({name : item.sendername, id: item.senderid}))
      // localStorage.setItem('chatInfo',JSON.stringify(item))
      
    }
  }

  return (
    <div>
      <div className=' shadow-2xl p-5 rounded-[20px] '>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='font-nunito text-[20px] font-bold text-[#000000]'>Friends</h2>
          </div>
          <div>
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className='w-full h-[234px] overflow-y-scroll'>
          {friendlist.map((item)=>(
          <div onClick={()=>handlemsgInfo(item)} className='flex items-center justify-between mt-4 border-b pb-3'>
            <img className='w-[50px] h-[50px]' src="group.png" alt="group" />
            <div>
              {data.uid == item.senderid ?
              (
                <h3 className='font-nunito text-[14px] font-bold text-[#000000]'>{item.recivername}</h3>
              )
              :
              <h3 className='font-nunito text-[14px] font-bold text-[#000000]'>{item.sendername}</h3>
            }
              <p className='font-nunito text-[12px] font-semibold text-[#4D4D4D]
              '>Dinner?</p>
            </div>
            <button onClick={()=>handlaeBlock(item)} className='bg-[#5F35F5] text-[white] text-[20px] font-semibold px-[8px] rounded-[5px]'> Block</button>
          </div>
          ))}
        </div>
      </div>

    </div>
  )
}
