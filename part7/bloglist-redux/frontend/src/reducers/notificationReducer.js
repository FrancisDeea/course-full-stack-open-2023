import { createSlice } from "@reduxjs/toolkit"

const initialState = null;

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const handleNotification = (message) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => dispatch(clearNotification()), 5000)
    }
}

export default notificationSlice.reducer