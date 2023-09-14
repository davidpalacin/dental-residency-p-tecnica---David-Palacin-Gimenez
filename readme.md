## Prueba técnica para Dental Residency (David Palacín Giménez)
Este repositorio se basa en la parte práctica realizada como parte de mi candidatura al puesto de desarrollador. 

Consta principamente de las siguientes partes:

- un endpoint "/" que debe devolver "Hello World"
- Los endpoints que no existen deben devolver el mensaje correspondiente
- La ruta "/auth/login", tanto GET que renderiza el formulario como el POST para procesar esta información e iniciar sesión.
- La ruta "/dashboard" a la cuál va el usuario al introducir credenciales correctas, en cambio, si son incorrectas, se le debe redirigir a "/auth/login" de vuelta.
- La ruta "/auth/logout" la cuál elimina la sesión del usuario y lo redirige a "/auth/login"

### Cómo utilizar este repositorio
- clonar proyecto:
```bash
git clone {url del repositorio}
```
- Instalar dependencias
```bash
npm install
```
- Iniciar servidor
```bash
npm run dev
```
- Ya está el proyecto listo para ejecutar los endpoints en tu navegador.
