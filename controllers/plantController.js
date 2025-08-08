import User from "../models/User.js";
import mongoose from "mongoose";

// Obtener todas las plantas del usuario
export const getAllPlants = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user.plantas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las plantas" });
  }
};

// Crear una nueva planta
export const createPlant = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const newPlant = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
    };
    user.plantas.push(newPlant);
    await user.save();
    res.status(201).json({ message: "Planta creada", plant: newPlant });
  } catch (error) {
    res.status(500).json({ error: "Error al crear planta" });
  }
};

// Eliminar planta por ID
export const deletePlant = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.plantas = user.plantas.filter((p) =>
      p._id.toString() === req.params.plantId ? false : true
    );
    await user.save();
    res.json({ message: "Planta eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar planta" });
  }
};

// Actualizar planta (solo campos permitidos)
export const updatePlant = async (req, res) => {
  try {
    const allowedFields = [
      "nombreComun",
      "family",
      "nivelCuidado",
      "riego",
      "cantidad",
      "iluminacion",
      "temperatura",
      "humedad",
      "suelo",
      "propagacion",
      "toxicity",
      "imageUrl",
      "nickname",
      "acquisitionDate",
      "locationInHome",
      "healthStatus",
    ];

    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );

    const user = await User.findById(req.user.userId);
    const plant = user.plantas.id(req.params.plantId);

    if (!plant) return res.status(404).json({ error: "Planta no encontrada" });

    Object.assign(plant, updates);
    await user.save();

    res.json({ message: "Planta actualizada", plant });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar planta" });
  }
};

// Marcar planta como regada
export const markWatered = async (req, res) => {
  try {
    const now = new Date();
    const user = await User.findById(req.user.userId);
    const plant = user.plantas.id(req.params.plantId);

    if (!plant) return res.status(404).json({ error: "Planta no encontrada" });

    const nextWatering = new Date(plant.nextWatering);
    const threshold = new Date(nextWatering.getTime() - 30 * 60 * 1000); // -30 min

    /* if (now < threshold) {
      return res
        .status(400)
        .json({ error: "Aún no es tiempo de regar esta planta" });
    } */

    plant.lastWatered = now;
    plant.nextWatering = new Date(now.getTime() + plant.riego * 60 * 60 * 1000); // +riego días

    plant.careLogs.push({
      type: "riego",
      date: now,
      details: "Riego registrado",
    });

    await user.save();
    res.json({ message: "Planta regada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar riego" });
  }
};

// Marcar planta como fertilizada
export const markFertilized = async (req, res) => {
  try {
    const now = new Date();
    const user = await User.findById(req.user.userId);
    const plant = user.plantas.id(req.params.plantId);

    if (!plant) return res.status(404).json({ error: "Planta no encontrada" });

    const nextFertilization = new Date(plant.nextFertilization);
    const threshold = new Date(nextFertilization.getTime() - 30 * 60 * 1000);

    /* if (now < threshold) {
      return res
        .status(400)
        .json({ error: "Aún no es tiempo de fertilizar esta planta" });
    } */

    plant.lastFertilized = now;
    plant.nextFertilization = new Date(
      now.getTime() + 30 * 24 * 60 * 60 * 1000
    ); // por ejemplo cada 30 días

    plant.careLogs.push({
      type: "fertilización",
      date: now,
      details: "Fertilización registrada",
    });

    await user.save();
    res.json({ message: "Planta fertilizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar fertilización" });
  }
};

// Agregar nota a la planta
export const addNote = async (req, res) => {
  try {
    const { text, images } = req.body;
    const user = await User.findById(req.user.userId);
    const plant = user.plantas.id(req.params.plantId);

    if (!plant) return res.status(404).json({ error: "Planta no encontrada" });

    plant.notes.push({
      date: new Date(),
      text,
      images,
    });

    await user.save();
    res.json({ message: "Nota agregada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar nota" });
  }
};
