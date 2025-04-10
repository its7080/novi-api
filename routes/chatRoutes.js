const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');
const authController = require('../controller/authController');
router.use(authController.protect);
router.route('/')
  .get(chatController.getChat)
  .post(chatController.addMessage);
router.post('/bot', chatController.processChatbotMessage);

module.exports = router;