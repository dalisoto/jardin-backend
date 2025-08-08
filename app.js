import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import plantRoutes from "./routes/plantRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error de conexión:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);

app.get("/", (req, res) => {
  res.send("API de Plant Care funcionando");
});

export default app;
