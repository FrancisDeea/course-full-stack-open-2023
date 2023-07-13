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

test('blog has id default property defined', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)
    for (let id of ids) {
        expect(id).toBeDefined()
    }
})

test('a new blog is created and added to database', async () => {
    const newBlog = {
        "title": "Hello World 4",
        "author": "Francis",
        "url": "localhost",
        "likes": 2
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(response.body.map(blog => blog.title)).toContain('Hello World 4')

})

test('a new blog is created without likes property', async () => {
    const newBlog = {
        "title": "Hello World 5",
        "author": "Francis",
        "url": "localhost",
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = (await api.get('/api/blogs')).body
    expect(response).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(response[response.length - 1].likes).toBe(0)
})

afterAll(() => {
    mongoose.connection.close();
})