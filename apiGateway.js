const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require ('@apollo/server/express4');
const bodyParser = require('body-parser');

const cors = require('cors');

const resolvers = require('./resolvers');
const typeDefs = require('./schema');

// Configuration du serveur Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  app.use(
      cors(),
      bodyParser.json(),
      expressMiddleware(server),
    );
});


// Démarrage du serveur Apollo Server

const app = express();

// Configuration des endpoints pour les microservices
const microservices = [
  { path: '/hotel', target: 'http://hotel-service:4001' },
  { path: '/room', target: 'http://room-service:4002' },
  // Ajoutez d'autres microservices ici...
];

// Middleware pour rediriger les requêtes vers les microservices appropriés
microservices.forEach(({ path, target }) => {
  app.use(
    path,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${path}`]: '',
      },
    })
  );
});

// Démarrer le serveur de l'API Gateway
app.listen(3000, () => {
  console.log('API Gateway démarré sur le port 3000');
});
