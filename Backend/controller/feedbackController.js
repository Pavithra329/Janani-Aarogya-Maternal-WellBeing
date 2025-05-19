// controllers/feedbackController.js
const Feedback = require('../models/Feedback');
const User = require('../models/User');

exports.submitFeedback = async (req, res) => {
  const { message, rating } = req.body;

  try {
    const feedback = new Feedback({
      user: req.user.id,
      message,
      rating
    });

    await feedback.save();
    
    // Add reward points for feedback
    await User.findByIdAndUpdate(req.user.id, { $inc: { rewardPoints: 10 } });
    
    res.json(feedback);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'name');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).send('Server error');
  }
};