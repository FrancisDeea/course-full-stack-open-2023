const blogRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const newBlog = new Blog(request.body)
    await newBlog.save()
    response.status(201).json(newBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter