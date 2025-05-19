import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton,
  Divider,
  Grid,
  Avatar,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  Delete as DeleteIcon,
  LocalHospital as HealthIcon,
  ChildCare as BabyIcon,
  SelfImprovement as MentalIcon,
  Restaurant as NutritionIcon,
  ShoppingCart as CartIcon,
  CheckCircle as CheckIcon,
  Favorite as FavoriteIcon,
  ExpandMore as ExpandMoreIcon,
  FitnessCenter as YogaIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PregnancyContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '1200px',
  margin: '0 auto',
}));

const SectionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const nutritionItems = [
  { id: 1, name: 'Prenatal Vitamins', price: 400, icon: <FavoriteIcon /> },
  { id: 2, name: 'Iron Supplements', price: 350, icon: <FavoriteIcon /> },
  { id: 3, name: 'Calcium-Rich Foods', price: 300, icon: <FavoriteIcon /> },
  { id: 4, name: 'Organic Fruits Pack', price: 250, icon: <FavoriteIcon /> },
  { id: 5, name: 'Healthy Snacks Box', price: 200, icon: <FavoriteIcon /> },
];

const yogaPoses = [
  {
    name: "Tadasana (Mountain Pose)",
    description: "Stand tall with feet hip-width apart, arms by your sides, and palms facing forward. Lengthen your spine and engage your core muscles while breathing deeply."
  },
  {
    name: "Vrikshasana (Tree Pose)",
    description: "Stand on one leg and place the sole of the other foot on the inner thigh or calf of the standing leg. Keep your hands in a prayer position at the center of your chest."
  },
  {
    name: "Baddha Konasana (Bound Angle Pose)",
    description: "Sit on the floor with the soles of your feet together and knees apart. Hold your feet with your hands and sit tall, gently pressing your knees toward the floor."
  },
  {
    name: "Cat-Cow Stretch",
    description: "Get on your hands and knees, with wrists aligned under shoulders and knees under hips. Inhale as you arch your back (Cow), exhale as you round your spine (Cat)."
  },
  {
    name: "Sukhasana (Easy Pose)",
    description: "Sit cross-legged on the floor or on a cushion, spine tall and shoulders relaxed. Practice deep belly breathing."
  }
];

const Pregnancy = () => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find(cartItem => cartItem.id === item.id);
      if (itemInCart) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.id]: (prevQuantities[item.id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[id];
      return updatedQuantities;
    });
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <PregnancyContainer>
      <Typography variant="h3" gutterBottom color="primary" sx={{ mb: 4, fontWeight: 'bold' }}>
        Pregnancy Care
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <HealthIcon />
                </Avatar>
                <Typography variant="h5">Pregnancy Health Guide</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Essential information for each trimester, including what to expect, health checks, and warning signs to watch for.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="https://youtu.be/FuVs2EZ0mBY?si=oq3HFVVOBmzK96qL"
                target="_blank"
                startIcon={<HealthIcon />}
                sx={{ mt: 1 }}
              >
                Pregnancy Health Videos
              </Button>
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <BabyIcon />
                </Avatar>
                <Typography variant="h5">Baby Development</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Track your baby's growth week by week. Learn about developmental milestones and how to support your baby's health.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                href="https://youtu.be/-CWJYxIvoFQ?si=1MxILr23bnPvPtEm"
                target="_blank"
                startIcon={<BabyIcon />}
                sx={{ mt: 1 }}
              >
                Baby Development Resources
              </Button>
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <MentalIcon />
                </Avatar>
                <Typography variant="h5">Mental Wellbeing</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Resources for managing pregnancy-related anxiety, mood changes, and preparing emotionally for parenthood.
              </Typography>
              <Button
                variant="contained"
                color="success"
                href="https://youtu.be/SI3JtJTlDyY?si=T9NbvcmMxtCtYB1X"
                target="_blank"
                startIcon={<MentalIcon />}
                sx={{ mt: 1 }}
              >
                Mental Health Support
              </Button>
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <YogaIcon />
                </Avatar>
                <Typography variant="h5">Pregnancy Yoga</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Safe and beneficial yoga poses for each trimester to maintain flexibility, reduce stress, and prepare your body for childbirth.
              </Typography>
              
              {yogaPoses.map((pose, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{pose.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{pose.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <NutritionIcon />
                </Avatar>
                <Typography variant="h5">Pregnancy Nutrition</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Essential nutrition for you and your growing baby. These specially selected items support a healthy pregnancy.
              </Typography>
              
              <List>
                {nutritionItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <Avatar sx={{ bgcolor: 'action.selected', mr: 2 }}>
                        {item.icon}
                      </Avatar>
                      <ListItemText 
                        primary={item.name} 
                        secondary={`₹${item.price}`}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                      <Button
                        variant={quantities[item.id] ? "outlined" : "contained"}
                        color={quantities[item.id] ? "secondary" : "primary"}
                        onClick={() => addToCart(item)}
                        sx={{ borderRadius: '20px' }}
                      >
                        {quantities[item.id] ? `Added (${quantities[item.id]})` : "Add to Cart"}
                      </Button>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CartIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5">Your Cart</Typography>
                <Chip 
                  label={`${cart.length} items`} 
                  color="primary" 
                  size="small" 
                  sx={{ ml: 'auto' }}
                />
              </Box>

              {cart.length > 0 ? (
                <>
                  <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
                    {cart.map((item) => (
                      <React.Fragment key={item.id}>
                        <ListItem>
                          <ListItemText 
                            primary={item.name} 
                            secondary={`₹${item.price} × ${item.quantity}`}
                          />
                          <Typography variant="body1" sx={{ mr: 2 }}>
                            ₹{item.price * item.quantity}
                          </Typography>
                          <IconButton 
                            edge="end" 
                            onClick={() => removeFromCart(item.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                  <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Typography variant="h6">
                      Total: ₹{totalAmount}
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/payment"
                      startIcon={<CheckIcon />}
                      sx={{ mt: 2 }}
                    >
                      Proceed to Checkout
                    </Button>
                  </Box>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    Your cart is empty
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add nutrition items to support your pregnancy
                  </Typography>
                </Box>
              )}
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pregnancy Checklist
              </Typography>
              <List>
                {[
                  "Regular prenatal checkups",
                  "Take prenatal vitamins daily",
                  "Stay hydrated (8-10 glasses/day)",
                  "Monitor weight gain",
                  "Practice pelvic floor exercises",
                  "Attend childbirth classes",
                  "Prepare birth plan",
                  "Install car seat by 36 weeks"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <CheckIcon color="success" sx={{ mr: 1, fontSize: '18px' }} />
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </SectionCard>
        </Grid>
      </Grid>
    </PregnancyContainer>
  );
};

export default Pregnancy;