const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
require('express-async-errors')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    const password = !user
        ? null
        : await bcryptjs.compare(body.password, user.passwordHash)

    if (!(user && password)) {
        return response.status(401).send({error: "invalid username or password"})
    }

    const userForToken = {
        username: body.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({token, username: user.username, name: user.name})
})

module.exports = loginRouter