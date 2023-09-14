
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
    const user = useQuery(ME, { fetchPolicy: 'no-cache' })
    const favoriteGenre = user?.data?.me?.favoriteGenre.toLowerCase()


    const result = useQuery(ALL_BOOKS, {
        variables: { genre: favoriteGenre },
        fetchPolicy: 'no-cache'
    })

    if (!show || !user || !result) return null

    if (result.loading || user.loading) return <div>Loading...</div>

    const books = result.data.allBooks

    return (
        <div>
            <p>Books in your favorite genre: {favoriteGenre}</p>

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
        </div>
    )
}

export default Recommend