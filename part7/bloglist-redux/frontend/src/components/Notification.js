import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const success = {
    color: "green",
    backgroundColor: "#86efac",
  }

  const error = {
    backgroundColor: "#fca5a5",
    color: "red"
  }

  if (!notification) return null

  return (
    <div
      className="w-10/12 max-w-xl absolute top-10 right-1/2 translate-x-1/2 rounded p-4 font-semibold animate-fade animate-duration-300 xl:right-10 xl:translate-x-0"
      style={notification.success ? success : error}
    >
      {
        notification.success
          ? notification.success
          : notification.error
      }
    </div>
  )
  // if (notification.success) return <div className="notification" style={success}>{notification.success}</div>
  // if (notification.error) return <div className="notification" style={error}>{notification.error}</div>

}

export default Notification