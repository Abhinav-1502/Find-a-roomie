import React, { useState } from 'react';
import RoomPost from '../../models/roomPost';
import RoomieCard from '../../components/RoomiePosting/RoomieCard';
import { Container, Pagination } from '@mui/material';

interface GridPostsProps {
  posts: RoomPost[];
  handlePostOpen: (post: RoomPost) => void;
}

const GridPosts: React.FC<GridPostsProps> = ({ posts, handlePostOpen }) => {
  const postsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Container style={{ display: 'flex', flexDirection: 'column', maxWidth: '90vw' }}>
        {Array.isArray(currentPosts) ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            padding: '20px'
          }}>
            {currentPosts.map((room) => (
              <div key={room.postId} style={{ marginBottom: '20px' }}>
                <RoomieCard roommate={room} />
                {/* ...rest of the code for displaying room details... */}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom:35 }}>
        <Pagination
          count={Math.ceil(posts.length / postsPerPage)}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          size="large"
        />
      </div>
    </>
  );
};

export default GridPosts;
