import useField from '../hooks/useField'

import { useDispatch, useSelector } from 'react-redux'

import { createNewBlog } from '../reducers/blogReducer'

const CreateForm = ({ reference }) => {
  const username = useSelector(state => state.user.username)
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

    dispatch(createNewBlog(newBlog, username))

    resetTitle()
    resetAuthor()
    resetUrl()

    reference.current.toggleVisibility()
  }

  const handleCancel = (e) => {
    e.preventDefault()
    reference.current.toggleVisibility()
  }

  return (
    <div className='bg-gray-200 p-4 rounded max-w-2xl flex flex-col gap-4 animate-fade-right animate-duration-300 animate-out fade-out'>
      <h2>Create a new Blog!</h2>
      <form onSubmit={handleForm} className='flex flex-col gap-2'>
        <label>
          Title <input {...title} />
        </label>

        <label>
          Author <input {...author} />
        </label>

        <label>
          Url <input {...url} />
        </label>

        <button type="submit" className='bg-green-300 hover:bg-green-500 w-full my-2'>Create</button>
        <button className="bg-red-300 hover:bg-red-500 w-full" onClick={handleCancel}>Cancel</button>

      </form>
    </div>
  )
}

export default CreateForm