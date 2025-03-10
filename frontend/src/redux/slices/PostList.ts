import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import RoomPost from "../../models/roomPost";
import { RootState } from "../store";

export type ListState = RoomPost[];

const initialState: ListState = [];

export const PostListSlice = createSlice({
    name: 'postlist',
    initialState: initialState,
    reducers:{
        loadPostList: (state, action: PayloadAction<ListState>) =>{
            return action.payload;
        }
    }
});

export const {loadPostList} = PostListSlice.actions;
// Selector to get a post by postId
export const selectPostById = (postId: string) => (state: RootState) => {
    return state.postlist.find(post => post.postId === postId);
  };

export const selectPostsByUserId = (userId: string) => (state: RootState): RoomPost[] => {
return state.postlist.filter(post => post.userId === userId);
};

export default PostListSlice;
