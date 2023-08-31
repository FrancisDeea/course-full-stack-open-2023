import { Link } from 'react-router-dom'
import { useRef } from 'react'

import Togglable from './Togglable'
import CreateForm from './CreateForm'

const Blogs = ({ blogs }) => {
  const createFormRef = useRef()

  return (
    <div className="p-4 flex flex-col gap-6">
      <h2 className="">Latest Blogs</h2>

      <div className="flex flex-col gap-4">
        <Togglable label="Create new blog" ref={createFormRef}>
          <CreateForm reference={createFormRef} />
        </Togglable>
        {
          blogs.map(blog => {
            return (
              <Link to={`/blogs/${blog.id}`} key={blog.id}>
                <div className="p-3 rounded bg-gray-200 hover:bg-gray-300">
                  <p>{blog.title}</p>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div >
  )
}

export default Blogs