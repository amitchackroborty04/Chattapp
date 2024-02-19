import { configureStore } from '@reduxjs/toolkit'
import  userLoginInfro  from './pages/slice/userslice'
import chatSlice from './pages/slice/chatSlice'


export const store = configureStore({
  reducer: {
    userLoginInfo:userLoginInfro,
    activeUsermsg:chatSlice
  },
})