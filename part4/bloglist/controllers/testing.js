const User = require('../models/user')
const Blog = require('../models/blog')
const deleteRouter = require('express').Router()
require('express-async-errors')

deleteRouter.get('/restart', async (request, response) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    response.status(204).send('<p>All data has been deleted successfully</p>')
})

module.exports = deleteRouter