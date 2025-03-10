import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Container, Paper, Grid } from '@mui/material';
import './AboutUs.css'; // Ensure this CSS file is in your project

// Import images
import teamImage from './friends.png';
import TestimonialCarousel from './TestimonialCarousel';

const AboutUs: React.FC = () => {
  const { t } = useTranslation(); // Hook to access translations
  
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '2em', marginTop: '2vh' , marginBottom: '2vh' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('aboutUs.title')}
        </Typography>
        <Typography paragraph>
          {t('aboutUs.intro')}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          {t('whyChooseUs.title')}
        </Typography>
        <Typography paragraph>
          {t('whyChooseUs.functionality')}
        </Typography>
        {/* ... More paragraphs for each section ... */}
        <Typography paragraph>
          {t ('closing')}
        </Typography>

        {/* Image and animation section */}
        <Grid container spacing={4} justifyContent="center" className="teamContainer">
          <Grid item xs={12} sm={6} md={4} className="teamItem">
            <img src={teamImage} alt="Our Team" className="teamImage"/>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h4"> {"Testimonials"} </Typography>
      <TestimonialCarousel />
      <div style={{margin:'10px'}}></div>
    </Container>
  );
};

export default AboutUs;
