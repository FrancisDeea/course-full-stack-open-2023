const testHelper = require('../utils/test_helper')
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of testHelper.initialBlogs) {
        let newBlog = new Blog(blog)
        await newBlog.save()
    }
})

test('all blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(testHelper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close();
})