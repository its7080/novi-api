const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: String,
  sender: { type: String, enum: ['user', 'bot'] },
  timestamp: { type: Date, default: Date.now }
});

const userChatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  },
  messages: [messageSchema],
  updatedAt: { type: Date, default: Date.now }
});


userChatSchema.index({ userId: 1 });

module.exports = mongoose.model('UserChat', userChatSchema);