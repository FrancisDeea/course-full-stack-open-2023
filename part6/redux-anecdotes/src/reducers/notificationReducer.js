import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: "notification",
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

export const handleNotification = (message, seconds) => {
    return async dispatch => {
        const miliseconds = seconds * 1000
        await dispatch(setNotification(message))
        setTimeout(() => dispatch(clearNotification(message)), miliseconds)
    }
}

export default notificationSlice.reducer