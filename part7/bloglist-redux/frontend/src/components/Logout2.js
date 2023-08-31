import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { handleNotification } from "../reducers/notificationReducer"
import { IconLogout } from '@tabler/icons-react'

const Logout2 = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch(setUser(null))
        window.localStorage.clear()
        handleNotification({ success: "Logged out successfully!" })
    }

    const handleDisplay = () => {
        document.getElementById('logout').classList.toggle('hidden')
        document.getElementById('logout').classList.toggle('flex')
    }

    return (
        <div  className="relative rounded-sm">
            <IconLogout onClick={handleDisplay} className="text-xs" />
            <div id="logout" className="hidden absolute top-9 right-0 flex-row justify-center items-center gap-4 w-max rounded bg-slate-400 px-2 py-3 animate-fade-down animate-duration-300">
                <span className="font-semibold">Welcome {user.username}!</span>
                <button
                    className="btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Logout2