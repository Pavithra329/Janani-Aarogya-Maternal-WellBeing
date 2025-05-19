import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CssBaseline,
  Box,
  ThemeProvider,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Stack,
  Avatar,
  Divider,
  Grow,
  Zoom
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  Menu as MenuIcon, 
  Close,
  AccountCircle,
  Favorite,
  Chat,
  School,
  CardGiftcard,
  Forum,
  Lightbulb,
  Help,
  LibraryBooks,
  AccessibilityNew as AccessibilityNewIcon,
  PregnantWoman as PregnantWomanIcon,
  BabyChangingStation as BabyChangingStationIcon,
  Timeline,
  RateReview,
  Payment
} from '@mui/icons-material';

// Import all components
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import ExpertAdvice from './components/ExpertAdvice';
import MessagingPlatform from './components/MessagingPlatform';
import RewardPoints from './components/RewardPoints';
import Milestones from './components/Milestones';
import SharedExperiences from './components/SharedExperiences';
import Quiz from './components/Quiz';
import About from './components/About';
import Feedback from './components/Feedback';
import Resources from './components/Resources';
import PrePregnancy from './components/PrePregnancy';
import Pregnancy from './components/Pregnancy';
import PostPregnancy from './components/PostPregnancy';
import logo from './logo.jpeg';
import PaymentPage from './components/PaymentPage';
import DailyTips from './components/DailyTips';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8e24aa',
      light: '#c158dc',
      dark: '#5c007a',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#fce4ec',
    },
    text: {
      primary: '#4a148c',
    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 20px',
          margin: '0 8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px'
          }
        }
      }
    }
  }
});

const Logo = styled('img')({
  height: '50px',
  marginRight: '16px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
});

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
});

const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  marginLeft: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[4]
  }
}));

const FeatureButton = styled(Button)(({ theme }) => ({
  minWidth: '200px',
  height: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  margin: '12px',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  boxShadow: theme.shadows[2],
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
  '& .MuiButton-startIcon': {
    margin: '0 0 8px 0',
    fontSize: '2.5rem'
  }
}));

const FeatureGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  padding: '20px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto'
});

const featureItems = [
  {
    title: "Pre-Pregnancy",
    icon: <AccessibilityNewIcon fontSize="large" />,
    link: "/pre-pregnancy",
    color: "primary",
    delay: 100
  },
  {
    title: "Pregnancy",
    icon: <PregnantWomanIcon fontSize="large" />,
    link: "/pregnancy",
    color: "primary",
    delay: 200
  },
  {
    title: "Post-Pregnancy",
    icon: <BabyChangingStationIcon fontSize="large" />,
    link: "/post-pregnancy",
    color: "primary",
    delay: 300
  },
  {
    title: "Health Chatbot",
    icon: <Chat fontSize="large" />,
    link: "/chatbot",
    color: "secondary",
    delay: 100
  },
  {
    title: "Expert Advice",
    icon: <School fontSize="large" />,
    link: "/expert-advice",
    color: "secondary",
    delay: 200
  },
  {
    title: "Messaging",
    icon: <Forum fontSize="large" />,
    link: "/messaging",
    color: "secondary",
    delay: 300
  },
  {
    title: "Earn Rewards",
    icon: <CardGiftcard fontSize="large" />,
    link: "/quiz",
    color: "secondary",
    delay: 100
  },
  {
    title: "Milestones",
    icon: <Timeline fontSize="large" />,
    link: "/milestones",
    color: "secondary",
    delay: 200
  },
  {
    title: "Shared Experiences",
    icon: <Favorite fontSize="large" />,
    link: "/experiences",
    color: "secondary",
    delay: 300
  },
  {
    title: "Daily Tips",
    icon: <Lightbulb fontSize="large" />,
    link: "/dailytips",
    color: "secondary",
    delay: 100
  },
  {
    title: "Resources",
    icon: <LibraryBooks fontSize="large" />,
    link: "/resources",
    color: "secondary",
    delay: 200
  },
  {
    title: "Payment",
    icon: <Payment fontSize="large" />,
    link: "/payment",
    color: "secondary",
    delay: 300
  },
  {
    title: "Feedback",
    icon: <RateReview fontSize="large" />,
    link: "/feedback",
    color: "secondary",
    delay: 100
  },
  {
    title: "About Us",
    icon: <AccountCircle fontSize="large" />,
    link: "/about",
    color: "secondary",
    delay: 200
  }
];

const App = () => {
  const [rewardPoints, setRewardPoints] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(true);

  const handleUpdateRewards = (points) => {
    setRewardPoints(rewardPoints + points);
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleClosePopup = () => setOpenPopup(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <AppBar position="fixed" elevation={4} sx={{ background: 'linear-gradient(135deg, #8e24aa 0%, #ff4081 100%)' }}>
            <Toolbar>
              <StyledLink to="/">
                <Logo src={logo} alt="Logo" />
              </StyledLink>
              <Typography variant="h6" sx={{ 
                flexGrow: 1, 
                fontWeight: 'bold', 
                fontSize: '1.8rem',
                background: 'linear-gradient(to right, #ffffff, #f3e5f5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Janani Aarogya
              </Typography>
              
              {isLoggedIn ? (
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button 
                    color="inherit" 
                    component={StyledLink} 
                    to="/rewards"
                    startIcon={<CardGiftcard />}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.25)',
                      }
                    }}
                  >
                    {rewardPoints} Points
                  </Button>
                  <UserAvatar onClick={handleMenuClick}>
                    <AccountCircle fontSize="large" />
                  </UserAvatar>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Button 
                    color="inherit" 
                    component={StyledLink} 
                    to="/about"
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                  >
                    About
                  </Button>
                  <Button 
                    color="inherit" 
                    onClick={handleLogin}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                      }
                    }}
                  >
                    Login
                  </Button>
                  <IconButton 
                    color="inherit" 
                    onClick={handleMenuClick}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Stack>
              )}

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    borderRadius: '16px',
                    padding: '8px 0',
                    minWidth: '220px',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f3e5f5 100%)',
                  }
                }}
              >
                {isLoggedIn && [
                  <MenuItem 
                    key="profile" 
                    component={StyledLink} 
                    to="/profile" 
                    onClick={handleMenuClose}
                    sx={{
                      '&:hover': {
                        background: 'linear-gradient(145deg, #f3e5f5 0%, #e1bee7 100%)',
                      }
                    }}
                  >
                    <AccountCircle sx={{ mr: 1, color: 'secondary.main' }} /> 
                    <Typography variant="body1" fontWeight="500">My Profile</Typography>
                  </MenuItem>,
                  <Divider key="divider1" sx={{ my: 1 }} />
                ]}
                {featureItems.map((item, index) => (
                  <MenuItem 
                    key={index}
                    component={StyledLink} 
                    to={item.link} 
                    onClick={handleMenuClose}
                    sx={{
                      '&:hover': {
                        background: 'linear-gradient(145deg, #f3e5f5 0%, #e1bee7 100%)',
                      }
                    }}
                  >
                    {React.cloneElement(item.icon, { sx: { mr: 1, color: `${item.color}.main` } })}
                    <Typography variant="body1" fontWeight="500">{item.title}</Typography>
                  </MenuItem>
                ))}
                {isLoggedIn && [
                  <Divider key="divider2" sx={{ my: 1 }} />,
                  <MenuItem 
                    key="logout" 
                    onClick={() => { handleLogout(); handleMenuClose(); }}
                    sx={{
                      '&:hover': {
                        background: 'linear-gradient(145deg, #ffebee 0%, #ffcdd2 100%)',
                      }
                    }}
                  >
                    <Close sx={{ mr: 1, color: 'error.main' }} /> 
                    <Typography variant="body1" fontWeight="500">Logout</Typography>
                  </MenuItem>
                ]}
              </Menu>
            </Toolbar>
          </AppBar>

          <Box component="main" sx={{ flexGrow: 1, pt: '80px' }}>
            <Routes>
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
              <Route path="/pre-pregnancy" element={<PrePregnancy />} />
              <Route path="/pregnancy" element={<Pregnancy />} />
              <Route path="/post-pregnancy" element={<PostPregnancy />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/expert-advice" element={<ExpertAdvice />} />
              <Route path="/messaging" element={<MessagingPlatform />} />
              <Route path="/rewards" element={<RewardPoints rewardPoints={rewardPoints} />} />
              <Route path="/milestones" element={<Milestones />} />
              <Route path="/experiences" element={<SharedExperiences />} />
              <Route path="/quiz" element={<Quiz onCorrectAnswer={handleUpdateRewards} />} />
              <Route path="/about" element={<About />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/dailytips" element={<DailyTips />} />
            </Routes>

            {isLoggedIn && (
              <Box sx={{ py: 6, background: 'linear-gradient(to bottom, #f3e5f5 0%, #ffffff 100%)' }}>
                <Container maxWidth="lg">
                  <Typography 
                    variant="h4" 
                    align="center" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 4,
                      background: 'linear-gradient(to right, #8e24aa, #ff4081)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Explore All Features
                  </Typography>
                  <FeatureGrid>
                    {featureItems.map((item, index) => (
                      <Grow in timeout={item.delay} key={index}>
                        <Zoom in style={{ transitionDelay: `${item.delay}ms` }}>
                          <FeatureButton
                            component={Link}
                            to={item.link}
                            variant="contained"
                            color={item.color}
                            startIcon={item.icon}
                            sx={{
                              background: `linear-gradient(135deg, ${theme.palette[item.color].main} 0%, ${theme.palette[item.color].light} 100%)`,
                              color: 'white',
                              '&:hover': {
                                background: `linear-gradient(135deg, ${theme.palette[item.color].dark} 0%, ${theme.palette[item.color].main} 100%)`,
                              }
                            }}
                          >
                            <Typography variant="subtitle1" fontWeight="600">
                              {item.title}
                            </Typography>
                          </FeatureButton>
                        </Zoom>
                      </Grow>
                    ))}
                  </FeatureGrid>
                </Container>
              </Box>
            )}
          </Box>

          <Dialog
            open={openPopup}
            TransitionComponent={Slide}
            keepMounted
            onClose={handleClosePopup}
            PaperProps={{
              sx: {
                borderRadius: '16px',
                padding: '16px',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f3e5f5 100%)'
              }
            }}
          >
            <DialogTitle sx={{ 
              textAlign: 'center', 
              fontWeight: 'bold', 
              color: theme.palette.primary.main,
              fontSize: '1.5rem',
              py: 3
            }}>
              Welcome to Janani Aarogya!
            </DialogTitle>
            <IconButton
              onClick={handleClosePopup}
              sx={{
                position: 'absolute',
                right: 12,
                top: 12,
                color: theme.palette.primary.main
              }}
            >
              <Close />
            </IconButton>
            <DialogContent>
              <Typography variant="body1" align="center" gutterBottom sx={{ mb: 2 }}>
                Your comprehensive guide for maternal health and wellness
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                We're here to support you through every stage of your motherhood journey
              </Typography>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                gap: 2,
                mt: 3
              }}>
                {featureItems.slice(0, 3).map((item, index) => (
                  <Grow in timeout={(index + 1) * 300} key={index}>
                    <Button
                      component={Link}
                      to={item.link}
                      onClick={handleClosePopup}
                      variant="contained"
                      color={item.color}
                      startIcon={item.icon}
                      sx={{
                        py: 2,
                        background: `linear-gradient(135deg, ${theme.palette[item.color].main} 0%, ${theme.palette[item.color].light} 100%)`,
                        color: 'white',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette[item.color].dark} 0%, ${theme.palette[item.color].main} 100%)`,
                        }
                      }}
                    >
                      {item.title}
                    </Button>
                  </Grow>
                ))}
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
              <Button 
                onClick={handleClosePopup} 
                color="secondary"
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1,
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                  }
                }}
              >
                Get Started
              </Button>
            </DialogActions>
          </Dialog>

          <Box component="footer" sx={{ 
            bgcolor: 'primary.main', 
            color: '#fff', 
            textAlign: 'center', 
            p: 3,
            mt: 'auto',
            background: 'linear-gradient(135deg, #8e24aa 0%, #5c007a 100%)'
          }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} Janani Aarogya. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;