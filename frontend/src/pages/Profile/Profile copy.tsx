import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Grid, Typography, Paper } from '@mui/material';

const UserProfile: React.FC = () => {
  const sessionUser = useSelector((state: RootState) => state.user);
  const isLogged = Boolean(sessionUser.userId);

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={2} direction="column">
        {isLogged ? (
          <>
            <Typography variant="h6">User ID: {sessionUser.userId}</Typography>
            <Typography variant="h6">First Name: {sessionUser.firstName}</Typography>
            <Typography variant="h6">Last Name: {sessionUser.lastName}</Typography>
            <Typography variant="h6">Age: {sessionUser.age}</Typography>
            <Typography variant="h6">Gender: {sessionUser.gender}</Typography>
            <Typography variant="h6">Email: {sessionUser.email}</Typography>
            <Typography variant="h6">Phone: {sessionUser.phone}</Typography>
          </>
        ) : (
          <Typography variant="body1">Please log in to view your profile details.</Typography>
        )}
      </Grid>
    </Paper>
  );
};

export default UserProfile;
