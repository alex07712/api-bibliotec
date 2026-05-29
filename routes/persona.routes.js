const express=require("express");
const PersonaController=require("../controllers/persona.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

//definimos las rutas
const api=express.Router();

//estas son las peticiones
api.post("/persona/create", PersonaController.createPersona);
api.get("/persona/buscar", PersonaController.obtenerDatos);
api.delete("/persona/eliminar/:id", PersonaController.deletePersona);
api.put("/persona/modificar/:id", PersonaController.updatePersona);
api.post("/persona/avatar/:id", upload.single('imagen'), PersonaController.subirAvatar);



module.exports=api;

