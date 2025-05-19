// models/Feedback.js
const feedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    timestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Feedback', feedbackSchema);