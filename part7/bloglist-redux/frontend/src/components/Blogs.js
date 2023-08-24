import { Link } from 'react-router-dom'

import styles from './Blogs.module.css'

const Blogs = ({ blogs }) => {

  return (
    <div className={styles.container}>
      <h2>blogs</h2>
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