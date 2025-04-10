const UserChat = require('../models/chatHistroyModel');

exports.getChat = async (req, res) => {
  try {
    const chat = await UserChat.findOne({ userId: req.user._id })
      .populate('userId', 'name email'); // Optional: populate user details
    
    if (!chat) {
      return res.status(200).json({ 
        userId: req.user._id,
        messages: [],
        updatedAt: new Date()
      });
    }
    
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch chat',
      error: err.message 
    });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { content, sender } = req.body;
    
    if (!content || !sender) {
      return res.status(400).json({
        status: 'fail',
        message: 'Content and sender are required'
      });
    }

    const updatedChat = await UserChat.findOneAndUpdate(
      { userId: req.user._id },
      { 
        $push: { messages: { content, sender } },
        $set: { updatedAt: new Date() }
      },
      { new: true, upsert: true }
    );
    
    res.status(201).json({
      status: 'success',
      data: updatedChat
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to add message',
      error: err.message 
    });
  }
};

exports.processChatbotMessage = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        status: 'fail',
        message: 'Message content is required'
      });
    }

    await UserChat.findOneAndUpdate(
      { userId: req.user._id },
      { 
        $push: { messages: { content: message, sender: 'user' } },
        $set: { updatedAt: new Date() }
      },
      { upsert: true }
    );

    const botResponse = "This is a sample bot response"; 
    const updatedChat = await UserChat.findOneAndUpdate(
      { userId: req.user._id },
      { 
        $push: { messages: { content: botResponse, sender: 'bot' } },
        $set: { updatedAt: new Date() }
      },
      { new: true }
    );

    res.status(201).json({
      status: 'success',
      data: {
        response: botResponse,
        chat: updatedChat
      }
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to process message',
      error: err.message 
    });
  }
};