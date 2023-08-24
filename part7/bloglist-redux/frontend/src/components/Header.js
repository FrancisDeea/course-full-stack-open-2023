import styles from './Header.module.css'

import Nav from "./Nav"
import Logout from "./Logout"

const Header = () => {

    return (
        <header className={styles.container}>
            <Nav />
            <Logout />
        </header>
    )
}

export default Header