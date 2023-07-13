const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        logger.info("Connected to MongoDB successfully!")
    })
    .catch(error => logger.error(error.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app