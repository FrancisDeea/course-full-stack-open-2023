import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import Book from '../models/Book.js'
import Author from '../models/Author.js'


import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()
import { GraphQLError } from 'graphql'

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),

        allBooks: async (root, args) => {
            const author = await Author.findOne({ name: args.name })

            if (args.name && args.genre) {
                if (!author) return null

                const books = await Book.find({ author: author.id, genres: args.genre }).populate('author').exec()
                if (!books) return null

                return books
            }

            if (args.name && !args.genre) {
                if (!author) return null
                return Book.find({ author: author.id }).populate('author').exec()
            }

            if (args.genre && !args.name) {
                return Book.find({ genres: args.genre }).populate('author').exec()
            }

            return Book.find({}).populate('author').exec()
        },

        authorCount: async () => Author.collection.countDocuments(),
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => context.currentUser
    },

    Author: {
        // bookCount: async (root) => await Book.countDocuments({ author: root.id })
    },

    Mutation: {
        addBook: async (root, args, context) => {

            const currentUser = context.currentUser

            console.log(currentUser)

            if (!currentUser) {
                throw new GraphQLError('You have to be logged in!', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            let author = await Author.findOne({ name: args.author })

            if (!author) {
                try {
                    author = new Author({ name: args.author })
                    await author.save()
                }
                catch (err) {
                    {
                        throw new GraphQLError(`Something went wrong saving data: ${err.errors.name.message}`, {
                            extensions: {
                                invalidArgs: err
                            }
                        })
                    }
                }
            }

            if (await Book.findOne({ title: args.title })) {
                throw new GraphQLError("This title of book is already in DDBB", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.title
                    }
                })
            }

            const book = new Book({ ...args, author: author._id })

            try {
                await book.save()
                author.bookCount = author.bookCount + 1
                await author.save()
            }

            catch (error) {
                throw new GraphQLError("Error saving book in DDBB", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args, error
                    }
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })

            return book.populate('author')
        },

        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('You have to be logged in!', {
                    extensions: { code: "BAD_USER_INPUT" }
                })
            }

            const author = await Author.findOne({ name: args.name })

            if (!author) {
                throw new GraphQLError("This author does not exist!", {
                    extensions: {
                        invalidArgs: args.name
                    }
                })
            }

            author.born = args.setBornTo
            return author.save()
        },

        createUser: async (root, args) => {
            const user = new User(args)

            return user.save()
                .catch(err => {
                    throw new GraphQLError(`Creating user failed: ${err.message}`, {
                        extensions: {
                            invalidArgs: err
                        }
                    })
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== "secret") {
                throw new GraphQLError('Wrong credentials', {
                    extensions: {
                        invalidArgs: args
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
        },
    }
}

export default resolvers