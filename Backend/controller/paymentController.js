// controllers/paymentController.js
const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  const { amount, paymentMethod } = req.body;

  try {
    const payment = new Payment({
      user: req.user.id,
      amount,
      paymentMethod
    });

    await payment.save();
    
    // In a real app, integrate with payment gateway here
    // For demo, we'll simulate successful payment
    payment.status = 'completed';
    payment.transactionId = `txn_${Date.now()}`;
    await payment.save();

    res.json(payment);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id });
    res.json(payments);
  } catch (err) {
    res.status(500).send('Server error');
  }
};