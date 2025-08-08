import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  }, // id único por planta

  nombreComun: String,
  family: String,
  nivelCuidado: {
    type: String,
    enum: ["Fácil", "Moderado", "Dificil"],
  },
  riego: Number, // frecuencia (días entre riegos)
  cantidad: Number, // agua en ml

  iluminacion: {
    type: String,
    enum: ["Indirecta", "Directa"],
  },
  temperatura: {
    type: String,
    enum: ["Frio", "Calido"],
  },
  humedad: {
    type: String,
    enum: ["Alta", "Media", "Baja"],
  },
  suelo: {
    type: String,
    enum: ["Drenado", "Arcilloso", "Compacto"],
  },
  propagacion: {
    type: String,
    enum: ["Esqueje", "Semilla"],
  },
  toxicity: Boolean,
  imageUrl: String,

  // Personalización
  nickname: String,
  acquisitionDate: Date,
  locationInHome: String,
  lastWatered: Date,
  nextWatering: Date,
  lastFertilized: Date,
  nextFertilization: Date,

  healthStatus: {
    type: String,
    enum: ["Excelente", "Bueno", "Regular", "Malo"],
    default: "Bueno",
  },

  // Notas del usuario
  notes: [
    {
      date: { type: Date, default: Date.now },
      text: String,
      images: [String],
    },
  ],

  // Registro de cuidados (riego, fertilización, poda, etc.)
  careLogs: [
    {
      type: {
        type: String,
        enum: ["riego", "fertilización", "poda", "trasplante", "tratamiento"],
      },
      date: { type: Date, default: Date.now },
      details: String,
    },
  ],
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Por favor ingresa un email válido"],
  },
  password: { type: String, required: true, minlength: 6 },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  tipoClima: { type: String, enum: ["humedo", "seco"], required: true },
  zonaGeo: {
    type: String,
    enum: ["costa", "montaña", "ciudad", "rural"],
    required: true,
  },
  espacio: {
    type: String,
    enum: ["balcon", "patio", "interior", "terraza"],
    required: true,
  },
  experiencia: {
    type: String,
    enum: ["principiante", "intermedio", "avanzado"],
    required: true,
  },
  mascota: { type: String, enum: ["si", "no"], required: true },
  fecha: { type: Date, default: Date.now },

  // 🌱 Arreglo de plantas personales
  plantas: [plantSchema],
});

const User = mongoose.model("User", userSchema);
export default User;
