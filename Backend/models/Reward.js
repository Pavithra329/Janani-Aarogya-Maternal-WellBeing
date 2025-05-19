// models/Reward.js
const rewardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true },
    reason: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Reward', rewardSchema);