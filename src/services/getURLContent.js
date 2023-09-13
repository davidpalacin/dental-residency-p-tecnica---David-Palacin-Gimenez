const axios = require('axios');

// Array de URLs
const urls = [
	'https://www.ejemplo1.com',
	'https://www.ejemplo2.com',
	'https://www.example.org',
];

const getContent = async () => {
    for (const url of urls) {
    try {
      const response = await axios.get(url);

      // Imprime el contenido HTML de la URL
      console.log(`Contenido HTML de ${url}:`);
      console.log(response.data);
    } catch (error) {
      console.error(`Error al obtener el contenido de ${url}:`, error.message);
    }
  }
};

getContent();
