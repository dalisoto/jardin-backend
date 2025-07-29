const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

// Importar rutas
const userRoutes = require('./routes/userRoutes'); 

// Rutas
app.use('/api/users', userRoutes); 

// Rutas básicas
app.get('/', (req, res) => {
  res.send('API de Plant Care funcionando');
});

module.exports = app;

