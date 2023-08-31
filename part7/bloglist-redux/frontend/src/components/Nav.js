import { Link } from "react-router-dom"

const Nav = () => {

    return (
        <nav className="">
            <ul className="flex gap-4">
                <li><Link to="/">Blogs</Link></li>
                <li><Link to="/users">Users</Link></li>
            </ul>
        </nav>
    )
}

export default Nav