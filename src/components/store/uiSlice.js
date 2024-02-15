import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   cartIsVisible: false,
   notification: null,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggle, showNotification } = uiSlice.actions

export default uiSlice.reducer