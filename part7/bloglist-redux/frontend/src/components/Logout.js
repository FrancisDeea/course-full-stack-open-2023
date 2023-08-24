import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { handleNotification } from "../reducers/notificationReducer"

const Logout = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.clear()
    handleNotification({ success: "Logged out successfully!" })
  }

  return (
    <div>
      <span>Welcome {user.username}!</span> <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout