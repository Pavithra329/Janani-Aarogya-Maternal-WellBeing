// src/components/About.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const AboutContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '800px',
  margin: '0 auto',
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: theme.shadows[3],
}));

function About() {
  return (
    <AboutContainer>
      <SectionPaper elevation={3}>
        <Typography variant="h4" gutterBottom color="primary">
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to <em>Janani Aarogya</em>, a revolutionary maternal care app blending advanced technology with compassionate community support. Our mission is to provide comprehensive care for expectant and new mothers, ensuring a healthy and fulfilling journey through pregnancy and early motherhood.
        </Typography>
      </SectionPaper>

      <SectionPaper elevation={3}>
        <Typography variant="h5" gutterBottom color="primary">
          Our Vision
        </Typography>
        <Typography variant="body1" paragraph>
          We aim to offer personalized, culturally sensitive care that aligns with each mother's unique circumstances and goals, fostering healthier families and communities.
        </Typography>
      </SectionPaper>

      <SectionPaper elevation={3}>
        <Typography variant="h5" gutterBottom color="primary">
          Our Technology
        </Typography>
        <Typography variant="body1" paragraph>
          Our advanced NLP-based engine delivers tailored care by analyzing:
        </Typography>
        <ul style={{ paddingLeft: '24px' }}>
          <li><Typography variant="body1"><em>Health Data</em>: Monitors vital health metrics for mother and baby.</Typography></li>
          <li><Typography variant="body1"><em>Lifestyle Insights</em>: Considers daily habits for practical advice.</Typography></li>
          <li><Typography variant="body1"><em>Cultural Sensitivity</em>: Provides culturally relevant recommendations.</Typography></li>
          <li><Typography variant="body1"><em>Personal Goals</em>: Supports individual health and wellness objectives.</Typography></li>
        </ul>
      </SectionPaper>

      <SectionPaper elevation={3}>
        <Typography variant="h5" gutterBottom color="primary">
          Personalized Care
        </Typography>
        <Typography variant="body1" paragraph>
          Janani Aarogya offers:
        </Typography>
        <ul style={{ paddingLeft: '24px' }}>
          <li><Typography variant="body1"><em>Prenatal Tips</em>: Customized advice for managing pregnancy and preparing for childbirth.</Typography></li>
          <li><Typography variant="body1"><em>Mental Health Support</em>: Resources for emotional well-being.</Typography></li>
          <li><Typography variant="body1"><em>Nutrition Guidance</em>: Personalized dietary recommendations.</Typography></li>
        </ul>
      </SectionPaper>

      <SectionPaper elevation={3}>
        <Typography variant="h5" gutterBottom color="primary">
          Why Choose Us?
        </Typography>
        <ul style={{ paddingLeft: '24px' }}>
          <li><Typography variant="body1"><em>Holistic Care</em>: Physical, mental, and emotional support.</Typography></li>
          <li><Typography variant="body1"><em>Culturally Tailored</em>: Respectful of diverse backgrounds.</Typography></li>
          <li><Typography variant="body1"><em>Goal-Oriented</em>: Aligns with individual health and wellness goals.</Typography></li>
        </ul>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          Join Janani Aarogya for personalized, compassionate care every step of the way, making motherhood a joyous and empowering experience.
        </Typography>
      </SectionPaper>
    </AboutContainer>
  );
}

export default About;