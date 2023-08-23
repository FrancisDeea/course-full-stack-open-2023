import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store} >
        <App />
    </Provider >
)