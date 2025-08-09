const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');

// POST /auth/signup
router.post('/signup', userController.signUp);

// POST /auth/login
router.post('/login', userController.Login);

// POST /auth/logout
router.post('/logout', userController.logout);

module.exports = router;
