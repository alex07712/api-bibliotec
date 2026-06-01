const Prestamo = require("../models/prestamo.model");
const Libro = require("../models/libro.model");

class PrestamoController {
    // Crear préstamo (usando usuarioId del body)
    static crearPrestamo = async (req, res) => {
        try {
            const { libroId, fechaDevolucionEstimada } = req.body;
            const usuarioId = req.user._id;

            // Validar que el libro existe
            const libro = await Libro.findById(libroId);
            if (!libro) {
                return res.status(404).json({ message: "Libro no encontrado" });
            }

            // Verificar si el usuario ya tiene un préstamo activo del mismo libro
            const prestamoExistente = await Prestamo.findOne({
                usuario: usuarioId,
                libro: libroId,
                estado: "activo",
            });
            if (prestamoExistente) {
                return res.status(400).json({ message: "Ya tienes este libro prestado" });
            }
            if ((libro.stock || 0) <= 0) {
                return res.status(400).json({ message: "No hay stock disponible para este libro" });
            }


            const nuevoPrestamo = await Prestamo.create({
                usuario: usuarioId,
                libro: libroId,
                fechaDevolucionEstimada,
            });
            libro.stock -= 1;
            await libro.save();

            const prestamoPopulado = await Prestamo.findById(nuevoPrestamo._id).populate("libro");
            res.status(201).json(prestamoPopulado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear préstamo", error: error.message });
        }
    };

    static misPrestamos = async (req, res) => {
        try {
            const { usuarioId } = req.params;
            // Verificar que el usuario autenticado solo vea sus préstamos
            if (req.user._id.toString() !== usuarioId && req.user.rol !== 'admin') {
                return res.status(403).json({ message: "No autorizado" });
            }
            const prestamos = await Prestamo.find({ usuario: usuarioId })
                .populate("libro")
                .sort({ fechaPrestamo: -1 });
            res.status(200).json(prestamos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener préstamos", error });
        }
    };

    static devolverLibro = async (req, res) => {
        try {
            const { id } = req.params;
            const prestamo = await Prestamo.findById(id);
            if (!prestamo) {
                return res.status(404).json({ message: "Préstamo no encontrado" });
            }
            if (prestamo.estado !== "activo") {
                return res.status(400).json({ message: "Este préstamo ya fue devuelto o está vencido" });
            }

            prestamo.fechaDevolucionReal = new Date();
            prestamo.estado = "devuelto";
            await prestamo.save();

            await Libro.findByIdAndUpdate(prestamo.libro, { $inc: { stock: 1 } });
            res.status(200).json({ message: "Libro devuelto correctamente", prestamo });
        } catch (error) {
            res.status(500).json({ message: "Error al devolver libro", error });
        }
    };

    static obtenerTodosPrestamos = async (req, res) => {
        try {
            const prestamos = await Prestamo.find()
                .populate("usuario", "nombre nomuser correo")
                .populate("libro", "titulo autor categoria stock")
                .sort({ fechaPrestamo: -1 });
            res.status(200).json(prestamos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener préstamos", error });
        }
    };
}



module.exports = PrestamoController;
