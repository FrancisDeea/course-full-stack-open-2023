const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message })
    }

    if (error.name === "CastError") {
        return response.status(400).json({ error: "malFormatted id. Enter a correct id" })
    }

    if (error.name === "JsonWebTokenError") {
        return response.status(400).json({ error: error.message})
    }

    next(error)
}

module.exports = { errorHandler }