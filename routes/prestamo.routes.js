const express = require("express");
const PrestamoController = require("../controllers/prestamo.controller");
const api = express.Router();
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");

api.post("/prestamos", PrestamoController.crearPrestamo);
api.get("/prestamos/mis-prestamos/:usuarioId", PrestamoController.misPrestamos);
api.get("/prestamos/admin", authMiddleware, adminOnly, PrestamoController.obtenerTodosPrestamos);
api.put("/prestamos/devolver/:id", authMiddleware, adminOnly, PrestamoController.devolverLibro);


module.exports = api;
