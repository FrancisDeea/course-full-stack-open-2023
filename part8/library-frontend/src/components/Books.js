import { useState } from "react"

import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [filter, setFilter] = useState("all genres")

  const fetchAllBooks = useQuery(ALL_BOOKS)
  const [fetchGenreBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  })

  const handleGenre = (genre) => {
    fetchGenreBooks({ variables: { genre } })
    setFilter(genre)
  }

  if (!props.show) {
    return null
  }

  if (fetchAllBooks.loading) return <div>Loading...</div>
  if (result.loading) return <div>Loading...</div>


  const books = filter === "all genres" ? fetchAllBooks.data.allBooks : result.data.allBooks
  const genres = [...new Set(fetchAllBooks.data.allBooks.map(book => book.genres.join(",")))]


  return (
    <div>
      <h2>books</h2>

      <p>Now in genre: {filter}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {
          genres.map(genre => <button key={genre} onClick={() => handleGenre(genre)}>{genre}</button>)
        }
        <button onClick={() => setFilter("all genres")}>All genres</button>
      </div>
    </div>
  )
}

export default Books
