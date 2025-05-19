import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Box, 
  Paper, 
  Alert,
  Snackbar,
  InputAdornment,
  Fade
} from '@mui/material';
import { 
  Send,
  Person,
  Email,
  Message,
  CheckCircle
} from '@mui/icons-material';
import { styled } from '@mui/system';

const FeedbackForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  maxWidth: 600,
  margin: '0 auto',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[8],
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
}));

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate form submission
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
    setOpenSnackbar(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={500}>
        <Box>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 4,
              color: 'primary.main'
            }}
          >
            Share Your Feedback
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              textAlign: 'center',
              mb: 4,
              color: 'text.secondary'
            }}
          >
            We value your thoughts and suggestions to improve our services
          </Typography>

          <FeedbackForm elevation={3}>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Your Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <TextField
                name="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <TextField
                name="message"
                label="Your Feedback"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={6}
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Message color="primary" sx={{ alignSelf: 'flex-start', mt: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <Box sx={{ textAlign: 'center' }}>
                <SubmitButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<Send />}
                  disabled={submitted}
                >
                  {submitted ? 'Thank You!' : 'Submit Feedback'}
                </SubmitButton>
              </Box>
            </form>
          </FeedbackForm>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              icon={<CheckCircle fontSize="inherit" />}
              sx={{ width: '100%' }}
            >
              Thank you for your feedback! We appreciate your input.
            </Alert>
          </Snackbar>
        </Box>
      </Fade>
    </Container>
  );
};

export default Feedback;