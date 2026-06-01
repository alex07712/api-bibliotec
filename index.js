require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./app");

//const { DB_HOST, DB_NAME } = require("./constantes"); era para conectar de forma local port:4000

//variable global que toma el puerto si no hay 
const port = process.env.PORT || 4000;
const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/serviAPP";

mongoose
  //.connect(`mongodb://${DB_HOST}/${DB_NAME}`) (lo mismo para local)
  .connect(URI)
  .then((mongoose) => console.log("conectado a MongoDB Atlas"))
  .catch((error) => console.log("Error de conexion",error));

app.listen(port, () => {
  console.log("*********************************");
  console.log("********Api Rest appmovil********");
  console.log("*********************************");
  console.log(`http://localHost:${port}/api/`);
});
