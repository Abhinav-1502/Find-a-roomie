// Importing the express and controller functions.
import express from 'express';
import * as profileController from '../controllers/ProfileManagement-controller.js';

const router = express.Router();

// Retrieve a user's profile
router.get('/profile/:userId', profileController.getProfile);

// Create or update a user's profile
router.post('/profile/:userId', profileController.saveOrUpdateProfile);

// Update specific fields in a user's profile
router.patch('/profile/:userId', profileController.updateProfileFields);

// Delete a user's profile
router.delete('/profile/:userId', profileController.deleteProfile);

export default router;
