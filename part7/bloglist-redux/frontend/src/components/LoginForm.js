import useField from '../hooks/useField'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/userReducer'

// import PropTypes from 'prop-types'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { reset: resetUsername, ...username } = useField("text", "username")
  const { reset: resetPassword, ...password } = useField("password", "password")

  const handleForm = async (e) => {
    e.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    dispatch(handleLogin(credentials))

    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleForm}>
        <label>
          Username:{" "}
          <input {...username} />
        </label>
        {" "}
        <label>
          Passsword:{" "}
          <input {...password} />
        </label>
        {" "}
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

// LoginForm.propTypes = {
//   handleNotification: PropTypes.func.isRequired,
//   handleUser: PropTypes.func.isRequired
// }

export default LoginForm