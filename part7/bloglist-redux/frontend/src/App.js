import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { handleNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'

import { setToken, updateBlog, deleteBlog } from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])


  const createFormRef = useRef()

  const handleLikes = async (newBlog, id) => {
    try {
      const updated = await updateBlog(newBlog, id)
      const newBlogs = blogs.map(blog => blog.id === id ? updated : blog)
      setBlogs(newBlogs)
    } catch (exception) {
      handleNotification({ error: exception.response.data.error })
    }
  }

  const handleDelete = async (id, title, author) => {
    try {
      if (window.confirm(`Remove the blog "${title}" written by: ${author}`)) {
        await deleteBlog(id)
        const newBlogs = blogs.filter(blog => blog.id !== id)
        setBlogs(newBlogs)
        handleNotification({ success: "Deleted succesfully!" })
      }
    } catch (exception) {
      const message = exception.response.data.error
      handleNotification({ error: message })
      if (message.includes('expired')) {
        setUser(null)
        window.localStorage.clear()
      }
    }
  }

  // const handleBlogs = async (newBlog) => {
  //   try {
  //     const response = await createBlog(newBlog)
  //     createFormRef.current.toggleVisibility()
  //     setBlogs(blogs.concat(response))
  //     handleNotification({ success: `A new blog was created: ${response.title} by ${response.author}` })
  //   } catch (error) {
  //     handleNotification({ error: error.message })
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <>
      <Notification />
      {
        user === null ?
          <LoginForm handleUser={(user) => setUser(user)} handleNotification={(obj) => handleNotification(obj)} /> :
          <>
            <Logout user={user} handleUser={(user) => setUser(user)} handleNotification={(obj) => handleNotification(obj)} />
            <Togglable label="Create new blog" ref={createFormRef}>
              <CreateForm reference={createFormRef} />
            </Togglable>
            <Blogs handleLikes={handleLikes} handleDelete={handleDelete} user={user} />
          </>
      }
    </>
  )
}

export default App