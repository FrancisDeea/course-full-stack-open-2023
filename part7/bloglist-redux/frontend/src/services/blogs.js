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

const update = async (newBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const comment = async (obj, id) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(`${baseUrl}/${id}/comments`, obj, config)
  return response.data
}

export { getAll, createBlog, setToken, update, remove, comment }