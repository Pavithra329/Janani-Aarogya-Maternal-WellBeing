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
  Favorite as HeartIcon,
  Restaurant as NutritionIcon,
  ShoppingCart as CartIcon,
  CheckCircle as CheckIcon,
  Event as CalendarIcon,
  Woman as WomanIcon,
  Science as ScienceIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PrePregnancyContainer = styled(Box)(({ theme }) => ({
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
  { id: 1, name: 'Folic Acid Supplements', price: 300, icon: <HeartIcon /> },
  { id: 2, name: 'Prenatal Vitamins', price: 400, icon: <HeartIcon /> },
  { id: 3, name: 'Iron Supplements', price: 250, icon: <HeartIcon /> },
  { id: 4, name: 'Fertility Superfoods', price: 350, icon: <HeartIcon /> },
  { id: 5, name: 'Organic Meal Plan', price: 500, icon: <HeartIcon /> },
];

const fertilityTips = [
  {
    title: "Track Your Cycle",
    content: "Use a calendar or app to track your menstrual cycle and identify your fertile window."
  },
  {
    title: "Healthy Weight",
    content: "Achieve and maintain a healthy BMI (18.5-24.9) for optimal fertility."
  },
  {
    title: "Avoid Toxins",
    content: "Reduce exposure to environmental toxins like pesticides, lead, and BPA."
  },
  {
    title: "Manage Stress",
    content: "Practice relaxation techniques like meditation or yoga to reduce stress levels."
  },
  {
    title: "Limit Caffeine",
    content: "Keep caffeine intake below 200mg per day (about 2 cups of coffee)."
  }
];

const PrePregnancy = () => {
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
    <PrePregnancyContainer>
      <Typography variant="h3" gutterBottom color="primary" sx={{ mb: 4, fontWeight: 'bold' }}>
        Pre-Pregnancy Care
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <HealthIcon />
                </Avatar>
                <Typography variant="h5">Preconception Health</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Essential health checks and lifestyle changes to optimize your fertility and prepare your body for pregnancy.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="https://youtu.be/FuVs2EZ0mBY?si=oq3HFVVOBmzK96qL"
                target="_blank"
                startIcon={<HealthIcon />}
                sx={{ mt: 1 }}
              >
                Preconception Guide
              </Button>
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <ScienceIcon />
                </Avatar>
                <Typography variant="h5">Fertility Awareness</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Learn about your menstrual cycle, ovulation, and how to identify your most fertile days.
              </Typography>
              
              {fertilityTips.map((tip, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  {/* <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{tip.title}</Typography>
                  </AccordionSummary> */}
                  <AccordionDetails>
                    <Typography>{tip.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <NutritionIcon />
                </Avatar>
                <Typography variant="h5">Pre-Pregnancy Nutrition</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Essential nutrients to build up before conception for a healthy pregnancy and baby.
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
                    Add supplements to support your preconception health
                  </Typography>
                </Box>
              )}
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pre-Pregnancy Checklist
              </Typography>
              <List>
                {[
                  "Schedule preconception checkup",
                  "Start folic acid 3 months before",
                  "Review medications with doctor",
                  "Quit smoking/alcohol",
                  "Reduce caffeine intake",
                  "Achieve healthy weight",
                  "Update vaccinations",
                  "Begin tracking menstrual cycle"
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
    </PrePregnancyContainer>
  );
};

export default PrePregnancy;