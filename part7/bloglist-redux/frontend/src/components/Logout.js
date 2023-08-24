import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { handleNotification } from "../reducers/notificationReducer"

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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