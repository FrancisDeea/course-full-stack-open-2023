import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (newBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export { getAll, createBlog, setToken, updateBlog }