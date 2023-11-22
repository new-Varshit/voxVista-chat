const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const authenticateToken = require('../utility/verifyToken');


router.get('/chat',authenticateToken.authenticateToken,chatController.getChatPage);

module.exports = router;