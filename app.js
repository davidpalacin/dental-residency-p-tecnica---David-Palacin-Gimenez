import express from "express";
import { configDotenv } from "dotenv";

configDotenv();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use((req, res) => {
	res.status(404).send('Ruta no encontrada');
});

app.listen(PORT, () => {
	console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});