import { createSlice } from "@reduxjs/toolkit";
import { getAll, createBlog } from "../services/blogs";


const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        }
    }
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createNewBlog = (obj) => {
    return async dispatch => {
        const newBlog = await createBlog(obj)
        dispatch(appendBlog(newBlog))
    }
}

export default blogSlice.reducer