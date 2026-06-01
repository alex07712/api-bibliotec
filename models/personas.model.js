const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const PersonaSchema = mongoose.Schema({
  nombre:   { type: String, required: true, uppercase: true },
  telefono: { type: Number, default: 9999999999, unique: true},
  correo:   { type: String, required: true, unique: true },
  nomuser:  {String, unique: true},
  password: { type: String, required: true },
  rol:      { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
  imagen:   { type: String, default: "" }
}, { timestamps: true });

PersonaSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


PersonaSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("persona", PersonaSchema);
