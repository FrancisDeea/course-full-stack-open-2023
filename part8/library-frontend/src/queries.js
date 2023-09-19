import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author {
            name
            born
            bookCount
            id
        }
        id
        genres
    }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`

export const ALL_BOOKS = gql`
    query test($genre: String) {
        allBooks(genre: $genre) {
            title
            author {
                name
                born
                bookCount
                id
            }
            published
            genres
        }
    }
`
export const BOOKS_BY_GENRE = gql`
    query booksByGenre($genre: String!) {
        allBooks(genre: $genre) {
            title
            author {
                name
                born
                bookCount
                id
            }
            published
            genres
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author {
                name
                born
                bookCount
                id
            }
            published
            genres
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`
export const ME = gql`
    query {
        me {
            username
            favoriteGenre
            id
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`