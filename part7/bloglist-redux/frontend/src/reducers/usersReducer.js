import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../services/users";

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        updateUsers(state, action) {
            
        }
    }
})

export const { setUsers, updateUsers } = usersSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
        const users = await getUsers()
        dispatch(setUsers(users))
    }
}

export default usersSlice.reducer