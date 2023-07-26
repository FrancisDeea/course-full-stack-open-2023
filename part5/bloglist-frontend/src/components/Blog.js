import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)
  const username = user.username

  const style = {
    "border": "2px solid black",
    "padding": 10,
    "marginBottom": 5
  }

  const handleVisibility = () => setVisible(!visible)

  const updateLikes = () => {
    const id = blog.id
    const newBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    handleLikes(newBlog, id)
  }

  const deleteBlog = () => {
    handleDelete(blog.id, blog.title, blog.author)
  }

  return (
    <div style={style}>
      {
        visible ?
          (
            <>
              {blog.title}{" "}
              <button onClick={handleVisibility}>Hide</button><br />
              {blog.url}<br />
              likes: {blog.likes}{" "}
              <button onClick={updateLikes}>like</button><br />
              {blog.author}<br />
              {
                username === blog.user.username
                  ? <button onClick={deleteBlog}>Delete</button>
                  : null 
              }
            </>
          ) :
          (
            <>
              {blog.title}{" "}
              <button onClick={handleVisibility}> Show</button >
            </>
          )
      }
    </div >
  )
}

export default Blog