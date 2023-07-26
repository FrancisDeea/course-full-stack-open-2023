import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog component renders default content (title and author)', () => {
    const blog = {
        "title": "Testing react component",
        "author": "Francis",
        "url": "https://github.com",
        "likes": 1
    }

    const user = {
        "username": "Francis"
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')
    const url = component.container.querySelector('.url')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBe(null)
})