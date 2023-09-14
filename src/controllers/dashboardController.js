export const dashboardController = {};

dashboardController.enterDashboard = (req, res) => {
  const username = req.session.username;

  if (username) {
    res.send(`Bienvenido, ${username}, al panel de control.`);
  } else {
    // Si no hay nombre de usuario en la sesión, redirige al inicio de sesión
    res.redirect('/auth/login');
  }
}