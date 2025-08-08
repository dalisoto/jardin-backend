import { Router } from "express";
import {
  getAllPlants,
  createPlant,
  deletePlant,
  updatePlant,
  markWatered,
  markFertilized,
  addNote,
} from "../controllers/plantController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// 📋 Ver todas las plantas del usuario
router.get("/", getAllPlants);

// 🌱 Crear nueva planta
router.post("/", createPlant);

// ❌ Eliminar planta por ID
router.delete("/:plantId", deletePlant);

// 🔧 Actualizar ciertos campos de la planta
router.patch("/:plantId", updatePlant);

// 💧 Marcar planta como regada
router.post("/:plantId/water", markWatered);

// 🌾 Marcar planta como fertilizada
router.post("/:plantId/fertilize", markFertilized);

// 📝 Agregar nota a la planta
router.post("/:plantId/notes", addNote);

export default router;
