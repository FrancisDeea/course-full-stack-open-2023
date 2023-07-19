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
describe('when a GET HTTP request is sent', () => {
    test('all blogs are returned as json', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(testHelper.initialBlogs.length)
    })

    test('blog has id as default property defined (and not _id)', async () => {
        const response = await api.get('/api/blogs')
        const ids = response.body.map(blog => blog.id)
        for (let id of ids) {
            expect(id).toBeDefined()
        }
    })
})

describe('when a POST HTTP request is sent', () => {
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

    test('a new blog is created without title or url property (required)', async () => {
        const newBlog = {
            "author": "Francis",
            "likes": 1
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(testHelper.initialBlogs.length)

    }, 100000)
})



describe('when a DELETE HTTP request is sent', () => {
    test('try to delete a blog with correct id', async () => {
        const allBlogs = await testHelper.blogsInDb()
        const firstBlog = allBlogs[0]
        await api
            .delete(`/api/blogs/${firstBlog.id}`)
            .expect(204)

        const finalBlogs = await testHelper.blogsInDb()
        expect(finalBlogs).toHaveLength(testHelper.initialBlogs.length - 1)
    })

    test('try to delete a blog with malformatted id', async () => {
        const malId = "64adb1b81a477dd"
        await api
            .delete(`/api/blogs/${malId}`)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close();
})