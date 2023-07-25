const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'Unauthorizated user or token.' })
    }

    const newBlog = new Blog({
        ...body,
        user: user._id
    })

    const savedNote = await newBlog.save()
    user.blogs = user.blogs.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)
})

blogRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!user) {
        return response.status(401).json({ error: 'Unauthorized user' })
    }

    if (!blog) {
        return response.status(404).json({ error: 'Blog Not Found' })
    }

    if (blog.user.toString() !== user._id.toString()) {
        return response.status(401).json({ error: "Unauthorizated user. Try to delete only your blogs" })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const blog = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    updatedBlog
        ? response.json(updatedBlog)
        : response.status(404).json({ "error": "This id does not exist in database" })
})

module.exports = blogRouter