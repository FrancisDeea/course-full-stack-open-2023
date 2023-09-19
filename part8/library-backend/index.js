// const jwt = require('jsonwebtoken')

// const { ApolloServer } = require('@apollo/server')
// const { startStandaloneServer } = require('@apollo/server/standalone')
// const typeDefs = require('./graphql/types')
// const resolvers = require('./graphql/resolvers')

// const mongoose = require('mongoose')
// const Book = require('./models/Book')
// const Author = require('./models/Author')
// const User = require('./models/User')

// require('dotenv').config()

// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log("Connected to Mongo successfully")
//   })
//   .catch((error) => console.log("Error connection Mongo: ", error))

// // let authors = [
// //   {
// //     name: 'Robert Martin',
// //     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
// //     born: 1952,
// //   },
// //   {
// //     name: 'Martin Fowler',
// //     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
// //     born: 1963
// //   },
// //   {
// //     name: 'Fyodor Dostoevsky',
// //     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
// //     born: 1821
// //   },
// //   {
// //     name: 'Joshua Kerievsky', // birthyear not known
// //     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
// //   },
// //   {
// //     name: 'Sandi Metz', // birthyear not known
// //     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
// //   },
// // ]

// // /*
// //  * Suomi:
// //  * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
// //  * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
// //  *
// //  * English:
// //  * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
// //  * However, for simplicity, we will store the author's name in connection with the book
// //  *
// //  * Spanish:
// //  * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
// //  * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
// // */

// // let books = [
// //   {
// //     title: 'Clean Code',
// //     published: 2008,
// //     author: 'Robert Martin',
// //     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
// //     genres: ['refactoring']
// //   },
// //   {
// //     title: 'Agile software development',
// //     published: 2002,
// //     author: 'Robert Martin',
// //     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
// //     genres: ['agile', 'patterns', 'design']
// //   },
// //   {
// //     title: 'Refactoring, edition 2',
// //     published: 2018,
// //     author: 'Martin Fowler',
// //     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
// //     genres: ['refactoring']
// //   },
// //   {
// //     title: 'Refactoring to patterns',
// //     published: 2008,
// //     author: 'Joshua Kerievsky',
// //     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
// //     genres: ['refactoring', 'patterns']
// //   },
// //   {
// //     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
// //     published: 2012,
// //     author: 'Sandi Metz',
// //     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
// //     genres: ['refactoring', 'design']
// //   },
// //   {
// //     title: 'Crime and punishment',
// //     published: 1866,
// //     author: 'Fyodor Dostoevsky',
// //     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
// //     genres: ['classic', 'crime']
// //   },
// //   {
// //     title: 'The Demon ',
// //     published: 1872,
// //     author: 'Fyodor Dostoevsky',
// //     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
// //     genres: ['classic', 'revolution']
// //   },
// // ]

// /*
//   you can remove the placeholder query once your first one has been implemented 
// */

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })

// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({ req, res }) => {
//     const auth = req ? req.headers.authorization : null
//     if (auth && auth.startsWith('Bearer ')) {
//       const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
//       const currentUser = await User.findById(decodedToken.id)
//       return { currentUser }
//     }
//   }
// }).then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })

import jwt from 'jsonwebtoken'
// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import typeDefs from './graphql/types.js'
import resolvers from './graphql/resolvers.js'
// const typeDefs = require('./graphql/types')
// const resolvers = require('./graphql/resolvers')

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import User from './models/User.js'

import dotenv from 'dotenv';
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to Mongo successfully")
  })
  .catch((error) => console.log("Error connection Mongo: ", error))

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '',
});

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors(),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
  })
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);
