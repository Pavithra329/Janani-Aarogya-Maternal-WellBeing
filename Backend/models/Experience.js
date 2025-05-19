// models/Experience.js
const experienceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    stage: { type: String, enum: ['pre', 'during', 'post'], required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: String,
      timestamp: { type: Date, default: Date.now }
    }],
    timestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Experience', experienceSchema);