// routes/image-routes.js
import express from 'express';
import { handleImageUpload, uploadImage, getImageByIdController, deleteImageByIdController } from '../controllers/image-controller.js';

const router = express.Router();

// POST /upload - Handle image upload
router.post('/', handleImageUpload, uploadImage);

// GET /upload/:id - Fetch image by document ID
router.get('/:id', getImageByIdController);

// DELETE /upload/:id - Delete image by document ID
router.delete('/:id', deleteImageByIdController);

export default router;
