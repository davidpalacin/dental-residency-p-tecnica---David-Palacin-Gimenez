const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const server = http.createServer((req, res) => {
	// Obtén la URL solicitada por el cliente
	const url = req.url;

	// Configura la cabecera de respuesta con el tipo de contenido JSON
	res.setHeader('Content-Type', 'application/json');

	// Maneja las rutas
	if (url === '/') {
		// Si la ruta es "/", crea un objeto JSON y responde con él
		const responseJson = {
			message: '¡Hola, mundo!',
		};
		res.statusCode = 200;
		res.end(JSON.stringify(responseJson));
	} else {
		// Para cualquier otra ruta, responde con un mensaje JSON de error
		const errorJson = {
			message: 'Página no encontrada',
		};
		res.statusCode = 404;
		res.end(JSON.stringify(errorJson));
	}
});

// Escucha en el puerto guardado en variables de entorno, y si no existe, en el 3000
const port = process.env.PORT ?? 3000;
server.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});
