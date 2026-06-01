const mongoose = require("mongoose");
const bcrypt = require('bcrypt'); // ✅ Ahora con 'bcrypt'

const PersonaSchema = mongoose.Schema({
  nombre:   { type: String, required: true, uppercase: true },
  telefono: { type: Number, default: 9999999999},
  correo:   { type: String, required: true, unique: true },
  nomuser:  String,
  password: { type: String, required: true },
  rol:      { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
  imagen:   { type: String, default: "" }
}, { timestamps: true });

<<<<<<< HEAD
PersonaSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


=======
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
>>>>>>> c25f38c8dc8024a1c64abc3ad0b647ff71a6152d
PersonaSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

<<<<<<< HEAD
module.exports = mongoose.model("persona", PersonaSchema);
=======

module.exports = mongoose.model("persona", PersonaSchema);

>>>>>>> c25f38c8dc8024a1c64abc3ad0b647ff71a6152d
