
import Nav from "./Nav"
// import Logout from "./Logout"
import Logout2 from "./Logout2"

const Header = () => {

    return (
        <header className="h-12 bg-orange-200">
            <div className="max-w-6xl h-full m-auto py-2 px-4 flex justify-between items-center gap-4">
                <Nav />
                <Logout2 />
            </div>
        </header>
    )
}

export default Header