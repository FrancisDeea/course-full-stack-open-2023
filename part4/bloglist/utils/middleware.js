const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userExtractor = async (request, response, next) => {
    const token = request.token
    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        request.user = user
    }

    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }

    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message })
    }

    if (error.name === "CastError") {
        return response.status(400).json({ error: "malFormatted id. Enter a correct id" })
    }

    if (error.name === "JsonWebTokenError") {
        return response.status(400).json({ error: error.message })
    }

    if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

module.exports = { errorHandler, tokenExtractor, userExtractor }