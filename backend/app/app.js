// Importing necessary libraries and modules.
import cors from 'cors'; // CORS middleware to enable cross-origin requests.
import express from 'express'; // Express framework 
import mongoose from 'mongoose'; // Mongoose library for MongoDB
import registerRouter from './routes/index.js' // Importing the router
import models from './model/index.js' // Importing models
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Function to initialize application settings
const initialize = (app) => {
    // Applying CORS middleware to allow cross-origin requests
    app.use(cors());

    // Middleware to parse JSON bodies in requests.
    app.use(express.json());

    // Middleware to parse URL-encoded bodies (form data)
    app.use(express.urlencoded());

    // Connecting to MongoDB using mongoose
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.error('MongoDB connection error:', err));
    // Registering the application routes
    registerRouter(app);

    // Example default route handler
    app.get('/', (req, res) => {
        res.send('Hello from your Vercel deployment!');
    });
}

// Exporting the initialize function to be used in the main application file
export default initialize;