const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken) {
        return response.status(401).json({error: 'Invalid or missing token'})
    }

    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
        ...request.body,
        user: user._id
    })

    const savedNote = await newBlog.save()
    user.blogs = user.blogs.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)
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
        response.status(404).json({ "error": "This id does not exist in database" })
    }
})

module.exports = blogRouter