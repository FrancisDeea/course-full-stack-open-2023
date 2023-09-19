import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Login from './components/Login'

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const { title, author } = data.data.bookAdded
      updateCacheWith(data.data.bookAdded)
      window.alert(`A new book was added: "${title}" by ${author.name}`)
    },
    onError: ({ error }) => {
      console.log(error)
    }
  })

  const logout = () => {
    setPage('authors')
    setToken(null)
    client.resetStore()
    localStorage.clear()
  }

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  if (authors.loading) return <div>Loading...</div>

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={() => setPage('recommend')}>Recommend</button> : null}
        {
          !token
            ? <button onClick={() => setPage('login')}>login</button>
            : <button onClick={logout}>logout</button>
        }
      </div>

      <Authors authors={authors.data.allAuthors} show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setPage={setPage} update={updateCacheWith} />

      {
        token
          ? <Recommend show={page === 'recommend'} />
          : null
      }

      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
