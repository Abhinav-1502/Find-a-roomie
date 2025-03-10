import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomPost from '../../models/roomPost';
import ImageViewer from '../testPages/imageViewer';
import { Button, Grid, Typography } from '@mui/material';
import FiltersBar from '../testPages/FiltersBar';
import RoomieCard from '../../components/RoomiePosting/RoomieCard';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { loadPostList, selectPostsByUserId } from '../../redux/slices/PostList';
import './listing.css'
import { error } from 'console';
import GridPosts from '../Listing Page/GridPosts';
import { stat } from 'fs';

const MyListings: React.FC = () => {
  const getData = useSelector((state:RootState)=>state.postlist);
  const sessionUser = useSelector((state:RootState)=>state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/roomposts/`);
        dispatch(loadPostList(response.data.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if(getData.length<1){
        fetchData();
    }
  }, []);
  const finalPosts = useSelector(selectPostsByUserId(sessionUser.userId)); // Use finalPosts state

  const handlePostOpen = (post: RoomPost) =>{
    navigate(`/listings/${post.postId}`, { state: { roomPost: post }});
    console.log(post.postId);
  } 
 
  return (
    <div className='Listings'>
        <Typography variant='h3'> My Listings</Typography>
        <GridPosts posts={finalPosts} handlePostOpen={handlePostOpen}/>
    </div>
  );
};
 
export default MyListings;
 