// backend/controllers/userController.js
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password, nombre, edad, tipoClima, zonaGeo, espacio, experiencia, mascota, fecha } = req.body;

    // Valores permitidos para cada campo
    const validValues = {
      tipoClima: ['humedo', 'seco'],
      zonaGeo: ['costa', 'montaña', 'ciudad', 'rural'],
      espacio: ['balcon', 'patio', 'interior', 'terraza'],
      experiencia: ['principiante', 'intermedio', 'avanzado'],
      mascota: ['si', 'no'],
    };

    // Validación básica de campos requeridos
    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    // Validar valores individuales si existen
    for (const [field, allowedValues] of Object.entries(validValues)) {
      if (req.body[field] && !allowedValues.includes(req.body[field])) {
        return res.status(400).json({
          error: `Valor no válido para ${field}`,
          valoresPermitidos: allowedValues
        });
      }
    }

    // Crear y guardar el nuevo usuario
    const newUser = new User({
      email,
      password,
      nombre,
      edad,
      tipoClima,
      zonaGeo,
      espacio,
      experiencia,
      mascota,
      fecha
    });

    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: userResponse
    });

  } catch (error) {
    res.status(400).json({
      error: error.message.includes('duplicate key')
        ? 'El email ya está registrado'
        : error.message
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.find(); // Obtiene todos los usuarios
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};