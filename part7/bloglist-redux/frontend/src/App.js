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

import { setToken } from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  const createFormRef = useRef()

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
            <Blogs user={user} />
          </>
      }
    </>
  )
}

export default App