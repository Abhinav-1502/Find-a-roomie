import React, { useState } from 'react';
import RoomPost from '../../models/roomPost';
import FilteredMap from '../../components/MapComponents/MapViewer';
import { Container } from '@mui/material';

interface MapPostsProps {
  posts: RoomPost[];
  handlePostOpen: (post: RoomPost) => void;
}

const MapPosts: React.FC<MapPostsProps> = ({ posts, handlePostOpen }) => {
  const postids = handlePostOpen;

  return (
    <>
    <Container style={{maxWidth: '90vw'}}>
    <FilteredMap posts={posts} handlePostOpen={handlePostOpen} />
    </Container>
    </>
  );
};

export default MapPosts;
