// controllers/experienceController.js
const Experience = require('../models/Experience');

exports.shareExperience = async (req, res) => {
  const { title, content, stage } = req.body;

  try {
    const experience = new Experience({
      user: req.user.id,
      title,
      content,
      stage
    });

    await experience.save();
    res.json(experience);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .populate('user', 'name')
      .sort({ timestamp: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).send('Server error');
  }
};