// Importing the express framework and room filter controller functions.
import express from 'express';
import * as roomfilterControllers from '../controllers/roomFilter-controller.js';

// Creating a new router object from express to handle room filter-related routes.
const router = express.Router();

// Setting up route handlers for the base room filter route ('/').
router.route('/')
    .get(roomfilterControllers.displayRoomFilters) // Handles GET requests to display a list of room filters.
    .post(roomfilterControllers.postRoomFilter); // Handles POST requests to create a new room filter.

// Setting up route handlers for room filter routes with an ID parameter ('/:id').
router.route('/:id')
    .get(roomfilterControllers.getRoomFilter) // Handles GET requests to retrieve a specific room filter by ID.
    .put(roomfilterControllers.updateRoomFilter) // Handles PUT requests to update a specific room filter by ID.
    .delete(roomfilterControllers.deleteRoomFilter); // Handles DELETE requests to delete a specific room filter by ID.

// Exporting the configured router to be used in the main application file.
export default router;
