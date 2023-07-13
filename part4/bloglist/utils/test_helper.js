const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "Hello World 1",
        "author": "Francis",
        "url": "localhost",
        "likes": 2
    },
    {
        "title": "Hello World 2",
        "author": "Francis",
        "url": "localhost",
        "likes": 5
    },
    {
        "title": "Hello World 3",
        "author": "Francis",
        "url": "localhost",
        "likes": 10
    }
]

const blogsInDb = async () => {
    const response = await Blog.find({})
    return response.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }