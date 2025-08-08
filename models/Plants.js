const plantSchema = new mongoose.Schema({
  // Nombre común de la planta (ej. "Rosa", "Suculenta")
  nombreComun: {
    type: String,
    required: true,
    trim: true,
  },

  // Nombre científico (ej. "Rosa spp.")
  //nombreCientifico: String,

  // Familia botánica (ej. "Rosaceae")
  family: String,

  // Nivel de dificultad de cuidado
  nivelCuidado: {
    type: String,
    enum: ["Fácil", "Moderado", "Difícil"], // Solo estos valores permitidos
    default: "Moderado",
  },

  // Necesidades de riego
  riego: {
    type: Number,
  },
  cantidad: {
    //Cantidad de agua, en mililitros xd
    type: Number,
  },

  // Requerimientos de luz (
  iluminacion: {
    type: String,
    enum: ["Indirecta", "Directa"],
    default: "Directa",
  },

  // Rango de temperatura ideal
  temperatura: {
    type: String,
    enum: ["Frio", "Calido"],
  },

  // Humedad requerida
  humedad: {
    type: String,
    enum: ["Alta", "Media", "Baja"],
    default: "Media",
  },

  // Tipo de suelo recomendado
  suelo: {
    type: String,
    enum: ["Drenado", "Arcilloso", "Compacto"],
  },

  // Métodos de propagación
  propagacion: {
    type: String,
    enum: ["Esqueje", "Semilla"],
  },

  // Si la planta es tóxica para mascotas o niños
  toxicity: Boolean,

  // URL de imagen de la planta
  imageUrl: String,

  // Usuario que creó esta entrada (para plantas personalizadas)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // Indica si es una planta personalizada o estándar
  isCustom: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Plant", plantSchema);
