/* global process */
require('dotenv').config();

let MONGO_URI = process.env.MONGO_URI;
if (process.env.NODE_ENV === 'test') {
    MONGO_URI = process.env.TEST_MONGO_URI;
}

const PORT = process.env.PORT;

module.exports = { MONGO_URI, PORT };