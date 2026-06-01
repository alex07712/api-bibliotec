const mongoose = require("mongoose");

const PrestamoSchema = mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "persona",
            required: true,
        },
        libro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "libro",
            required: true,
        },
        fechaPrestamo: {
            type: Date,
            default: Date.now,
        },
        fechaDevolucionEstimada: {
            type: Date,
            required: true,
        },
        fechaDevolucionReal: {
            type: Date,
            default: null,
        },
        estado: {
            type: String,
            enum: ["activo", "devuelto", "vencido"],
            default: "activo",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Prestamo", PrestamoSchema);