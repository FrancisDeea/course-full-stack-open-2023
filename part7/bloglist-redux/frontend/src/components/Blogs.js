import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = ({ handleLikes, handleDelete, user }) => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  return (
    <div className="blogsContainer">
      <h2>blogs</h2>
      {blogs
        .map(blog =>
          <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleDelete={handleDelete} user={user} />
        )}
    </div>
  )
}

export default Blogs