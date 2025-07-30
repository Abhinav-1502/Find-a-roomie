import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import BlogData from "../../models/blogData";
import { RootState } from "../store";

export type BlogsState = BlogData[];

const initialState: BlogsState = [];

export const BlogListSlice = createSlice({
    name: 'bloglist',
    initialState: initialState,
    reducers:{
        loadBlogList: (state, action: PayloadAction<BlogsState>) =>{
            return action.payload;
        },
        addComment: (state, action: PayloadAction<{ blogId: string, userId: string, comment: string }>) => {
            const { blogId, userId, comment } = action.payload;
            const blogIndex = state.findIndex(blog => blog.blogId === blogId);
      
            if (blogIndex !== -1) {
              // Create a shallow copy of the blog object
              const updatedBlog = { ...state[blogIndex] };
      
              // Create a new comment object with user and comment properties
              const newComment = { user: userId, comment };
      
              // Create a new array with the added comment
              updatedBlog.blogComments = [...updatedBlog.blogComments, newComment];
      
              // Create a shallow copy of the state array
              const newState = [...state];
      
              // Update the state with the new blog object
              newState[blogIndex] = updatedBlog;
      
              // Return the new state
              return newState;
            }
      
            // If the blog is not found, return the current state
            return state;
          },
    }
});

export const {loadBlogList, addComment} = BlogListSlice.actions;
// Selector to get a post by postId



export default BlogListSlice;
