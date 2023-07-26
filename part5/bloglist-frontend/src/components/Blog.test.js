import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import Blog from './Blog'

describe('testing <Blog /> component', () => {
    let component
    const blog = {
        "title": "Testing react component",
        "author": "Francis",
        "url": "https://github.com",
        "likes": 1,
        "user": {
            "username": "Francis"
        }
    }

    const user = {
        "username": "Francis"
    }

    const handleLikes = jest.fn()

    beforeEach(() => {
        component = render(<Blog blog={blog} user={user} handleLikes={handleLikes} />)
    })

    test('blog component renders default content (title and author)', () => {
        const title = component.container.querySelector('.title')
        const author = component.container.querySelector('.author')
        const url = component.container.querySelector('.url')

        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBe(null)
    })

    test('after clicks on show button, url and likes are displayed', () => {
        const likes = component.container.querySelector('.likes')
        const url = component.container.querySelector('.url')
        expect(url).toBe(null)

        const button = screen.getByText(/show/i)
        fireEvent.click(button)

        expect(url).toBeDefined()
        expect(likes).toBeDefined()
    })

    test.only('clicking likes button twice, handleEvent is called twice', () => {
        const showButton = component.container.querySelector('button')
        fireEvent.click(showButton)

        const likeButton = component.container.querySelector('.likeButton')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(handleLikes.mock.calls).toHaveLength(2)
    })
})

