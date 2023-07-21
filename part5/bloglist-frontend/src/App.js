import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])


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
      window.localStorage.setItem("user", JSON.stringify(user))
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  return (
    <>
      {
        user === null ?
          loginForm() :
          renderBlogs()
      }
    </>
  )
}

export default App