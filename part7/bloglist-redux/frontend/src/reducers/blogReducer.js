import { createSlice } from "@reduxjs/toolkit";
import { getAll, createBlog, update, remove, comment } from "../services/blogs";
import { handleNotification } from "./notificationReducer";


const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlogs(state, action) {
            const updatedBlog = action.payload
            return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
        },
        filterBlogs(state, action) {
            const removedId = action.payload
            return state.filter(blog => blog.id !== removedId)
        }
    }
})

export const { setBlogs, appendBlog, updateBlogs, filterBlogs } = blogSlice.actions

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

export const updateBlog = (obj, id) => {
    return async dispatch => {
        const updatedBlog = await update(obj, id)
        dispatch(updateBlogs(updatedBlog))
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        try {
            const response = await remove(id)
            dispatch(filterBlogs(id))
            dispatch(handleNotification({ success: "Deleted successfully!" }))
        } catch (error) {
            const messageErr = error.response.data.error
            dispatch(handleNotification({ error: messageErr }))
            if (messageErr.includes("expired")) {
                window.localStorage.clear()
            }
        }
    }
}

export const addComment = (obj, id) => {
    return async dispatch => {
        const commentedBlog = await comment(obj, id)
        dispatch(updateBlogs(commentedBlog))
        dispatch(handleNotification({ success: "Comment has added successfully!"}))
    }
}

export default blogSlice.reducer