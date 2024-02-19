import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';



const Group = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo)
  let [groupname, setGroupname] = useState('')
  let [groupmadal, setGroupmodal] = useState(false)
  let [grouplist,setGroupList]=useState([])


  let handleGroupmodel = () => {
    setGroupmodal(!groupmadal)
  }

  let handleCreatBtn = () => {
    set(push(ref(db, 'group/')), {
      groupname: groupname,
      admin: data.displayName,
      admimid: data.uid
    }).then(() => {
      setGroupmodal(false)
    })
  }

  useEffect(() => {
    const starCountRef = ref(db, 'group/');
    onValue(starCountRef, (snapshot) => {
      let array=[]
      snapshot.forEach((item)=>{
        if(data.uid !== item.val().admimid){

          array.push({...item.val(),id:item.key})
        }
      })
      setGroupList(array)
    });  
  }, [])
  let handleGroujoin =(item)=>{
    set(push(ref(db, 'groupRequest/')), {
      groupname: item.groupname,
      admin: item.admin,
      admimid: item.admimid,
      requestname:data.displayName,
      requestid:data.uid,
    }).then(()=>{
      
    })
  }
  return (
    <div className='h-[305px]'>
      <div className='mt-1 relative '>
        <input className='w-full h-[45px] rounded-2xl shadow-2xl pl-12' type="text" placeholder='Search' />
        <CiSearch className='text-2xl absolute top-4 left-4' />
        <BsThreeDotsVertical className='absolute top-4 right-4' />
      </div>
      <div className=' shadow-2xl p-3 rounded-[20px] '>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='font-nunito text-[20px] font-bold text-[#000000]'>
              {groupmadal ? "Creat Your Group" : "Groups Request"}
            </h2>
          </div>
          <div>
            <button onClick={handleGroupmodel} className='px-[17px] py-[3px]  bg-[#5F35F5] text-[white] rounded-[5px] font-bold text-[20px]'>
              {groupmadal ? "Goback" : "Creatgroup"}
            </button>
          </div>
        </div>
        {groupmadal ?
          <div>
            <input onChange={(e) => setGroupname(e.target.value)}
              className='mt-5 rounded-[8px] w-full h-[40px] font-nunito  border-2  border-solid  border-[#3edeb1] pl-4 outline-none' type="text" placeholder='Group Name' />
            <button onClick={handleCreatBtn} className=' rounded-[8px] w-full h-[40px] bg-[#3735e2] font-nunito text-[white] font-bold   mt-5'>Creat</button>
          </div>
          :
          <div className='w-full h-[200px] overflow-y-scroll'>
            {grouplist.map((item)=>(
            <div className='flex items-center justify-between mt-4 border-b pb-3'>
              <img src="group.png" alt="group" />
              <div>
                <h3 className='font-nunito text-[18px] font-bold text-[#000000]'>{item.groupname}</h3>
                <p className='font-nunito text-[14px] font-semibold text-[#4D4D4D]
              '><span className='text-[#4ef25e]'>Admin :</span>{item.admin}</p>
              </div>
              <button onClick={()=>handleGroujoin(item)}
              className='px-[20px] py-[5px]  bg-[#5F35F5] text-[white] rounded-[5px] font-bold text-[20px]'>Join</button>
            </div>
            ))}
  
          </div>
        }
      </div>

    </div>
  )
}

export default Group