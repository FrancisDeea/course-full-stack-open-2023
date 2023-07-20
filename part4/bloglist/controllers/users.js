const userRouter = require('express').Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
require('express-async-errors')

userRouter.post('/', async (request, response) => {
    const body = request.body
    console.log(request)
    if (body.password.length < 3) {
        return response.status(400).json({ error: "Password length must be at least 3 characters" })
    }

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(body.password, saltRounds)

    const user = new User({
        "username": body.username,
        "name": body.name,
        passwordHash
    })

    const savedUser = await user.save()

    console.log("A new user was created succesfully: ", '\n', savedUser)

    response.json(savedUser)

})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1, id: 1 })
    response.json(users)
})

module.exports = userRouter