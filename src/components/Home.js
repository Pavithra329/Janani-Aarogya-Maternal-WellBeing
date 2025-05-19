import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Fade,
  Container,
  Avatar,
  IconButton,
  InputAdornment,
  Divider,
  Slide,
  Grow
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  AccountCircle, 
  Visibility, 
  VisibilityOff,
  Lock,
  Email,
  ArrowForward,
  Favorite,
  MedicalServices,
  ChildCare,
  SelfImprovement
} from '@mui/icons-material';
import backgroundImage from './bg.jpg';

const HeroBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(148, 0, 211, 0.85), url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(4),
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  maxWidth: '450px',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: theme.shadows[10],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[16]
  }
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    backgroundColor: '#ffffff'
  }
}));

const Home = ({ isLoggedIn, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const features = [
    {
      icon: <Favorite fontSize="large" color="primary" />,
      title: "Pre-Pregnancy Care",
      description: "Prepare your body for a healthy pregnancy journey",
      link: "/pre-pregnancy"
    },
    {
      icon: <MedicalServices fontSize="large" color="primary" />,
      title: "Pregnancy Guidance",
      description: "Expert advice for each trimester of your pregnancy",
      link: "/pregnancy"
    },
    {
      icon: <ChildCare fontSize="large" color="primary" />,
      title: "Post-Pregnancy Support",
      description: "Resources for recovery and newborn care",
      link: "/post-pregnancy"
    },
    {
      icon: <SelfImprovement fontSize="large" color="primary" />,
      title: "Wellness Programs",
      description: "Mental and physical health support for mothers",
      link: "/resources"
    }
  ];

  return (
    <HeroBox>
      <Container maxWidth="lg">
        <Fade in timeout={800}>
          <Box>
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Welcome to Janani Aarogya
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              Your trusted companion for maternal health and wellness
            </Typography>
            
            {!isLoggedIn ? (
              <Grow in timeout={1000}>
                <LoginPaper elevation={6}>
                  <Box display="flex" justifyContent="center" mb={3}>
                    <Avatar sx={{ 
                      bgcolor: 'primary.main', 
                      width: 60, 
                      height: 60,
                      boxShadow: 3
                    }}>
                      <AccountCircle fontSize="large" />
                    </Avatar>
                  </Box>
                  <Typography 
                    variant="h5" 
                    color="primary" 
                    gutterBottom 
                    sx={{ fontWeight: 'bold' }}
                  >
                    Login to Continue
                  </Typography>
                  <Box component="form" onSubmit={handleLogin}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Email or Username"
                      variant="outlined"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                      type="submit"
                      endIcon={<ArrowForward />}
                      sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: '12px'
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="body2" color="textSecondary">
                    Don't have an account? <Button color="primary">Sign up</Button>
                  </Typography>
                </LoginPaper>
              </Grow>
            ) : (
              <Slide direction="up" in timeout={500}>
                <Box>
                  <Paper elevation={6} sx={{ 
                    p: 4, 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    maxWidth: '600px',
                    mx: 'auto'
                  }}>
                    <Box display="flex" justifyContent="center" mb={3}>
                      <Avatar sx={{ 
                        bgcolor: 'secondary.main', 
                        width: 80, 
                        height: 80,
                        boxShadow: 3
                      }}>
                        <AccountCircle fontSize="large" />
                      </Avatar>
                    </Box>
                    <Typography 
                      variant="h4" 
                      color="primary" 
                      gutterBottom 
                      sx={{ fontWeight: 'bold' }}
                    >
                      Welcome Back!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                      You are now logged in to Janani Aarogya. Where would you like to go?
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      size="large"
                      href="/pre-pregnancy"
                      endIcon={<ArrowForward />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: '12px'
                      }}
                    >
                      Continue to Dashboard
                    </Button>
                  </Paper>

                  <Box sx={{ mt: 6 }}>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                      }}
                    >
                      Explore Our Features
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                        gap: 3,
                        mt: 3
                      }}
                    >
                      {features.map((feature, index) => (
                        <Grow in timeout={(index + 1) * 300} key={feature.title}>
                          <FeatureCard 
                            elevation={3}
                            onMouseEnter={() => setActiveFeature(index)}
                            onMouseLeave={() => setActiveFeature(null)}
                          >
                            <Box sx={{
                              width: 60,
                              height: 60,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'primary.light',
                              borderRadius: '50%',
                              mb: 2,
                              color: 'white'
                            }}>
                              {feature.icon}
                            </Box>
                            <Typography 
                              variant="h6" 
                              gutterBottom 
                              sx={{ fontWeight: 'bold' }}
                            >
                              {feature.title}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              {feature.description}
                            </Typography>
                            <Button
                              component={Link}
                              to={feature.link}
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ mt: 'auto' }}
                            >
                              Learn More
                            </Button>
                          </FeatureCard>
                        </Grow>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Slide>
            )}
          </Box>
        </Fade>
      </Container>
    </HeroBox>
  );
};

export default Home;