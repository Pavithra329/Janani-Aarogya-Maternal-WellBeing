// controllers/rewardController.js
const Reward = require('../models/Reward');
const User = require('../models/User');

exports.addReward = async (userId, points, reason) => {
  const reward = new Reward({ user: userId, points, reason });
  await reward.save();
  await User.findByIdAndUpdate(userId, { $inc: { rewardPoints: points } });
  return reward;
};

exports.getUserRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ user: req.user.id });
    const user = await User.findById(req.user.id);
    res.json({ rewards, totalPoints: user.rewardPoints });
  } catch (err) {
    res.status(500).send('Server error');
  }
};