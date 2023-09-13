const http = require('http');
const dotenv = require('dotenv');
const urlModule = require('url');
const qs = require('querystring');

dotenv.config();

// Datos de usuarios (esto puede ser reemplazado por una base de datos en un entorno real)
const users = [
	{username: 'usuario1', password: 'contrasena1'},
	{username: 'usuario2', password: 'contrasena2'},
];

const sessions = {};

const server = http.createServer((req, res) => {
	// Obtén la URL solicitada por el cliente
	// Obtén la URL solicitada por el cliente
	const clientUrl = req.url;
	const parsedUrl = urlModule.parse(clientUrl, true);
	const pathname = parsedUrl.pathname;

	// Configura la cabecera de respuesta con el tipo de contenido
	res.setHeader('Content-Type', 'text/html');

	// Maneja las rutas
	if (clientUrl === '/') {
		res.statusCode = 200;
		res.end('¡Hola, Mundo!');
	} else if (pathname === '/login' && req.method === 'GET') {
		// Mostrar formulario de inicio de sesión
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(`
			<form method="post" action="/login">
				<label for="username">Nombre de usuario:</label>
				<input type="text" id="username" name="username" required>
				<br>
				<label for="password">Contraseña:</label>
				<input type="password" id="password" name="password" required>
				<br>
				<button type="submit">Iniciar sesión</button>
			</form>
    	`);
	} else if (pathname === '/login' && req.method === 'POST') {
		// Manejar inicio de sesión
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});

		req.on('end', () => {
			const {username, password} = qs.parse(body);

			// Verificar las credenciales del usuario
			const user = users.find(
				(u) => u.username === username && u.password === password
			);
			if (user) {
				// Iniciar sesión
				const sessionId = Math.random().toString(36).substring(2);
				sessions[sessionId] = username;

				console.log(sessionId)

				// Redirigir al usuario al dashboard
				res.writeHead(302, {
					Location: '/dashboard',
					'Set-Cookie': `sessionId=${sessionId}`,
				});
				res.end();
			} else {
				res.writeHead(401, {'Content-Type': 'text/html'});
				res.end(
					'Credenciales incorrectas. <a href="/login">Volver a intentar</a>'
				);
			}
		});
	} else if (pathname === '/dashboard') {
		// Verificar la sesión del usuario
		const sessionId = parsedUrl.query.sessionId;
		const username = sessions[sessionId];

		if (username) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(
				`¡Bienvenido, ${username}! <a href="/logout?sessionId=${sessionId}">Cerrar sesión</a>`
			);
		} else {
			// Si no hay sesión, redirigir al inicio de sesión
			res.writeHead(302, {Location: '/login'});
			res.end();
		}
	} else if (pathname === '/logout') {
		// Cerrar sesión
		const sessionId = parsedUrl.query.sessionId;
		delete sessions[sessionId];

		// Redirigir al inicio de sesión
		res.writeHead(302, {Location: '/login'});
		res.end();
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
