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
    <div className="flex justify-center items-center gap-4">
      <span className="font-semibold">Welcome {user.username}!</span>
      <button
        className="btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Logout