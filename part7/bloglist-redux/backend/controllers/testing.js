const User = require('../models/user')
const Blog = require('../models/blog')
const deleteRouter = require('express').Router()
require('express-async-errors')

deleteRouter.post('/restart', async (request, response) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    response.status(204).end()
})

module.exports = deleteRouter