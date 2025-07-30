// Importing the express and blog controller functions.
import express from 'express';
import * as blogControllers from '../controllers/blog-controller.js';

// Creating a new router object 
const router = express.Router();

// Setting up route handlers
router.route('/')
    .get(blogControllers.displayBlogs)
    .post(blogControllers.postBlog);

router.route('/:id')
    .get(blogControllers.getBlog)
    .put(blogControllers.updateBlog)
    .delete(blogControllers.deleteBlog);

// Exporting the configured router 
export default router;