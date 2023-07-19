const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const express = require('express')
const app = express()
const cors = require('cors')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

const mongoose = require('mongoose')

mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        logger.info("Connected to MongoDB successfully!")
    })
    .catch(error => logger.error(error.message))

app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)

module.exports = app