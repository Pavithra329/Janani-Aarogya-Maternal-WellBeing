// src/components/DailyTips.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';

const TipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  maxWidth: '600px',
  margin: '0 auto',
}));

const TipPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
  textAlign: 'center',
  minHeight: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
}));

function DailyTips() {
  const tips = [
    "Stay hydrated by drinking plenty of water throughout the day.",
    "Get enough sleep whenever possible, even if it means taking naps.",
    "Eat a balanced diet rich in fruits, vegetables, and whole grains.",
    "Make time for regular physical activity, such as walking or yoga.",
    "Practice deep breathing or meditation to reduce stress.",
    "Reach out for support from family, friends, or support groups.",
    "Spend quality time with your baby to strengthen your bond.",
    "Take breaks and make time for yourself to recharge.",
    "Keep a journal to track your thoughts and feelings.",
    "Set realistic goals and don't be too hard on yourself.",
    "Schedule regular check-ups with your healthcare provider to monitor your health",
    "Learn to say no to commitments that overwhelm you or don't align with your priorities",
    "Incorporate stretching exercises into your routine to maintain flexibility",
    "Stay informed about current events, but avoid overexposure to negative news",
    "Use essential oils or aromatherapy to create a calming environment",
    "Spend time in nature to boost your mood and reduce stress",
    "Practice good hygiene, such as regular handwashing, to prevent illness",
    "Join a class or group activity to meet new people and build a community",
    "Make use of technology to stay connected with distant friends and family",
    "Create a vision board to visualize and focus on your goals"
  ];

  const [dailyTip, setDailyTip] = useState('Loading your daily tip...');
  const [currentIndex, setCurrentIndex] = useState(0);

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentIndex(randomIndex);
    setDailyTip(tips[randomIndex]);
  };

  useEffect(() => {
    getRandomTip();
  }, []);

  return (
    <TipsContainer>
      <Typography variant="h4" gutterBottom color="primary">
        Daily Tips
      </Typography>
      <TipPaper elevation={3}>
        <Typography variant="h6" component="p" sx={{ fontStyle: 'italic',color:'primary.main' }}>
          {dailyTip}
        </Typography>
      </TipPaper>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={getRandomTip}
        sx={{ borderRadius: '20px', padding: '10px 24px' }}
      >
        Get Another Tip
      </Button>
    </TipsContainer>
  );
}

export default DailyTips;