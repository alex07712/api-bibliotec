const Persona = require("../models/personas.model");

const authMiddleware = async (req, res, next) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) {
            return res.status(401).json({ message: "No se proporcionó ID de usuario" });
        }

        const user = await Persona.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Error en autenticación", error });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user?.rol !== 'admin') {
        return res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador." });
    }
    next();
};

module.exports = { authMiddleware, adminOnly };