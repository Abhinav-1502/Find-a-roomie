import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import initialize from './app/app.js';
import initializeSocket from './app/socket.js'; // import the Socket.IO initializer

dotenv.config(); // Load environment variables from .env file

const app = express();
const server = http.createServer(app);

initialize(app);
initializeSocket(server); // Initialize Socket.IO with the server

// Define a fallback route handler to handle any other routes
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
  });
  
const port = process.env.PORT || 3002;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
