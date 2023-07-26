import Blog from './Blog'

const Blogs = ({ blogs, handleLikes, handleDelete, user }) => {

    return (
        <div>
            <h2>blogs</h2>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                    <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleDelete={handleDelete} user={user} />
                )}
        </div>
    )
}

export default Blogs