import React, { useState,useEffect } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue,push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const MyGroup = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo)
  let [mygrouplist,setMygrouplist]=useState([])
  let [mygrouprequestList,setMygrouprequestList]=useState([])
  let [groupreuestmodal,setGroupRequestmaodal]=useState(false)

  useEffect(() => {
    const starCountRef = ref(db, 'group/');
    onValue(starCountRef, (snapshot) => {
      let array=[]
      snapshot.forEach((item)=>{
        if(data.uid == item.val().admimid){
          array.push({...item.val(),id:item.key})
        }
      })
      setMygrouplist(array)
    }); 
  }, [])

 
  let handleDletgroup=()=>{
    remove(ref(db, 'group/' + item.id))
  }
  let handleGroupsettin=()=>{
    setGroupRequestmaodal(!groupreuestmodal)
  }
  useEffect(() => {
    const starCountRef = ref(db, 'groupRequest/');
    onValue(starCountRef, (snapshot) => {
      let array=[]
      snapshot.forEach((item)=>{
        if(data.uid== item.val().admimid){

          array.push({...item.val(),id:item.key})
        }
      })
      setMygrouprequestList(array)
    }); 
  }, [])
  console.log(mygrouprequestList);
  return (
    <div className='mt-1'>
    <div className='n shadow-2xl p-5 rounded-[20px]  '>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='font-nunito text-[20px] font-bold text-[#000000]'>{groupreuestmodal ? "Group Rrquest":"My Groups"}</h2>
        </div>
        <div>
          <BsThreeDotsVertical onClick={handleGroupsettin}
           />
        </div>
      </div>
      {groupreuestmodal ?
       <div className='w-full h-[210px] overflow-y-scroll'>
          {mygrouprequestList.map((item)=>(
            <div className='flex items-center justify-between mt-4 border-b pb-3'>
              <img className='w-[50px] h-[50px]' src="group.png" alt="group" />
              <div>
                <h3 className='font-nunito text-[14px] font-bold text-[#000000]'>{item.groupname}</h3>
                <p className='font-nunito text-[12px] font-semibold text-[#4D4D4D]
              '> <span className='text-[#47f38c]'>Name :</span>{item.requestname}</p>
              </div>
              <button className='bg-[#5F35F5] text-[white] text-[20px] font-semibold px-[8px] rounded-[5px]'>Accept</button>
             </div>    
          ))}
        </div>
      :
      <div className='w-full h-[210px] overflow-y-scroll'>
      {mygrouplist.map((item)=>(

      <div className='flex items-center justify-between mt-4 border-b pb-3'>
            <img className='w-[50px] h-[50px]' src="group.png" alt="group" />
            <div>
              <h3 className='font-nunito text-[14px] font-bold text-[#000000]'>{item.groupname}</h3>
              <p className='font-nunito text-[12px] font-semibold text-[#4D4D4D]
              '>Dinner?</p>
            </div>
            <button onClick={handleDletgroup} className='font-nunito text-[10px] text-[#f45858] font-medium'>Delate Group</button>
      </div>      
      ))}
     
      </div>
      }
     
    </div>

  </div>
  )
}

export default MyGroup