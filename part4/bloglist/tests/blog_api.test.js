const testHelper = require('../utils/test_helper')
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
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
    let token = null
    beforeAll(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcryptjs.hash('test123', 10)
        const user = await new User({"username": "Andreea", passwordHash}).save()

        const userForToken = {"username": "Andreea", "id": user._id}
        return (token = jwt.sign(userForToken, process.env.SECRET))
    })

    test('a new blog is created and added to database', async () => {
        const blog = {
            "title": "sending blog 1",
            "author": "Andreea",
            "url": "https://google.es",
            "likes": 5
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogs = await testHelper.blogsInDb()
        expect(blogs).toHaveLength(testHelper.initialBlogs.length + 1)

        const titles = blogs.map(blog => blog.title)
        expect(titles).toContain('sending blog 1')
        
    })

    test('a new blog is created without likes property', async () => {
        const newBlog = {
            "title": "Hello World 5",
            "author": "Francis",
            "url": "localhost",
        }
        await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await testHelper.blogsInDb()
        expect(blogs).toHaveLength(testHelper.initialBlogs.length + 1)
        expect(blogs[blogs.length - 1].likes).toBe(0)
    })

    test('a new blog is created without title or url property (required)', async () => {
        const newBlog = {
            "author": "Francis",
            "likes": 1
        }
        await api
            .post('/api/blogs')
            .set("authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogs = await testHelper.blogsInDb()
        expect(blogs).toHaveLength(testHelper.initialBlogs.length)

    }, 100000)
})


describe('when a DELETE HTTP request is sent', () => {
    let token = null
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})

        const passwordHash = await bcryptjs.hash("test123", 10)
        const user = await new User({"username": "Andreea", passwordHash}).save()


        const userForToken = {"username": "Andreea", "id": user.id}
        token = jwt.sign(userForToken, process.env.SECRET)

        const newBlog = {
            "title": "Hello World 5",
            "author": "Francis",
            "url": "localhost",
            "likes": 5
        }

        await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        return token
    })

    test('try to delete a blog with correct id', async () => {
        const allBlogs = await Blog.find({}).populate("user");
        const firstBlog = allBlogs[0]

        await api
            .delete(`/api/blogs/${firstBlog.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const finalBlogs = await Blog.find({})
        expect(finalBlogs).toHaveLength(allBlogs.length - 1)
    })

    test('try to delete a blog without token', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToDelete = blogsAtStart[0]

        token = null

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)

        const blogsAtFinal = await Blog.find({})
        expect(blogsAtFinal).toHaveLength(blogsAtStart.length)
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