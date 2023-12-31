import { Link } from "react-router-dom"

const Users = ({ users }) => {

    return (
        <div className="p-4">
            <h2 className="mb-4">Users</h2>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Number of blogs</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                    <td>{user.blogs.length}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users