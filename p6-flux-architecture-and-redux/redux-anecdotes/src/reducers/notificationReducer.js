import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationMessage(state, action){
      return action.payload
    },
    clearNotification(){
      return null
    }
  }
})

export const {setNotificationMessage, clearNotification} = notificationSlice.actions

export const setNotification = (message, timeSeconds) => {
  return async dispatch => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => dispatch(clearNotification()), timeSeconds * 1000)
  }
}
export default notificationSlice.reducer