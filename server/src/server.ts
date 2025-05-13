import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import db from "./config/connection.js";
import { authenticateToken } from './utils/auth.js';
import cors from 'cors'; // Allows front end and back end to talk
import { fileURLToPath } from 'node:url';

// OpenAI
import simulateRoute from './routes/simulate.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers
});

 const app = express();

const startApolloServer = async () => {
  await server.start();
  await db();

  
 

  app.use(cors()); 
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Mount the OpenAI simulation route
  app.use('/api', simulateRoute);

  // GraphQL middleware
  app.use('/graphql', expressMiddleware(server as any, {
    context: authenticateToken as any
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();

