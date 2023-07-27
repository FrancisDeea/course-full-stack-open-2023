import { useState } from 'react'

const CreateForm = ({ handleBlogs }) => {
  const [newBlog, setNewBlog] = useState({ title: "", url: "", author: "", likes: 0 })

  const handleChange = (target) => {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  const handleCreateForm = (event) => {
    event.preventDefault()
    handleBlogs(newBlog)
    setNewBlog({ title: "", url: "", author: "", likes: 0 })
  }

  return (
    <div>
      <h2>Create a new Blog!</h2>
      <form onSubmit={handleCreateForm}>
        <label>
          Title: <input type="text" value={newBlog.title} name="title" onChange={({ target }) => handleChange(target)} />
        </label>
        {" "}
        <label>
          Author: <input type="text" value={newBlog.author} name="author" onChange={({ target }) => handleChange(target)} />
        </label>
        {" "}
        <label>
          Url: <input type="text" value={newBlog.url} name="url" onChange={({ target }) => handleChange(target)} />
        </label>
        {" "}
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateForm