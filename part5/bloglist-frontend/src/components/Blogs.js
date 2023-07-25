import Blog from './Blog'

const Blogs = ({ blogs, handleLikes }) => {

    return (
        <div>
            <h2>blogs</h2>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                    <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />
                )}
        </div>
    )
}

export default Blogs