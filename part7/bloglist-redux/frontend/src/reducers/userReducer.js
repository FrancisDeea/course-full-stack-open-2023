import { createSlice } from "@reduxjs/toolkit";
import { handleNotification } from "./notificationReducer";
import { setToken } from "../services/blogs";
import login from '../services/login';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export const handleLogin = (credentials) => {
    return async dispatch => {
        try {
            const user = await login(credentials)
            setToken(user.token)
            dispatch(setUser(user))
            dispatch(handleNotification({ success: "Logged in successfully!" }))
            window.localStorage.setItem('user', JSON.stringify(user))
        }

        catch (error) {
            dispatch(handleNotification({ error: error.response.data.error }))
        }
    }
}

export const handleLogout = (message) => {
    return dispatch => {
        dispatch(setUser(null))
        dispatch(handleNotification({ error: message}))
        window.localStorage.clear()
    }
}

export default userSlice.reducer