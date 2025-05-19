const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  { email: 'demo@jananiaarogya.com', password: 'demo@123', role: 'user' },
  { email: 'admin@jananiaarogya.com', password: 'admin@123', role: 'admin' },
];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token, user: { email: user.email, role: user.role } });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
