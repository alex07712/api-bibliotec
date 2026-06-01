const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const PersonaSchema = mongoose.Schema({
  nombre:   { type: String, required: true, uppercase: true },
  telefono: { type: Number, default: 9999999999},
  correo:   { type: String, required: true, unique: true },
  nomuser:  String,
  password: { type: String, required: true },
  rol:      { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
  imagen: { type: String, default: "" }
}, { timestamps: true });

//hashear password antes de guardar 
PersonaSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//compara contraseña
PersonaSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model("persona", PersonaSchema);
