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

blogRouter.put('/:id', async (request, response) => {
    const checkId = await Blog.exists({ _id: request.params.id })
    if (checkId) {
        const newData = request.body
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newData, { new: true })
        return response.json(updatedBlog)
    } else {
        response.status(404).json({"error": "This id does not exist in database"})
    }
})

module.exports = blogRouter