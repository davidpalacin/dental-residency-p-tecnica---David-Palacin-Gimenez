const fs = require('fs');

const returnFileContent = () => {
	// Ruta al archivo de texto
	const filePath = './src/utils/datos.txt';

	// Lee el contenido del archivo de texto de forma asíncrona
	fs.readFile(filePath, 'utf8', (error, contenido) => {
		if (error) {
			console.error('Error al leer el archivo:', error);
			return;
		}
		// Muestra el contenido por la consola
		console.log('Contenido del archivo:');
		console.log(contenido);
	});
};

returnFileContent();
