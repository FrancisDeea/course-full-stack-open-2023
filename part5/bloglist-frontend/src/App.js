import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { getAll, createBlog, setToken } from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: "", url: "", author: "", likes: 0 })
  const [notification, setNotification] = useState(null)

  const handleNotification = object => {
    setNotification(object)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleCreateForm = async (event) => {
    event.preventDefault()
    try {
      const response = await createBlog(newBlog)
      setBlogs(blogs.concat(response))
      setNewBlog({ title: "", url: "", author: "", likes: 0 })
      handleNotification({ success: `A new blog was created: ${response.title} by ${response.author}` })
    } catch (error) {
      handleNotification({ error: error.message })
      console.log(error)
    }

  }

  const createForm = () => (
    <div>
      <h2>Create a new Blog!</h2>
      <form onSubmit={handleCreateForm}>
        <label>
          Title: <input type="text" value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
        </label>
        {" "}
        <label>
          Author: <input type="text" value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
        </label>
        {" "}
        <label>
          Url: <input type="text" value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
        </label>
        {" "}
        <button type="submit">Create</button>
      </form>
    </div>
  )

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        {" "}
        <label>
          Passsword:{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        {" "}
        <button type="submit">Log in</button>
      </form>
    </div>
  )

  const renderBlogs = () => (
    <div>
      <h2>blogs</h2>
      <span>{user.username} is logged in!</span> <button onClick={handleLogout}>Log out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
      setToken(user.token)
      window.localStorage.setItem("user", JSON.stringify(user))
      handleNotification({ success: "Logged in successfully!" })
    } catch (exception) {
      setUsername("")
      setPassword("")
      handleNotification({ error: exception.response.data.error })
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    handleNotification({ success: "Logged out successfully!" })
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
          loginForm() :
          <>
            {createForm()}
            {renderBlogs()}
          </>
      }
    </>
  )
}

export default App