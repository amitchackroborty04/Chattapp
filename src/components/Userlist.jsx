import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

export const Userlist = () => {
  const db = getDatabase()
  const data = useSelector((state) => state.userLoginInfo.userInfo)

  let [userlist, setUserlist] = useState([])
  let [userserchlist, setUserSerchlist] = useState([])
  let [friendlist,setFriendList]= useState("")
  let [friend,setFriend]=useState([])
  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      let arry = []
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          arry.push({ ...item.val(), id: item.key })
        }
      })
      setUserlist(arry)
    });
  }, [])

  let handleFriendrequest = (item) => {
    set(push(ref(db, 'friendrequest/')), {
      sendername: data.displayName,
      senderemail: data.email,
      senderid: data.uid,
      recivername: item.fullname,
      reciveremail: item.email,
      reciverid: item.id
    }).then(() => {
      alert('Done')
    })
  }

  useEffect(() => {
    const friendrequesReg = ref(db, 'friendrequest/');
    onValue(friendrequesReg, (snapshot) => {
      let array=[]
      snapshot.forEach((item)=>{
        array.push(item.val().reciverid + item.val().senderid)
      })
      setFriendList(array)
    });
  }, [])

  useEffect(() => {
    const friendrequesReg = ref(db, 'friend/');
    onValue(friendrequesReg, (snapshot) => {
      let array=[]
      snapshot.forEach((item)=>{
        array.push(item.val().reciverid + item.val().senderid)
      })
      setFriend(array)
    });
  }, [])

  let handleSerch =(e)=>{
   let data = userlist.filter((item)=>item.fullname.toLowerCase(). includes(e.target.value.toLowerCase()) )
   setUserSerchlist(data);
  }


  return (
    <div>
      <div className=' shadow-2xl p-5 rounded-[20px] '>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='font-nunito text-[20px] font-bold text-[#000000]'>User List</h2>
          </div>
          <div>
            <BsThreeDotsVertical />
          </div>
        </div>
        <div>
          <input onChange={handleSerch} className='w-full h-[30px] border border-1 border-solid rounded-[8px] shadow-xl font-nunito px-5 outline-none ' type="text" placeholder='Search friend' />
        </div>
        <div className='w-full h-[200px] overflow-y-scroll'>
          {userserchlist.length> 0 ?
          userserchlist.map((item)=>(
             <div className='flex justify-between items-center mt-4 border-b pb-3'>
             <img className='w-[50px] h-[50px]' src={item.images} alt="group" />
             <div>
               <h3 className='ml-3 font-nunito text-[14px] font-bold text-[#000000]'>{item.fullname}</h3>
               
               <p className='ml-3 w-[76px]  font-nunito text-[10px] font-semibold text-[#000000]
             '>Today, 8:56pm</p>           
             </div>
             {
              friend.includes(data.uid + item.id) || 
              friend.includes(item.id + data.uid) ?
              (
               <button  className=' bg-[#5F35F5] text-[white] text-[20px] font-semibold px-[8px] rounded-[5px] '>F</button>
             )
             :
             
             friendlist.includes(data.uid + item.id) || 
             friendlist.includes(item.id + data.uid) ? 
             (
               <button  className=' bg-[#5F35F5] text-[white] text-[20px] font-semibold px-[8px] rounded-[5px] '>-</button>
             )
             :
             (
               <button onClick={() => handleFriendrequest(item)} className=' bg-[#5F35F5] text-[white] text-[20px] font-semibold px-[8px] rounded-[5px] '>+</button>
             )
           }
           </div>
          ))
          :
          userlist.map((item) => (
            <div className='flex justify-between items-center mt-4 border-b pb-3'>
              <img className='w-[50px] h-[50px]' src={item.images} alt="group" />
              <div>
                <h3 className='ml-3 font-nunito text-[14px] font-bold text-[#000000]'>{item.fullname}</h3>
                
                <p className='ml-3 w-[76px]  font-nunito text-[10px] font-semibold text-[#000000]
              '>Today, 8:56pm</p>           
              </div>
              {
               friend.includes(data.uid + item.id) || 
               friend.includes(item.id + data.uid) ?
               (
                <button  className=' bg-[#5F35F5] text-[white] text-[20px] font-semibold px-[8px] rounded-[5px] '>F</button>
              )
              :
              
              friendlist.includes(data.uid + item.id) || 
              friendlist.includes(item.id + data.uid) ? 
              (
                <button  className=' bg-[#5F35F5] text-[white] text-[20px] font-semibold px-[8px] rounded-[5px] '>-</button>
              )
              :
              (
                <button onClick={() => handleFriendrequest(item)} className=' bg-[#5F35F5] text-[white] text-[20px] font-semibold px-[8px] rounded-[5px] '>+</button>
              )
            }
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}
