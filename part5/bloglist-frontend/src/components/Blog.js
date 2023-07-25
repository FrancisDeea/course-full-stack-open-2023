import { useState } from 'react'

const Blog = ({ blog, handleLikes }) => {
  const [visible, setVisible] = useState(false)

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
              {blog.author}
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