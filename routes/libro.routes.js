const express = require("express");
const LibroController = require("../controllers/libro.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const api = express.Router();

api.get("/libros", LibroController.obtenerLibros);
api.get("/libros/:id", LibroController.obtenerLibroPorId);
api.post("/libros/create", LibroController.crearLibro);
api.put("/libros/:id", LibroController.actualizarLibro);
api.delete("/libros/:id", LibroController.eliminarLibro);

api.post("/libros/upload", upload.single('imagen'), LibroController.subirImagen);

module.exports = api;