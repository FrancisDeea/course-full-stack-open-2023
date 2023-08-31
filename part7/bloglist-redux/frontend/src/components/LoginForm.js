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
    <div className="w-screen h-screen p-8 flex flex-col justify-center items-center gap-6">
      <h2>Log in to application</h2>
      <form onSubmit={handleForm} className="bg-orange-200 w-full max-w-xs p-4 rounded flex flex-col gap-4 shadow-md">
        <label>
          Username:{" "}
          <input {...username} className='border-none' />
        </label>
        {" "}
        <label>
          Password:{" "}
          <input {...password} className='border-none' />
        </label>
        {" "}
        <button type="submit" className='btn'>Log in</button>
      </form>
    </div>
  )
}

// LoginForm.propTypes = {
//   handleNotification: PropTypes.func.isRequired,
//   handleUser: PropTypes.func.isRequired
// }

export default LoginForm