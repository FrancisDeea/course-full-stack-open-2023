import { Link } from "react-router-dom"

const User = ({ user }) => {

    if (!user) {
        return null
    }

    return (
        <div className="p-4">
            <h2 className="mb-4">{user.name}&apos;s latest blogs:</h2>
            <ul className="flex flex-col gap-3">
                {
                    user.blogs.map(blog => {
                        return <Link key={blog.id} to={`/blogs/${blog.id}`}><li className="p-3 rounded font-semibold bg-gray-200 hover:bg-gray-300">{blog.title}</li></Link>
                    })
                }
            </ul>
        </div>
    )
}

export default User