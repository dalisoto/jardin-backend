const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta de registro
router.post('/register', userController.register);
router.get('/',  userController.getUser);

module.exports = router;