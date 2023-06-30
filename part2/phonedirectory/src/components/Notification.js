const Notification = ({ message }) => {
    const success = {
        color: "green",
        border: "1px solid green",
        padding: 10,
        marginBottom: "5",
        backgroundColor: "lightgray"
    }

    const error = { ...success, color: "red", border: "1px solid red" }


    if (!message) return null;

    if (message.success) return <div style={success}>{message.success}</div>

    if (message.error) return <div style={error}>{message.error}</div>
 
}

export default Notification