const mongoose = require("mongoose");

const PersonaSchema = mongoose.Schema({
  nombre:   { type: String, required: true, uppercase: true },
  telefono: { type: Number, default: 9342222 },
  correo:   { type: String, required: true, unique: true },
  nomuser:  String,
  password: { type: String, required: true },
  rol:      { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
  imagen: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("persona", PersonaSchema);
