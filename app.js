import express from "express";
import { configDotenv } from "dotenv";
import authRouter from "./src/routers/authRouter.js";
import bodyParser from "body-parser";
import session from "express-session";
import dashboardRouter from "./src/routers/dashboardRouter.js";


configDotenv();

const PORT = process.env.PORT || 3000;
const app = express();
// Configura express-session
app.use(
	session({
		secret: '1234', // En un entorno real esto debe ser una clave secreta segura
		resave: false,
		saveUninitialized: true,
	})
);
// Configurar el envío de información en formato JSON
app.use(express.json());
// Usar bodyParser para leer los datos del req.body en el post de login
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

// Rutas de autenticación (login, logout)
app.use("/auth", authRouter);
// Rutas de dashboard
app.use("/dashboard", dashboardRouter);

// Control de endpoints no existentes
app.use((req, res) => {
	res.status(404).send('Ruta no encontrada');
});

// Iniciar servidor por el puerto configurado en .env o 3000
app.listen(PORT, () => {
	console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});