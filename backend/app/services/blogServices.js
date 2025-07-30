// Importing the Blog model from the model directory.
import Blog from '../model/blogs.js';

// Function to list blogs based on provided query parameters.
export const list = async (params = {}) => {
    // Retrieving blogs from the database matching the given parameters.
    // The .exec() function is used to execute the query.
    const blogs = await Blog.find(params).exec();
    // Returning the list of blogs.
    return blogs;
}

// Function to save a new blog post.
export const save = async (newBlog) => {
    // Creating a new blog instance with the provided data.
    const blog = new Blog(newBlog);
    // Saving the new blog to the database.
    return await blog.save();
}

// Function to find a blog by its ID.
export const findById = async (id) => {
    // Retrieving a blog by its ID from the database.
    const blog = await Blog.findById(id).exec();
    // Returning the found blog.
    return blog;
}

// Function to edit an existing blog post.
export const edit = async (id, editedBlog) => {
    // Updating a blog identified by its ID with the new data provided.
    // The updated blog is then returned.
    const blog = await Blog.findByIdAndUpdate(id, editedBlog).exec();
    return blog;
}

// Function to remove a blog post by its ID.
export const remove = async (id) => {
    // Deleting a blog post by its ID.
    const blog = await Blog.findByIdAndDelete(id).exec();
    // Returning the deleted blog.
    return blog;
}
