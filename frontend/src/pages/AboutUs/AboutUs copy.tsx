// src/pages/AboutUs.tsx
import React from 'react';
import { Typography, Box, Container, Paper } from '@mui/material';

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '2em', marginTop: '3vh' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography paragraph>
          Welcome to "Find a Roomie" - where finding the ideal room or roommate is more than just a search; it's an experience. In today's fast-paced world, students and young professionals across the globe need a reliable, user-friendly platform to find their next home away from home. That's where we come in.
        </Typography>
        <Typography paragraph>
          At "Find a Roomie," we blend technology with personal touch to ensure you find the room that doesn't just fit your needs, but also matches your vibe. Free to list, search, and communicate, our platform is your go-to destination whether you’re looking to rent out a space or find one.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Why Choose Us?
        </Typography>
        <Typography paragraph>
          Dual Functionality: Whether you're listing a room with your specific preferences or searching for one, our platform caters to both needs with equal finesse.
        </Typography>
        
        <Typography paragraph>
          "Find a Roomie" isn't just about finding a room or a roommate; it's about discovering a space where you belong, a place that feels like home. So, whether you're listing or looking, we're here to make sure your next move is the right one. Welcome to a world of easier, safer, and friendlier room hunting!
        </Typography>
       
      </Paper>
    </Container>
  );
};

export default AboutUs;
