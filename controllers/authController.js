import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Crear token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Preparar respuesta
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: userResponse,
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      nombre,
      edad,
      tipoClima,
      zonaGeo,
      espacio,
      experiencia,
      mascota,
      fecha,
    } = req.body;

    // 1. Campos requeridos
    const requiredFields = [
      "email",
      "password",
      "nombre",
      "edad",
      "tipoClima",
      "zonaGeo",
      "espacio",
      "experiencia",
      "mascota",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .json({ error: `El campo '${field}' es obligatorio` });
      }
    }

    // 2. Validación de valores
    const validValues = {
      tipoClima: ["humedo", "seco"],
      zonaGeo: ["costa", "montaña", "ciudad", "rural"],
      espacio: ["balcon", "patio", "interior", "terraza"],
      experiencia: ["principiante", "intermedio", "avanzado"],
      mascota: ["si", "no"],
    };

    for (const [field, allowedValues] of Object.entries(validValues)) {
      if (!allowedValues.includes(req.body[field])) {
        return res.status(400).json({
          error: `Valor no válido para ${field}`,
          valoresPermitidos: allowedValues,
        });
      }
    }

    // 3. Verificar duplicado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // 4. Hash contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Crear usuario
    const newUser = new User({
      email,
      password: hashedPassword,
      nombre,
      edad,
      tipoClima,
      zonaGeo,
      espacio,
      experiencia,
      mascota,
      fecha,
    });

    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};
