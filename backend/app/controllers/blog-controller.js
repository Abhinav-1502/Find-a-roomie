import * as blogSevices from '../services/blogServices.js';
import { setErrorResponse, setResponse } from './response-handler.js';

// Asynchronous function to handle the display of blogs.
export const displayBlogs = async (request, response) =>{
    try{
        const params = {...request.query};
        const blogs = await blogSevices.list(params);
        setResponse(blogs, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}
// Asynchronous function to handle the creation of a new blog post.
export const postBlog = async (request, response) =>{
    try{
        const blogData = {...request.body};
        const blog = await blogSevices.save(blogData);
        setResponse(blog, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}
// Function to retrieve a single blog post by its ID.
export const getBlog = async (request, response) =>{
    try{
        const id = request.params.id;
        const blog = await blogSevices.findById(id);
        setResponse(blog, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}
// Function to update a blog post.
export const updateBlog = async (request, response) =>{
    try{
        const id = request.params.id;
        const editedBlog = {...request.body};
        const blog = await blogSevices.edit(id, editedBlog);
        setResponse(editedBlog, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}
// Function to delete a blog post.
export const deleteBlog = async (request, response) =>{
    try{
        const id = request.params.id;
        const blog = await blogSevices.remove(id);
        setResponse(blog, response);

    }catch(err){
        setErrorResponse(err, response);
    }
}