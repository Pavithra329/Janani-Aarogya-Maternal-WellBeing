// src/components/ExpertAdvice.js
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Avatar, 
  Divider,
  Grid
} from '@mui/material';
import { styled } from '@mui/system';
import VideoConference from './VideoConference';
import {
  AccountCircle,
  MedicalServices,
  QuestionAnswer,
  Schedule
} from '@mui/icons-material';

const specialists = [
  { name: 'Dr. John Doe', specialty: 'OB-GYN', experience: '15 years', image: require('./d1.jpg') },
  { name: 'Dr. Emily Smith', specialty: 'Pediatrician', experience: '12 years', image: require('./d2.jpg') },
  { name: 'Dr. Michael Johnson', specialty: 'Nutritionist', experience: '10 years', image: require('./d3.jpg') },
  { name: 'Dr. Sarah Adams', specialty: 'Psychologist', experience: '8 years', image: require('./d4.png') },
  { name: 'Dr. Jessica Brown', specialty: 'Lactation Consultant', experience: '7 years', image: require('./d5.jpg') }
];

const ExpertContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '1200px',
  margin: '0 auto',
}));

const SpecialistCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

function ExpertAdvice() {
  const [questions, setQuestions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [startVideoConference, setStartVideoConference] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      setQuestions([...questions, { text: userInput, timestamp: new Date().toISOString() }]);
      setUserInput('');
    }
  };

  const handleBookAppointment = (specialist) => {
    setSelectedSpecialist(specialist);
  };

  return (
    <ExpertContainer>
      <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 4 }}>
        Expert Advice
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: '12px' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <MedicalServices sx={{ mr: 1 }} /> Our Specialists
            </Typography>
            <Typography variant="body1" paragraph>
              Select a specialist to book an appointment or video consultation:
            </Typography>
            
            <List>
              {specialists.map((specialist, index) => (
                <React.Fragment key={index}>
                  <SpecialistCard 
                    elevation={3} 
                    onClick={() => handleBookAppointment(specialist)}
                    sx={{ 
                      backgroundColor: selectedSpecialist?.name === specialist.name ? 'action.selected' : 'background.paper'
                    }}
                  >
                    <ListItem>
                      <Avatar src={specialist.image} sx={{ width: 56, height: 56, mr: 2 }} />
                      <ListItemText
                        primary={specialist.name}
                        secondary={`${specialist.specialty} | ${specialist.experience} experience`}
                      />
                    </ListItem>
                  </SpecialistCard>
                  {index < specialists.length - 1 && <Divider sx={{ my: 1 }} />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <QuestionAnswer sx={{ mr: 1 }} /> Ask a Question
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your question here..."
                sx={{ mb: 2 }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={!userInput.trim()}
              >
                Submit Question
              </Button>
            </Box>

            {questions.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Your Questions:
                </Typography>
                <List sx={{ maxHeight: '200px', overflow: 'auto' }}>
                  {questions.map((question, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={question.text}
                          secondary={new Date(question.timestamp).toLocaleString()}
                        />
                      </ListItem>
                      {index < questions.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </>
            )}
          </Paper>

          {selectedSpecialist && (
            <Paper elevation={3} sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule sx={{ mr: 1 }} /> Appointment with {selectedSpecialist.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={selectedSpecialist.image} sx={{ width: 64, height: 64, mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1">{selectedSpecialist.specialty}</Typography>
                  <Typography variant="body2">{selectedSpecialist.experience} experience</Typography>
                </Box>
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => setStartVideoConference(true)}
                sx={{ mt: 2 }}
              >
                Start Video Consultation
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>

      {startVideoConference && selectedSpecialist && (
        <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', mt: 3 }}>
          <VideoConference 
            roomName={`${selectedSpecialist.name.replace(/\s+/g, '')}-${Date.now()}`} 
            displayName={selectedSpecialist.name} 
          />
        </Paper>
      )}
    </ExpertContainer>
  );
}

export default ExpertAdvice;