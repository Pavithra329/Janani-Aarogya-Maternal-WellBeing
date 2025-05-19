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
  Chip
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  Delete as DeleteIcon,
  LocalHospital as RecoveryIcon,
  ChildCare as NewbornIcon,
  SelfImprovement as MentalHealthIcon,
  Restaurant as NutritionIcon,
  ShoppingCart as CartIcon,
  CheckCircle as CheckIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PostContainer = styled(Box)(({ theme }) => ({
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
  { id: 1, name: 'Postnatal Vitamins', price: 350, icon: <FavoriteIcon /> },
  { id: 2, name: 'Iron Supplements', price: 300, icon: <FavoriteIcon /> },
  { id: 3, name: 'Protein Powder', price: 450, icon: <FavoriteIcon /> },
  { id: 4, name: 'Organic Fruits Pack', price: 200, icon: <FavoriteIcon /> },
  { id: 5, name: 'Healthy Snacks Box', price: 250, icon: <FavoriteIcon /> },
];

const PostPregnancy = () => {
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
    <PostContainer>
      <Typography variant="h3" gutterBottom color="primary" sx={{ mb: 4, fontWeight: 'bold' }}>
        Post-Pregnancy Care
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <RecoveryIcon />
                </Avatar>
                <Typography variant="h5">Postpartum Recovery</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Essential guidance for physical recovery after childbirth, including perineal care, cesarean section recovery, and returning to exercise safely.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="https://youtu.be/FuVs2EZ0mBY?si=oq3HFVVOBmzK96qL"
                target="_blank"
                startIcon={<RecoveryIcon />}
                sx={{ mt: 1 }}
              >
                Recovery Guide
              </Button>
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <NewbornIcon />
                </Avatar>
                <Typography variant="h5">Newborn Care Essentials</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Learn about breastfeeding techniques, diaper changing, bathing, sleep safety, and recognizing newborn health signs.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                href="https://youtu.be/-CWJYxIvoFQ?si=1MxILr23bnPvPtEm"
                target="_blank"
                startIcon={<NewbornIcon />}
                sx={{ mt: 1 }}
              >
                Newborn Care Tutorials
              </Button>
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <MentalHealthIcon />
                </Avatar>
                <Typography variant="h5">Mental Health Support</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Resources for managing postpartum depression, anxiety, and emotional changes. Learn self-care strategies and when to seek professional help.
              </Typography>
              <Button
                variant="contained"
                color="success"
                href="https://youtu.be/SI3JtJTlDyY?si=T9NbvcmMxtCtYB1X"
                target="_blank"
                startIcon={<MentalHealthIcon />}
                sx={{ mt: 1 }}
              >
                Mental Wellness Resources
              </Button>
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <NutritionIcon />
                </Avatar>
                <Typography variant="h5">Postpartum Nutrition</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Essential nutrition for recovery and breastfeeding. These specially selected items support your postpartum healing journey.
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
                    Add nutrition items to support your recovery
                  </Typography>
                </Box>
              )}
            </CardContent>
          </SectionCard>

          <SectionCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Postpartum Checklist
              </Typography>
              <List>
                {[
                  "6-week postpartum checkup",
                  "Pelvic floor exercises",
                  "Monitor bleeding (lochia)",
                  "Stay hydrated",
                  "Accept help from others",
                  "Rest when baby sleeps",
                  "Watch for signs of infection",
                  "Be patient with your body"
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
    </PostContainer>
  );
};

export default PostPregnancy;