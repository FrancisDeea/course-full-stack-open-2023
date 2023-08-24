import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const username = user.username

  const style = {
    "border": "2px solid black",
    "padding": 10,
    "marginBottom": 5
  }

  const handleVisibility = () => setVisible(!visible)

  const updateLikes = () => {
    const newBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    dispatch(updateBlog(newBlog, blog.id))
  }

  const deleteBlog = async () => {
    if (window.confirm(`Are you sure you want to remove the blog: "${blog.title}"`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div style={style} className="blogDiv">
      {
        visible ?
          (
            <>
              {blog.title}{" "}
              <button onClick={handleVisibility}>Hide</button><br />
              <span className="url">{blog.url}</span><br />
              <span className="likes">likes: {blog.likes}{" "}</span>
              <button className="likeButton" onClick={updateLikes}>like</button><br />
              {blog.author}<br />
              {
                username === blog.user.username
                  ? <button className="deleteButton" onClick={deleteBlog}>Delete</button>
                  : null
              }
            </>
          ) :
          (
            <>
              <span className='title'>{blog.title}</span>
              <span className='author'>by: {blog.author}</span>
              <button onClick={handleVisibility}>Show</button >
            </>
          )
      }
    </div >
  )
}

export default Blog