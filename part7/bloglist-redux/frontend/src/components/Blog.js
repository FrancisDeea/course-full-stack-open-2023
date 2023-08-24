import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = user.username

  const style = {
    "border": "2px solid black",
    "padding": 10,
    "marginBottom": 5
  }

  const updateLikes = () => {
    const newBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    dispatch(updateBlog(newBlog, blog.id))
  }

  const deleteBlog = async () => {
    if (window.confirm(`Are you sure you want to remove the blog: "${blog.title}"`)) {
      dispatch(removeBlog(blog.id))
      navigate('/')
    }
  }

  if (!blog) return null

  return (
    <article style={style} className="articleContainer">
      <h2>{blog.title}</h2>
      <p>Created by {blog.author}</p>
      <p><a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></p>
      <span className="likes">Likes: {blog.likes}{" "}</span>
      <button className="likeButton" onClick={updateLikes}>Like</button><br />
      {
        username === blog.user.username
          ? <button className="deleteButton" onClick={deleteBlog}>Delete</button>
          : null
      }
    </article >
  )
}

export default Blog