const express=require("express") //libreria para el servidor y validacion 
const cors=require("cors") //libreria para el servidor y validadacion
const bodyParser=require("body-parser")


//inportamos rutas
const PersonaRouter=require("./routes/persona.routes");
const LibroRouter = require("./routes/libro.routes");
const Autenticacion=require("./routes/auth.routes");
const PrestamoRouter = require("./routes/prestamo.routes");

//variable que obtiene los valores del express
const app=express();

//configurar las peticiones http para validar los cors
app.use(cors()); //cuando llamamos al servisor no nos mande un error 
app.use(express.json());
app.use(bodyParser.json());

//aqui van las rutas 
app.use("/api/", PersonaRouter)
app.use("/api/", LibroRouter)
app.use("/api/", Autenticacion)
app.use("/api/", PrestamoRouter);


module.exports = app