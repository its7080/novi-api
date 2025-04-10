// Load environment variables first
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
console.log("MongoDB URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/', authRoutes);
// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error!' });
});

const PORT = process.env.PORT || 5000;
console.log("PORT:", PORT);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
