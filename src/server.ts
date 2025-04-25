import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

// Create Express server
const app = express()

// Create Apollo server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

// Start Server
const startServer = async () => {
  try {
    // Connect to MongoDB
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const MONGO_URL = process.env.MONGODB_URL!
    await mongoose.connect(MONGO_URL, { dbName: 'my_store' })
    console.log("Connected to MongoDB")

    // Apollo Server
    await apolloServer.start()

    // Unified middleware
    app.use(
      "/graphql",
      cors(),
      express.json(),
      expressMiddleware(apolloServer)
    )

    // Express Server
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql...`)
    })
  } catch (err) {
    console.error(`Error starting server...${err}`)
  }
}

startServer()