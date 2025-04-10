// Load environment variables first
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const app = require('./app');
const mongoose = require('mongoose');

// Database connection
const DB = process.env.MONGODB_URI;

mongoose.connect(DB)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});