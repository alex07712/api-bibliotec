require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./app");
//const { DB_HOST, DB_NAME } = require("./constantes");

//variable global entonces que tome ese puerto si no hay 
//que tome el de manera local que le estoy asignando
const port = process.env.PORT || 4000;

mongoose
  //.connect(`mongodb://${DB_HOST}/${DB_NAME}`)
  .connect(process.env.MONGO_URI)
  .then((mongoose) => console.log("conectado a MongoDB Atlas"))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log("*********************************");
  console.log("********Api Rest appmovil********");
  console.log("*********************************");
  console.log(`http://localHost:${port}/api/`);
});
