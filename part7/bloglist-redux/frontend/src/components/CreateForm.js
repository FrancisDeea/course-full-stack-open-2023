import useField from '../hooks/useField'

import { useDispatch } from 'react-redux'

import { createNewBlog } from '../reducers/blogReducer'
import { handleNotification } from '../reducers/notificationReducer'

const CreateForm = ({ reference }) => {
  const dispatch = useDispatch()
  const { reset: resetTitle, ...title } = useField("text", "title")
  const { reset: resetAuthor, ...author } = useField("text", "author")
  const { reset: resetUrl, ...url } = useField("text", "url")

  const handleForm = (e) => {
    e.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    dispatch(createNewBlog(newBlog))
    dispatch(handleNotification({ success: `The new blog "${title.value}" was created successfully!` }))

    resetTitle()
    resetAuthor()
    resetUrl()

    reference.current.toggleVisibility()
  }

  return (
    <div>
      <h2>Create a new Blog!</h2>
      <form onSubmit={handleForm}>
        <label>
          Title: <input {...title} />
        </label>
        {" "}
        <label>
          Author: <input {...author} />
        </label>
        {" "}
        <label>
          Url: <input {...url} />
        </label>
        {" "}
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateForm