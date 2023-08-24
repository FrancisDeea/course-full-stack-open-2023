import { Link } from 'react-router-dom'
import { useRef } from 'react'

import styles from './Blogs.module.css'

import Togglable from './Togglable'
import CreateForm from './CreateForm'

const Blogs = ({ blogs }) => {
  const createFormRef = useRef()

  return (
    <div className={styles.container}>
      <h2>blogs</h2>
      <Togglable label="Create new blog" ref={createFormRef}>
        <CreateForm reference={createFormRef} />
      </Togglable>
      {
        blogs.map(blog => {
          return (
            <div className={styles.blog_container} key={blog.id}>
              <p><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Blogs