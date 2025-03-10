// Import necessary dependencies from React and Material-UI
import React, { useState, useEffect } from 'react';
import CarouselItem from '../../assets/images/CarouselItem2.jpg';
import CarouselItem1 from '../../assets/images/CarouselItem.jpg';
import { Box, Typography } from '@mui/material';

// Replace these with your actual testimonial data
const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: CarouselItem,
  },
  {
    id: 2,
    name: 'Jane Doe',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: CarouselItem1,
  },
];

// Define the TestimonialCarousel component
const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use useEffect to handle automatic testimonial transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3500); // Adjust the interval as needed

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Render the testimonial carousel
  return (
    <Box
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: 'auto', // Center align horizontally
        maxWidth: '20vw', // Set a maximum width if needed
      }}
    >
      {testimonials.map((testimonial, index) => (
        <Box
          key={testimonial.id}
          style={{
            display: index === currentIndex ? 'block' : 'none',
            width: '100%',
            transition: 'opacity 0.5s',
          }}
        >
          <img src={testimonial.image} alt={`Image ${index}`} style={{ width: '100%', borderRadius: '10px 10px 0 0', marginBottom: '10px'}} />
          <Box p={3} style={{ backgroundColor: '#fff', borderRadius: '0 0 10px 10px' }}>
            <Typography variant="h6">{testimonial.name}</Typography>
            <Typography variant="body1">{testimonial.text}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// Export the TestimonialCarousel component
export default TestimonialCarousel;
