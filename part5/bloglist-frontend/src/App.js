import { useState, useEffect, useRef } from 'react'

import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'

import { getAll, setToken } from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const createFormRef = useRef()

  const handleNotification = object => {
    setNotification(object)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  useEffect(() => {
    getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  return (
    <>
      <Notification notification={notification} />
      {
        user === null ?
          <LoginForm handleUser={(user) => setUser(user)} handleNotification={(obj) => handleNotification(obj)} /> :
          <>
            <Logout user={user} handleUser={(user) => setUser(user)} handleNotification={(obj) => handleNotification(obj)} />
            <Togglable label="Create new blog" ref={createFormRef}>
              <CreateForm reference={createFormRef} handleNotification={(obj) => handleNotification(obj)} handleBlogs={(newBlog) => setBlogs(blogs.concat(newBlog))} />
            </Togglable>
            <Blogs blogs={blogs} />
          </>
      }
    </>
  )
}

export default App