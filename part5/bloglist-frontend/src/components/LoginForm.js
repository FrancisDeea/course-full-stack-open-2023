import { useState } from 'react'
import loginService from '../services/login'
import { setToken } from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ handleNotification, handleUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      handleUser(user)
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

  return (
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
}

LoginForm.propTypes = {
  handleNotification: PropTypes.func.isRequired,
  handleUser: PropTypes.func.isRequired
}

export default LoginForm