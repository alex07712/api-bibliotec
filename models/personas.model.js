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

// Hashear contraseña antes de guardar
PersonaSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});
//compara contraseña
PersonaSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model("persona", PersonaSchema);

