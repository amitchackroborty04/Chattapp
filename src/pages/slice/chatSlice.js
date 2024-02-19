import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chatdata: "amit",
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    activechatInfo: (state,actions) => {
     
      state.chatdata = actions.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { activechatInfo } = chatSlice.actions

export default chatSlice.reducer