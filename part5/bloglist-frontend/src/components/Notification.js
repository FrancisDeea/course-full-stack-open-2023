const Notification = ({ notification }) => {
    const success = {
        border: "1px solid green",
        color: "green",
        backgroundColor: "lightgray",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
    }

    const error = {
        ...success,
        border: "1px solid red",
        color: "red"
    }

    if (!notification) return null
    if (notification.success) return <div style={success}>{notification.success}</div>
    if (notification.error) return <div style={error}>{notification.error}</div>

}

export default Notification