const Persona = require("../models/personas.model");
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcrypt');

class PersonaController {
  static createPersona = async (req, res) => {
    try {
      const datos = req.body;
      if (datos.telefono) datos.telefono = Number(datos.telefono);
    const newPerson = await Persona.create(datos);
    res.status(201).json(newPerson);
  } catch (error) {
    console.error("Error createPersona:", error);
    // Enviar mensaje detallado al cliente
    res.status(500).json({ 
      message: error.message,
      details: error.errors 
    });
  }
};
  static obtenerDatos = async (req, res) => {
    try {
      const buscarPersonas = await Persona.find();
      res.status(200).json(buscarPersonas);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener datos", error: error.message });
    }
  };

  static deletePersona = async (req, res) => {
    try {
      const { id } = req.params;
      const eliminar = await Persona.findByIdAndDelete(id);
      if (!eliminar) return res.status(404).json({ message: "Persona no encontrada" });
      res.status(200).json({ message: "Persona eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar", error: error.message });
    }
  };

  static updatePersona = async (req, res) => {
    try {
      const { id } = req.params;
      const modPersona = req.body;

      // Si viene password, la hasheamos
      if (modPersona.password) {
        const salt = await bcrypt.genSalt(10);
        modPersona.password = await bcrypt.hash(modPersona.password, salt);
      }

      const modificar = await Persona.findByIdAndUpdate(id, modPersona, { new: true });
      if (!modificar) return res.status(404).json({ message: "Persona no encontrada" });

      res.status(200).json({ message: "Datos actualizados correctamente", data: modificar });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar", error: error.message });
    }
  };

  static subirAvatar = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No se envió imagen" });
      }

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'bibliotec/avatares' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      // Actualizar el usuario con la nueva URL
      const usuario = await Persona.findByIdAndUpdate(
        req.params.id,
        { imagen: result.secure_url },
        { new: true }
      );

      res.status(200).json({ url: result.secure_url, usuario });
    } catch (error) {
      res.status(500).json({ message: "Error al subir avatar", error: error.message });
    }
  };
}

module.exports = PersonaController;
