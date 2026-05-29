const Libro = require("../models/libro.model");
const cloudinary = require('../config/Cloudinary');

class LibroController {
  static prepararDatosLibro = (data) => {
    const libroData = { ...data };
    if (libroData.stock !== undefined) {
      libroData.stock = Math.max(Number(libroData.stock) || 0, 0);
    }
    return libroData;
  };

  static obtenerLibros = async (req, res) => {
    try {
      const libros = await Libro.find();
      res.status(200).json(libros);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener libros", error });
    }
  };

  static obtenerLibroPorId = async (req, res) => {
    try {
      const libro = await Libro.findById(req.params.id);
      if (!libro) return res.status(404).json({ message: "Libro no encontrado" });
      res.status(200).json(libro);
    } catch (error) {
      res.status(500).json({ message: "Error al buscar libro", error });
    }
  };

  static crearLibro = async (req, res) => {
    try {
      const nuevoLibro = await Libro.create(LibroController.prepararDatosLibro(req.body));
      res.status(201).json(nuevoLibro);
    } catch (error) {
      res.status(400).json({ message: "Error al crear libro", error });
    }
  };

  static actualizarLibro = async (req, res) => {
    try {
      const libro = await Libro.findByIdAndUpdate(
        req.params.id,
        LibroController.prepararDatosLibro(req.body),
        { new: true }
      );
      if (!libro) return res.status(404).json({ message: "Libro no encontrado" });
      res.status(200).json(libro);
    } catch (error) {
      res.status(400).json({ message: "Error al actualizar libro", error });
    }
  };

  static eliminarLibro = async (req, res) => {
    try {
      const libro = await Libro.findByIdAndDelete(req.params.id);
      if (!libro) return res.status(404).json({ message: "Libro no encontrado" });
      res.status(200).json({ message: "Libro eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar libro", error });
    }
  };

  static subirImagen = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No se envió ninguna imagen" });
      }

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'bibliotec/img de libros' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: "Error al subir imagen", error: error.message });
    }
  };
}

module.exports = LibroController;
