const Book = require('../models/Book')
const Author = require('../models/Author')

const { GraphQLError } = require('graphql')

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
        allAuthors: async () => Author.find({})
    },

    Author: {
        bookCount: async (root) => await Book.countDocuments({ author: root.id })
    },

    Mutation: {
        addBook: async (root, args) => {

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
            }

            catch (error) {
                throw new GraphQLError("Error saving book in DDBB", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args, error
                    }
                })
            }

            return book.populate('author')
        },

        editAuthor: async (root, args) => {
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
        }
    }
}

module.exports = resolvers