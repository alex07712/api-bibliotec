const express = require("express");
const PrestamoController = require("../controllers/prestamo.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");
const api = express.Router();

api.post("/prestamos", authMiddleware, PrestamoController.crearPrestamo);
api.get("/prestamos/mis-prestamos/:usuarioId", authMiddleware, PrestamoController.misPrestamos);
api.get("/prestamos/admin", authMiddleware, adminOnly, PrestamoController.obtenerTodosPrestamos);
api.put("/prestamos/devolver/:id", authMiddleware, adminOnly, PrestamoController.devolverLibro);

module.exports = api;
