import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Avatar, 
  Divider,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  AccountCircle as UserIcon,
  Send as SendIcon,
  Favorite as LikeIcon,
  Comment as CommentIcon
} from '@mui/icons-material';

const ExperienceContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '800px',
  margin: '0 auto',
}));

const ExperienceCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '16px',
  boxShadow: theme.shadows[2],
}));

function SharedExperiences() {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      user: 'Priya S.',
      text: 'The yoga tips during pregnancy were a lifesaver for my back pain!',
      date: '2023-05-10',
      likes: 12,
      comments: 4
    },
    {
      id: 2,
      user: 'Ananya M.',
      text: 'The nutrition guide helped me maintain a balanced diet throughout my pregnancy.',
      date: '2023-05-08',
      likes: 8,
      comments: 2
    }
  ]);
  const [newExperience, setNewExperience] = useState('');

  const addExperience = () => {
    if (newExperience.trim() !== '') {
      const newEntry = {
        id: experiences.length + 1,
        user: 'You',
        text: newExperience,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0
      };
      setExperiences([newEntry, ...experiences]);
      setNewExperience('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addExperience();
    }
  };

  return (
    <ExperienceContainer>
      <Typography variant="h3" gutterBottom color="primary" sx={{ mb: 3 }}>
        Community Experiences
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Share Your Experience
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="What tips or experiences would you like to share with other mothers?"
          value={newExperience}
          onChange={(e) => setNewExperience(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          onClick={addExperience}
          disabled={!newExperience.trim()}
          sx={{ borderRadius: '20px' }}
        >
          Post
        </Button>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Recent Shares
      </Typography>

      {experiences.length > 0 ? (
        experiences.map((experience) => (
          <ExperienceCard key={experience.id} elevation={0}>
            <CardContent>
              <ListItem sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar>
                    <UserIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={experience.user} 
                  secondary={experience.date}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
              <Typography variant="body1" sx={{ ml: 8, mb: 2 }}>
                {experience.text}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                ml: 8,
                gap: 2
              }}>
                <Button 
                  size="small" 
                  startIcon={<LikeIcon />}
                  sx={{ color: 'text.secondary' }}
                >
                  {experience.likes}
                </Button>
                <Button 
                  size="small" 
                  startIcon={<CommentIcon />}
                  sx={{ color: 'text.secondary' }}
                >
                  {experience.comments}
                </Button>
              </Box>
            </CardContent>
          </ExperienceCard>
        ))
      ) : (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No experiences shared yet. Be the first to share!
          </Typography>
        </Paper>
      )}
    </ExperienceContainer>
  );
}

export default SharedExperiences;