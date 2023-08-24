import styles from './Nav.module.scss'

import { Link } from "react-router-dom"

const Nav = () => {

    return (
        <nav className={styles.container}>
            <ul>
                <li><Link to="/">Blogs</Link></li>
                <li><Link to="/users">Users</Link></li>
            </ul>
        </nav>
    )
}

export default Nav