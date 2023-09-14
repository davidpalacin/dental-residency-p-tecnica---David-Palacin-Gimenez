export const authController = {};
import { users } from "../utils/users.js"

authController.loginGet = (req, res) => {
  res.send(`
    <form method="post" action="/auth/login">
      <label for="username">Usuario:</label>
      <input type="text" id="username" name="username"><br><br>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password"><br><br>
      <input type="submit" value="Iniciar sesión">
    </form>
  `);
}

authController.loginPost = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    res.status(401).send('Usuario o contraseña incorrectos');
    return;
  }
  req.session.username = username;
  res.redirect('/dashboard');
}

authController.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    // Redirige al inicio de sesión después de cerrar la sesión
    res.redirect('/auth/login');
  });
}