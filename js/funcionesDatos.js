const usuarioLogeado = document.getElementById("usuarioLogeado");
const usuarioLS = localStorage.getItem('datos');

if (usuarioLS) {
  const datos = JSON.parse(usuarioLS);
  const nombreUsuario = datos.usuario;
  usuarioLogeado.innerHTML = nombreUsuario;
} else {
  usuarioLogeado.innerHTML = `
    <li><a href="./subhtml/login.html">Iniciar sesión</a></li>
  `;
}
