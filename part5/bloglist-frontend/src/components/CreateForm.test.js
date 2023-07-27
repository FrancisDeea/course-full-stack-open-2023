import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import CreateForm from './CreateForm'
import '@testing-library/dom'
import userEvent from '@testing-library/user-event'


test('component calls handleEvent on submit with correct data', async () => {
    const user = userEvent.setup()
    const createForm = jest.fn()
    const component = render(<CreateForm handleBlogs={createForm} />)

    const titleInput = component.container.querySelector("input[name='title']");
    const authorInput = component.container.querySelector("input[name='author']")
    const urlInput = component.container.querySelector("input[name='url']")
    const button = component.container.querySelector("button[type='submit']")

    await user.type(titleInput, "testing title")
    await user.type(authorInput, "testing author")
    await user.type(urlInput, "testing url")
    await user.click(button)

    expect(createForm.mock.calls).toHaveLength(1)
    expect(createForm.mock.calls[0][0].title).toBe("testing title")
    expect(createForm.mock.calls[0][0].author).toBe("testing author")
    expect(createForm.mock.calls[0][0].url).toBe("testing url")
})
