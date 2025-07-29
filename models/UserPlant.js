const userPlantSchema = new mongoose.Schema({
  // Referencia al usuario dueño de esta planta
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // Referencia al modelo base de la planta
  plant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Plant', 
    required: true 
  },
  
  // Apodo personalizado para la planta (ej. "Mi rosal favorito")
  nickname: String,
  
  // Fecha en que el usuario adquirió la planta
  acquisitionDate: Date,
  
  // Ubicación dentro del hogar (ej. "Balcón norte", "Sala de estar")
  locationInHome: String,
  
  // Fecha del último riego
  lastWatered: Date,
  
  // Fecha estimada para próximo riego (calculada automáticamente)
  nextWatering: Date,
  
  // Fecha de última fertilización
  lastFertilized: Date,
  
  // Fecha estimada para próxima fertilización
  nextFertilization: Date,
  
  // Estado de salud actual
  healthStatus: { 
    type: String, 
    enum: ['Excelente', 'Bueno', 'Regular', 'Malo'],
    default: 'Bueno'
  },
  
  // Notas y observaciones del usuario sobre la planta
  notes: [{
    date: Date,      // Fecha de la nota
    text: String,    // Contenido de la nota
    images: [String] // Fotos asociadas (URLs)
  }],
  
  // Registro histórico de cuidados aplicados
  careLogs: [{
    type: {  // Tipo de cuidado
      type: String, 
      enum: ['riego', 'fertilización', 'poda', 'trasplante', 'tratamiento']
    },
    date: Date,     // Fecha en que se realizó
    details: String // Detalles adicionales
  }]
});

module.exports = mongoose.model('UserPlant', userPlantSchema);