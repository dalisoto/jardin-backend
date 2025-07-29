const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String,required: true,unique: true,match: [/.+\@.+\..+/, 'Por favor ingresa un email válido']},
    password: {type: String,required: true,minlength: 6},
    nombre: {type: String,required: true},edad: {type: Number,required: true},
    tipoClima: {type: String,enum: ['humedo','seco'],required: true},
    zonaGeo: {type: String,enum: ['costa','montaña','ciudad','rural'],required: true},
    espacio: {type: String,enum: ['balcon', 'patio','interior','terraza'],required: true},
    experiencia: {type: String,enum: ['principiante', 'intermedio', 'avanzado'],required: true},
    mascota: {type: String,enum: ['si', 'no'],required: true},
    fecha: {type: Date, default: Date.now}

    // Array de referencias a las plantas que el usuario tiene
    // plants: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'UserPlant'  // Relación con el modelo UserPlant
    // }],

    // Fecha de creación (se genera automáticamente)

});

// Exportamos el modelo para usarlo en otras partes de la aplicación
module.exports = mongoose.model('User', userSchema);