require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./app");
//const { DB_HOST, DB_NAME } = require("./constantes");

//variable global entonces que tome ese puerto si no hay 
//que tome el de manera local que le estoy asignando
const port = process.env.PORT || 4000;

  // Obligamos a Mongoose a conectarse primero
mongoose
//.connect(`mongodb://${DB_HOST}/${DB_NAME}`)
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("conectado a MongoDB Atlas con éxito");
    
    // El servidor se levanta SOLO si la conexión a la BD fue exitosa
    app.listen(port, () => {
      console.log("*********************************");
      console.log("********Api Rest appmovil********");
      console.log("*********************************");
      console.log(`Servidor activo en el puerto: ${port}`);
    });
  })
  .catch((error) => {
    console.error("ERROR CRÍTICO AL CONECTAR A MONGO_URI:", error.message);
    process.exit(1); // Esto le avisa formalmente a Render que el proceso falló por la BD
  });