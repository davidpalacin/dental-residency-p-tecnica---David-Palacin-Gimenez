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
		secret: '1234', // Cambia esto a una clave secreta segura
		resave: false,
		saveUninitialized: true,
	})
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

app.use((req, res) => {
	res.status(404).send('Ruta no encontrada');
});

app.listen(PORT, () => {
	console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});