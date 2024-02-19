import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo:localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : "0",
}

export const userslice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginInfro: (state,actions) => {
      
      state.userInfo = actions.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { userLoginInfro } = userslice.actions;

export default userslice.reducer