const Logout = ({ handleUser, handleNotification, user }) => {
    const handleLogout = () => {
        handleUser(null)
        window.localStorage.clear()
        handleNotification({ success: "Logged out successfully!" })
    }

    return (
        <div>
            <span>{user.username} logged in!</span> <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout