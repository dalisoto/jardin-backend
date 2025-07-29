const plantSchema = new mongoose.Schema({
    // Nombre común de la planta (ej. "Rosa", "Suculenta")
    nombreComun: {
        type: String,
        required: true,
        trim: true
    },

    // Nombre científico (ej. "Rosa spp.")
    nombreCientifico: String,

    // Familia botánica (ej. "Rosaceae")
    family: String,

    // Nivel de dificultad de cuidado
    nivelCuidad: {
        type: String,
        enum: ['Fácil', 'Moderado', 'Difícil'],  // Solo estos valores permitidos
        default: 'Moderado'
    },

    // Necesidades de riego
    riego: {
        frecuencia: String,      // Ej: "1 vez por semana"
        cantidad: String,         // Ej: "250ml"
        verano: String, // Ajustes para verano
        invierno: String  // Ajustes para invierno
    },

    // Requerimientos de luz (
    iluminacion: {
        type: String,
        enum: ['Indirecta', 'Directa'],
        default: 'Directa'
    },

    // Rango de temperatura ideal
    temperatura: {
        min: Number,  // Temperatura mínima en °C
        max: Number   // Temperatura máxima en °C
    },

    // Humedad requerida
    humedad: { 
        type: String,
        enum:['Alta','Media','Baja'],
        default:'Media'
    },  

    // Tipo de suelo recomendado
    suelo: {
        type: String,
        enum:['Drenado','Arcilloso','Compacto']
    },  

    // Recomendaciones de fertilización
    fertilizacion: String,  

    // Problemas comunes y sus soluciones
    problemasComunes: [{
        name: String,         // Ej: "Manchas en las hojas"
        description: String,  // Descripción del problema
        solution: String      // Cómo solucionarlo
    }],

    // Métodos de propagación
    propagacion: [String], // Ej: ["Esquejes", "Semillas"]

    // Si la planta es tóxica para mascotas o niños
    toxicity: Boolean,

    // URL de imagen de la planta
    imageUrl: String,

    // Usuario que creó esta entrada (para plantas personalizadas)
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Indica si es una planta personalizada o estándar
    isCustom: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Plant', plantSchema);