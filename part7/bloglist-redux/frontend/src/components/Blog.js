import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

import CreateComment from './CreateComment'
import Comments from './Comments'

import { IconThumbUpFilled } from '@tabler/icons-react'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = user.username

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
    <div className="p-4 min-h-[calc(100vh-48px)] grid place-content-center">
      <article className="m-auto w-full max-w-3xl rounded-xl p-6 border-none bg-slate-100 flex flex-col gap-4">
        <header className='flex flex-col justify-center items-start gap-2'>
          <h2 className=''>{blog.title}</h2>
          <p className='font-semibold italic'>Created by {blog.author}</p>
        </header>

        <p>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
          Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
          No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original.
        </p>

        <p className='font-semibold'>Source: <a className="text-blue-700" href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></p>

        <div className="flex flex-row justify-center items-center gap-1 rounded-xl bg-blue-500 max-w-min h-8 px-3 py-1">
          <IconThumbUpFilled className='text-white text-xs' />
          <span className='text-white font-semibold text-lg'>{blog.likes}</span>
        </div>

        <div className="flex flex-row gap-2">
          <button className="flex-1" onClick={updateLikes}>Like</button><br />
          {
            username === blog.user.username
              ? <button className="flex-1" onClick={deleteBlog}>Delete</button>
              : null
          }
        </div>

        <Comments comments={blog.comments} />
        <CreateComment id={blog.id} />
      </article >
    </div>
  )
}

export default Blog