import React, { useEffect } from 'react'
import Sideber from '../components/Sideber'
import Group from '../components/Group'
import FriendRequest from '../components/FriendRequest'
import { Friends } from '../components/Friends'
import MyGroup from '../components/MyGroup'
import { Userlist } from '../components/Userlist'
import BlockUser from '../components/BlockUser'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfro } from './slice/userslice'




const Home = () => {
  const auth = getAuth();
  const dispatch= useDispatch()
  const navigate=useNavigate()
  const data = useSelector((state)=> state.userLoginInfo.userInfo)
  
  useEffect(()=> {
   if(data == "null"){
    navigate("/")
   }
  },[])
  onAuthStateChanged(auth, (user) => {
   
    if (user) {
     dispatch(userLoginInfro(user))
     localStorage.setItem('userinfo',JSON.stringify(user))
      
    } 
  });
  

  return (
    <div>
    {data.emailVerified ?
    <div className='flex gap-14'>
      <div className='w-[186px] h-screen'>
        <Sideber active='home' />
      </div>
      <div className='w-[427px] h-[347px] '>
        <Group />
        <FriendRequest />
      </div>
      <div className='w-[344px] '>
        <Friends />
        <MyGroup />
      </div>
      <div className='w-[344px]'>
        <Userlist />
        <BlockUser />
      </div>
    </div>
    :
    <div className='w-full h-screen flex justify-center items-center bg-[#a49889]'>
      <h1 className='font-nunito text-[20px] font-bold text-[red]'>please varify your email</h1>
    </div>
    }
    </div>

  )
}

export default Home