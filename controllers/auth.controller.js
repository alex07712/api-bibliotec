const Persona = require("../models/personas.model");

exports.login = async (req, res) => {
  try {
    const { nomuser, password, } = req.body;

    const usuario = await Persona.findOne({
      $or: [ {nomuser: nomuser}, 
        {correo: nomuser}], 
        password:password});
    
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.status(200).json({
      id: usuario._id,
      nombre: usuario.nombre,
      nomuser: usuario.nomuser,
      rol: usuario.rol,
      imagen: usuario.imagen || ""
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};