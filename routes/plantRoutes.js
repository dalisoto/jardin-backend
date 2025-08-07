const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

// Ruta de registro
router.post('/register', plantController.register);
router.get('/',  plantController.getPlant);

module.exports = router;