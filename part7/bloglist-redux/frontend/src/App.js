import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, useMatch } from 'react-router-dom'

import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Users from './components/Users'
import User from './components/User'

import { setToken } from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const match = useMatch('/users/:id')

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)


  const matchedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  console.log(matchedUser)

  const createFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <>
      <Notification />
      {
        user === null
          ? <LoginForm />
          :
          <>
            <Logout user={user} />
            <Togglable label="Create new blog" ref={createFormRef}>
              <CreateForm reference={createFormRef} />
            </Togglable>
            <Blogs user={user} />

            <Routes>
              <Route path="/users" element={<Users users={users} />} />
              <Route path="/users/:id" element={<User user={matchedUser} />} />
            </Routes>
          </>
      }
    </>
  )
}

export default App