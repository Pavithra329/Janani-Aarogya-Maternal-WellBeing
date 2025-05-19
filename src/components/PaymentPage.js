// src/components/PaymentPage.js
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/system';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '800px',
  margin: '0 auto',
}));

const PaymentCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const steps = ['Payment Details', 'Review', 'Complete'];

function PaymentPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <PaymentContainer>
      <Typography variant="h4" gutterBottom color="primary">
        Payment
      </Typography>
      
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <PaymentCard elevation={3}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <CreditCardIcon sx={{ mr: 1 }} /> Payment Details
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                  placeholder="1234 5678 9012 3456"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiration Date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                  placeholder="MM/YY"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                  placeholder="123"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name on Card"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Continue
              </Button>
            </Box>
          </Box>
        </PaymentCard>
      )}

      {activeStep === 1 && (
        <PaymentCard elevation={3}>
          <Typography variant="h5" gutterBottom>
            Review Your Order
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body1">
              Card ending in {formData.cardNumber.slice(-4)}
            </Typography>
            <Typography variant="body1">
              Expires {formData.expirationDate}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Confirm Payment
            </Button>
          </Box>
        </PaymentCard>
      )}

      {activeStep === 2 && (
        <PaymentCard elevation={3}>
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Payment Successful!
            </Typography>
            <Typography variant="body1" paragraph>
              Thank you for your purchase. Your payment has been processed successfully.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              href="/"
              sx={{ mt: 3 }}
            >
              Return to Home
            </Button>
          </Box>
        </PaymentCard>
      )}
    </PaymentContainer>
  );
}

export default PaymentPage;